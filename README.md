# Psych Experiment App

A psychology experiment pairing activity app built with React, Vite, and Neon PostgreSQL database.

## Live Demo

Production: https://web-six-xi-89.vercel.app

## Features

- Real-time participant pairing system
- Admin controls for managing rounds
- Automatic participant heartbeat tracking
- Random topic assignment for discussions
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: Neon PostgreSQL (serverless)
- **Deployment**: Vercel
- **State Management**: React Query

## Project Structure

```
.
├── api/
│   └── activity/
│       ├── admin.js      # Admin controls (start/next/reset)
│       ├── heartbeat.js  # Participant heartbeat updates
│       ├── join.js       # Join activity endpoint
│       └── state.js      # Get current activity state
├── src/
│   ├── pages/
│   │   ├── Activity.jsx  # Participant view
│   │   ├── Admin.jsx     # Admin controls
│   │   ├── Home.jsx      # Landing page
│   │   └── Learn.jsx     # Information page
│   ├── App.jsx           # App router
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── scripts/
│   └── setup-db.js       # Database schema setup
└── vercel.json           # Vercel configuration
```

## Setup

### Prerequisites

- Node.js 18+
- npm or pnpm
- Neon database account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/advayc/psychproj.git
   cd psychproj
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   DATABASE_URL=your_neon_database_url
   ```

4. **Set up the database**
   
   Run the database setup script to create tables:
   ```bash
   npm run setup-db
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at http://localhost:3000

## Database Schema

The app uses three main tables:

- **activity_state**: Stores current activity state (active/inactive, round, topic)
- **participants**: Tracks all participants with heartbeat timestamps
- **pairings**: Stores participant pairings for each round

See `scripts/setup-db.js` for the complete schema.

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Link your project**
   ```bash
   vercel link
   ```

3. **Add environment variables**
   ```bash
   vercel env add DATABASE_URL production
   vercel env add DATABASE_URL preview
   vercel env add DATABASE_URL development
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

### GitHub Integration

The repository is already connected to GitHub:
- Repository: https://github.com/advayc/psychproj
- Branch: main

Vercel will automatically deploy when you push to the main branch.

## API Endpoints

All API endpoints are serverless functions in the `/api/activity` directory:

- `POST /api/activity/join` - Join the activity as a participant
- `GET /api/activity/state` - Get current activity state
- `POST /api/activity/heartbeat` - Update participant heartbeat
- `POST /api/activity/admin` - Admin actions (start/next/reset)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run setup-db` - Set up database schema

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
