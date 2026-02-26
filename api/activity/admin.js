import { neon } from '@neondatabase/serverless';

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

const TOPICS = [
  "Who in this class would you want as your teammate through a zombie apocalypse?",
  "If you could go back and redo your childhood, would you? What would you change?",
  "If a behaviour you considered completely normal was actually listed as a symptom of a mental disorder, would that change your perspective of the behaviour or the diagnosis?",
  "Would you rather lose all your memories or never be able to make new ones?",
  "If someone steals out of necessity rather than greed, should they still be punished the same way?",
  "If aliens invaded the Earth and we needed to nominate one person from our class to negotiate with them, who would that be?",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function topicForRound(roundNumber) {
  const index = (roundNumber - 1) % TOPICS.length;
  return TOPICS[index];
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
      // Ensure activity_state row exists
      await sql`
        INSERT INTO activity_state (id, is_active, current_round, current_topic)
        VALUES (1, false, 0, NULL)
        ON CONFLICT (id) DO NOTHING
      `;

      // Get current state
      const stateResult = await sql`SELECT * FROM activity_state WHERE id = 1`;
      if (!stateResult || stateResult.length === 0) {
        return res.status(500).json({ error: 'Failed to initialize activity state' });
      }
      const state = stateResult[0];
      const nextRound = (state.current_round || 0) + 1;

      // Get active participants (extended to 5 minutes to avoid edge cases)
      const participants = await sql`
        SELECT id FROM participants 
        WHERE last_seen > CURRENT_TIMESTAMP - INTERVAL '5 minutes'
      `;

      if (participants.length < 2) {
        return res.status(400).json({ error: 'At least 2 participants required' });
      }

      const shuffled = shuffle([...participants]);
      const newTopic = topicForRound(nextRound);
      const pairingValues = [];

      // Build all pairing values
      for (let i = 0; i < shuffled.length - 1; i += 2) {
        pairingValues.push({
          round_number: nextRound,
          participant_a_id: shuffled[i].id,
          participant_b_id: shuffled[i + 1].id,
          topic: newTopic,
        });
      }

      // Handle odd participant - pair with random person
      if (shuffled.length % 2 !== 0) {
        const lastPerson = shuffled[shuffled.length - 1];
        const randomPartner = shuffled[Math.floor(Math.random() * (shuffled.length - 1))];
        pairingValues.push({
          round_number: nextRound,
          participant_a_id: lastPerson.id,
          participant_b_id: randomPartner.id,
          topic: newTopic,
        });
      }

      // Update activity state with new round and topic
      await sql`
        UPDATE activity_state 
        SET is_active = true, 
            current_round = ${nextRound},
            current_topic = ${newTopic},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `;

      // Insert pairings in parallel for better performance
      if (pairingValues.length > 0) {
        await Promise.all(
          pairingValues.map(p =>
            sql`INSERT INTO pairings (round_number, participant_a_id, participant_b_id, topic)
                VALUES (${p.round_number}, ${p.participant_a_id}, ${p.participant_b_id}, ${p.topic})`
          )
        );
      }

      return res.json({
        success: true,
        round: nextRound,
        topic: newTopic,
        pairingCount: pairingValues.length,
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('Admin action error:', error, error.message, error.stack);
    return res.status(500).json({ error: 'Admin action failed', details: error.message });
  }
}
