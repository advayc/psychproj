import { neon } from '@neondatabase/serverless';

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

const TOPICS = [
  "Who in this class would you want as your teammate through a zombie apocalypse?",
  "Would you rather be known for something great that you never actually did, or be responsible for something great that no one ever knows you did?",
  "Do you think someone is shaped more by the friends they surround themselves with or by their parents?",
  "Do you think emotions and feelings are universal amongst humans? Or do we all experience the feeling of “happiness” differently?",
  "If a behaviour you considered completely normal was actually listed as a symptom of a mental disorder, would that change your perspective of the behaviour or the diagnosis?",
  "Would you rather lose all your memories or never be able to make new ones?",
  "If someone steals out of necessity rather than greed, should they still be punished the same way?",
  "Would you rather understand all the content but do badly on the exam, or do really well on the exam without fully understanding the content?",
  "Would you rather get a 7 with very little effort, or a 6 that you worked extremely hard for?",
  "If aliens invaded the Earth and we needed to nominate one person from our class to negotiate with them, who would that be?",
  "Do you have any regrets about high school? If you could do one thing differently, what would you do?",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomTopic() {
  return TOPICS[Math.floor(Math.random() * TOPICS.length)];
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
      await sql`UPDATE activity_state SET is_active = false, current_round = 0 WHERE id = 1`;
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
          topic: randomTopic(),
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
          topic: randomTopic(),
        });
      }

      // Perform updates
      await sql`
        UPDATE activity_state 
        SET is_active = true, 
            current_round = ${nextRound}, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `;

      // Insert pairings
      for (const p of newPairings) {
        await sql`
          INSERT INTO pairings (round_number, participant_a_id, participant_b_id, topic)
          VALUES (${p.round_number}, ${p.participant_a_id}, ${p.participant_b_id}, ${p.topic})
        `;
      }

      return res.json({
        success: true,
        round: nextRound,
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Admin action failed' });
  }
}
