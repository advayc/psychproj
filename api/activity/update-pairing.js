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
    const { pairingId, newPartnerId } = req.body;

    if (!pairingId || !newPartnerId) {
      return res.status(400).json({ error: 'Pairing ID and new partner ID required' });
    }

    // Get the current pairing
    const [currentPairing] = await sql`
      SELECT * FROM pairings WHERE id = ${pairingId}
    `;

    if (!currentPairing) {
      return res.status(404).json({ error: 'Pairing not found' });
    }

    // Update the pairing
    await sql`
      UPDATE pairings 
      SET participant_b_id = ${newPartnerId}
      WHERE id = ${pairingId}
    `;

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update pairing' });
  }
}
