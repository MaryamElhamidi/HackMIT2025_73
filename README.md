# 🌱 Green Roast - Carbon Footprint Roaster for AI Prompts

A fun and educational web application that analyzes AI prompts for their carbon footprint and provides humorous feedback along with suggestions for more efficient alternatives.

## 🎯 Project Overview

**Green Roast** makes carbon-conscious AI usage fun and accessible by:
- Analyzing prompts for token usage and CO₂ emissions
- Providing humorous "roasts" based on prompt efficiency
- Suggesting greener, more efficient alternatives using Claude AI
- Visualizing carbon footprint data in an engaging way

Built for the **Infosys Carbon-Conscious Intelligence Challenge**.

## ✨ Features

- **Token Analysis**: Accurate token counting using tiktoken
- **Carbon Footprint Calculation**: Real CO₂ emission estimates
- **AI-Powered Roasting**: Funny feedback based on prompt wastefulness
- **Smart Rewrites**: Claude AI suggests more efficient alternatives
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Real-time Analysis**: Instant feedback on prompt efficiency

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- Anthropic API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd HackMIT2025_73/backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```

3. Set up your Anthropic API key:
   ```bash
   # Create a .env file in the project root
   echo "ANTHROPIC_API_KEY=your_api_key_here" > .env
   ```

4. Run the Flask backend:
   ```bash
   python app.py
   ```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd HackMIT2025_73/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## 🏗️ Architecture

### Backend (Python/Flask)
- **Token Counting**: Uses tiktoken for accurate OpenAI-compatible token counting
- **Carbon Calculation**: Based on research data (~1.25g CO₂ per 1K tokens)
- **Claude Integration**: Uses Anthropic's Claude API for analysis and rewrites
- **Roast Generation**: Multiple roast levels with funny, contextual feedback

### Frontend (React/Vite)
- **Modern UI**: Clean, responsive design with glassmorphism effects
- **Real-time Analysis**: Instant feedback on prompt submission
- **Visual Indicators**: Color-coded efficiency levels and metrics
- **Smooth Animations**: Engaging user experience

## 🔧 API Endpoints

### POST /analyze
Analyzes a prompt and returns carbon footprint data.

**Request:**
```json
{
  "prompt": "Your AI prompt here"
}
```

**Response:**
```json
{
  "tokens": 150,
  "carbon": 0.1875,
  "roast": "Funny roast message",
  "rewrite": "More efficient prompt",
  "rewrite_tokens": 75,
  "carbon_savings": 0.0938,
  "token_savings": 75,
  "roast_level": "wasteful",
  "claude_analysis": "EFFICIENT/WASTEFUL - reason",
  "efficiency_score": 85
}
```

### GET /health
Health check endpoint.

## 🌍 Carbon Footprint Calculation

The app uses research-based estimates:
- **GPT-3.5**: ~0.4g CO₂ per 1K tokens
- **GPT-4**: ~2.1g CO₂ per 1K tokens
- **Average**: ~1.25g CO₂ per 1K tokens (used in calculations)

## 🎨 Design Philosophy

- **Fun First**: Making environmental awareness engaging
- **Educational**: Teaching users about AI's environmental impact
- **Accessible**: Simple, intuitive interface
- **Visual**: Clear metrics and progress indicators

## 🛠️ Development

### Project Structure
```
HackMIT2025_73/
├── backend/
│   └── app.py              # Flask API server
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   └── App.css         # Styling
│   └── package.json        # Frontend dependencies
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

### Key Technologies
- **Backend**: Flask, Anthropic Claude API, tiktoken
- **Frontend**: React, Vite, CSS3
- **Styling**: Custom CSS with glassmorphism effects
- **API**: RESTful design with CORS support

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Install dependencies: `pip install -r requirements.txt`
3. Run: `python app.py`

### Frontend Deployment
1. Build: `npm run build`
2. Serve the `dist` folder with any static server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is built for the Infosys Carbon-Conscious Intelligence Challenge.

## 🙏 Acknowledgments

- Anthropic for Claude API access
- OpenAI for tiktoken tokenization
- Research on AI carbon footprints
- The Infosys challenge for inspiration

---

**Make AI greener, one prompt at a time! 🌱**
