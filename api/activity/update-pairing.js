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

    // Get the pairing being edited (e.g. Bobby ↔ Advay)
    const [currentPairing] = await sql`
      SELECT * FROM pairings WHERE id = ${pairingId}
    `;

    if (!currentPairing) {
      return res.status(404).json({ error: 'Pairing not found' });
    }

    // The person whose partner is being changed (participant_a = Bobby)
    const subjectId = currentPairing.participant_a_id;
    // Bobby's current partner who will be displaced (Advay)
    const displacedId = currentPairing.participant_b_id;

    // Find if the new partner (Jack) is already paired with someone else
    const [newPartnerExistingPairing] = await sql`
      SELECT * FROM pairings
      WHERE (participant_a_id = ${newPartnerId} OR participant_b_id = ${newPartnerId})
        AND id != ${pairingId}
        AND round_number = ${currentPairing.round_number}
      LIMIT 1
    `;

    if (newPartnerExistingPairing) {
      // Jack is currently paired with John — put Advay where Jack was
      if (newPartnerExistingPairing.participant_a_id == newPartnerId) {
        // Jack is participant_a in his pairing → replace him with Advay
        await sql`
          UPDATE pairings
          SET participant_a_id = ${displacedId}
          WHERE id = ${newPartnerExistingPairing.id}
        `;
      } else {
        // Jack is participant_b in his pairing → replace him with Advay
        await sql`
          UPDATE pairings
          SET participant_b_id = ${displacedId}
          WHERE id = ${newPartnerExistingPairing.id}
        `;
      }
    }

    // Now assign Jack to Bobby's pairing
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
