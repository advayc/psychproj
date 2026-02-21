import { neon } from '@neondatabase/serverless';

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

const TOPICS = [
  "The current weather and how it affects your mood",
  "Crime rates in different neighborhoods",
  "Your favorite childhood memory",
  "A recent news story that caught your attention",
  "What you ate for breakfast today",
  "Your thoughts on social media's impact on mental health",
  "If you could travel anywhere right now, where would it be?",
  "A movie or book that changed your perspective",
  "How technology has changed the way we communicate",
  "Your dream job and why",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!sql) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const { action } = req.body;

    if (action === "reset") {
      // Clear activity state
      await sql`UPDATE activity_state SET is_active = false, current_round = 0, current_topic = NULL WHERE id = 1`;
      // Clear all pairings
      await sql`DELETE FROM pairings`;
      // Clear all participants
      await sql`DELETE FROM participants`;
      return res.json({ success: true, message: 'All data has been reset' });
    }

    if (action === "clear-participants") {
      // Only clear participants without resetting activity state
      await sql`DELETE FROM participants`;
      await sql`DELETE FROM pairings WHERE round_number = (SELECT current_round FROM activity_state WHERE id = 1)`;
      return res.json({ success: true, message: 'All participants have been cleared' });
    }

    if (action === "start" || action === "next") {
      // Get current state
      const [state] = await sql`SELECT * FROM activity_state WHERE id = 1`;
      const nextRound = (state.current_round || 0) + 1;
      const nextTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

      // Get active participants
      const participants = await sql`
        SELECT id FROM participants 
        WHERE last_seen > CURRENT_TIMESTAMP - INTERVAL '2 minutes'
      `;

      if (participants.length < 2) {
        return res.status(400).json({ error: 'At least 2 participants required' });
      }

      const shuffled = shuffle([...participants]);
      const newPairings = [];

      for (let i = 0; i < shuffled.length - 1; i += 2) {
        newPairings.push({
          round_number: nextRound,
          participant_a_id: shuffled[i].id,
          participant_b_id: shuffled[i + 1].id,
        });
      }

      // Handle odd number - pair last person with a random person (group of 3)
      if (shuffled.length % 2 !== 0 && shuffled.length > 2) {
        const lastPerson = shuffled[shuffled.length - 1];
        const randomPartner = shuffled[Math.floor(Math.random() * (shuffled.length - 1))];
        newPairings.push({
          round_number: nextRound,
          participant_a_id: lastPerson.id,
          participant_b_id: randomPartner.id,
        });
      }

      // Perform updates
      await sql`
        UPDATE activity_state 
        SET is_active = true, 
            current_round = ${nextRound}, 
            current_topic = ${nextTopic},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `;

      // Insert pairings
      for (const p of newPairings) {
        await sql`
          INSERT INTO pairings (round_number, participant_a_id, participant_b_id)
          VALUES (${p.round_number}, ${p.participant_a_id}, ${p.participant_b_id})
        `;
      }

      return res.json({
        success: true,
        round: nextRound,
        topic: nextTopic,
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Admin action failed' });
  }
}
