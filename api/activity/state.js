import { neon } from '@neondatabase/serverless';

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!sql) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const { participantId } = req.query;

    const [state] = await sql`SELECT * FROM activity_state WHERE id = 1`;
    
    // Get all participants, prioritizing current user
    let participants = await sql`
      SELECT id, name FROM participants 
      WHERE last_seen > CURRENT_TIMESTAMP - INTERVAL '5 minutes'
      ORDER BY last_seen DESC
    `;
    
    // If current user is not in the list but exists, add them
    if (participantId && !participants.some(p => p.id === participantId)) {
      const currentUser = await sql`
        SELECT id, name FROM participants WHERE id = ${participantId}
      `;
      if (currentUser.length > 0) {
        participants = [currentUser[0], ...participants];
      }
    }

    let pairing = null;
    if (participantId && state.is_active) {
      const pairings = await sql`
        SELECT 
          p1.name as partner_name,
          p2.name as self_name
        FROM pairings pair
        JOIN participants p1 ON (pair.participant_a_id = p1.id OR pair.participant_b_id = p1.id)
        JOIN participants p2 ON (pair.participant_a_id = p2.id OR pair.participant_b_id = p2.id)
        WHERE p2.id = ${participantId} 
        AND p1.id != ${participantId}
        AND pair.round_number = ${state.current_round}
        LIMIT 1
      `;
      if (pairings.length > 0) {
        pairing = pairings[0];
      }
    }

    return res.json({
      state,
      participants,
      pairing,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch state' });
  }
}
