import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function setupDb() {
  console.log('Setting up database...');

  await sql`
    CREATE TABLE IF NOT EXISTS participants (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      session_id TEXT,
      last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS activity_state (
      id INTEGER PRIMARY KEY DEFAULT 1,
      is_active BOOLEAN DEFAULT false,
      current_round INTEGER DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    INSERT INTO activity_state (id, is_active, current_round)
    VALUES (1, false, 0)
    ON CONFLICT (id) DO NOTHING
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS pairings (
      id SERIAL PRIMARY KEY,
      round_number INTEGER NOT NULL,
      participant_a_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
      participant_b_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
      topic TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Add topic column to existing deployments that were created before this column was added
  await sql`
    ALTER TABLE pairings ADD COLUMN IF NOT EXISTS topic TEXT
  `;

  console.log('Database setup complete.');
}

setupDb().catch((err) => {
  console.error('Database setup failed:', err);
  process.exit(1);
});
