import { neon } from '@neondatabase/serverless';

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!sql) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const { name, sessionId } = req.body;

    if (!name || !sessionId) {
      return res.status(400).json({ error: 'Name and Session ID are required' });
    }

    const trimmedName = name.trim();
    
    if (!trimmedName) {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }

    // Check if participant already exists in this session
    const existing = await sql`
      SELECT id FROM participants WHERE session_id = ${sessionId} LIMIT 1
    `;

    if (existing.length > 0) {
      await sql`
        UPDATE participants SET name = ${trimmedName}, last_seen = CURRENT_TIMESTAMP 
        WHERE session_id = ${sessionId}
      `;
      return res.json({ success: true, participantId: existing[0].id });
    }

    const result = await sql`
      INSERT INTO participants (name, session_id, last_seen) 
      VALUES (${trimmedName}, ${sessionId}, CURRENT_TIMESTAMP) 
      RETURNING id
    `;

    return res.json({ success: true, participantId: result[0].id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to join activity' });
  }
}
