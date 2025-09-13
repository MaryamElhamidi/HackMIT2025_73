# Green Roast - Frontend

A React application for analyzing AI prompt carbon footprints with a fun, interactive interface.

## Features

- **Landing Page**: Clean input interface with animated tree mascot
- **Results Page**: Dynamic visualization of carbon footprint with progress bars and roast messages
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Smooth Animations**: Framer Motion for engaging user interactions
- **Tree Mascot**: Changes expression based on carbon footprint (happy/sad)

## Tech Stack

- React 19
- TailwindCSS for styling
- Framer Motion for animations
- React Router for navigation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## API Integration

The frontend expects a backend API at `/analyze` that accepts POST requests with:
```json
{
  "prompt": "user's AI prompt"
}
```

And returns:
```json
{
  "tokens": 314,
  "carbon_cost": 2.1,
  "roast": "Funny roast message",
  "rewrite": "Greener alternative prompt"
}
```

## Components

- `LandingPage.jsx`: Main input interface
- `ResultsPage.jsx`: Results visualization with dynamic tree and progress bars

## Assets

- `tree-happy.svg`: Happy tree mascot for low carbon footprints
- `tree-sad.svg`: Sad tree mascot for high carbon footprints