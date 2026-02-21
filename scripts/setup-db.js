import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from the parent directory
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
  try {
    console.log('Setting up database schema...');

    // Create activity_state table
    await sql`
      CREATE TABLE IF NOT EXISTS activity_state (
        id SERIAL PRIMARY KEY,
        is_active BOOLEAN DEFAULT false,
        current_round INTEGER DEFAULT 0,
        current_topic TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Created activity_state table');

    // Create participants table
    await sql`
      CREATE TABLE IF NOT EXISTS participants (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        session_id TEXT NOT NULL,
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Created participants table');

    // Create pairings table
    await sql`
      CREATE TABLE IF NOT EXISTS pairings (
        id SERIAL PRIMARY KEY,
        round_number INTEGER NOT NULL,
        participant_a_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
        participant_b_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Created pairings table');

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_participants_session ON participants(session_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_participants_last_seen ON participants(last_seen)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_pairings_round ON pairings(round_number)`;
    console.log('✓ Created indexes');

    // Insert default activity_state row if it doesn't exist
    const result = await sql`SELECT id FROM activity_state WHERE id = 1`;
    if (result.length === 0) {
      await sql`
        INSERT INTO activity_state (id, is_active, current_round, current_topic)
        VALUES (1, false, 0, NULL)
      `;
      console.log('✓ Inserted default activity_state row');
    } else {
      console.log('✓ Default activity_state row already exists');
    }

    console.log('\n✅ Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
