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
    const [state] = await sql`SELECT * FROM activity_state WHERE id = 1`;

    if (!state || !state.is_active) {
      return res.json({ pairings: [] });
    }

    const pairings = await sql`
      SELECT 
        p.id,
        p.round_number,
        p.participant_a_id,
        p.participant_b_id,
        pa.name as participant_a_name,
        pb.name as participant_b_name
      FROM pairings p
      JOIN participants pa ON p.participant_a_id = pa.id
      JOIN participants pb ON p.participant_b_id = pb.id
      WHERE p.round_number = ${state.current_round}
      ORDER BY p.id
    `;

    return res.json({ pairings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch pairings' });
  }
}
