import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyzePrompt = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to analyze')
      return
    }

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const response = await fetch('http://localhost:6767/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze prompt')
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      setError('Error analyzing prompt. Make sure the backend is running!')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getRoastLevelColor = (level) => {
    switch (level) {
      case 'efficient': return '#10b981' // green
      case 'moderate': return '#f59e0b' // yellow
      case 'wasteful': return '#f97316' // orange
      case 'excessive': return '#ef4444' // red
      default: return '#6b7280' // gray
    }
  }

  const getEfficiencyEmoji = (level) => {
    switch (level) {
      case 'efficient': return '🌱'
      case 'moderate': return '🌿'
      case 'wasteful': return '🌳'
      case 'excessive': return '🔥'
      default: return '❓'
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌱 Green Roast</h1>
        <p>Carbon Footprint Roaster for AI Prompts</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <h2>Enter your AI prompt:</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            className="prompt-input"
            rows={4}
          />
          <button 
            onClick={analyzePrompt} 
            disabled={loading || !prompt.trim()}
            className="analyze-button"
          >
            {loading ? 'Analyzing...' : '🌍 Analyze Carbon Footprint'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {analysis && (
          <div className="results-section">
            <div className="carbon-card">
              <h3>Carbon Footprint Analysis</h3>
              <div className="metrics-grid">
                <div className="metric">
                  <span className="metric-label">Tokens Used:</span>
                  <span className="metric-value">{analysis.tokens}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">CO₂ Emissions:</span>
                  <span className="metric-value">{analysis.carbon}g</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Efficiency Score:</span>
                  <span className="metric-value">{Math.round(analysis.efficiency_score)}/100</span>
                </div>
              </div>
              
              <div className="roast-level" style={{ backgroundColor: getRoastLevelColor(analysis.roast_level) }}>
                {getEfficiencyEmoji(analysis.roast_level)} {analysis.roast_level.toUpperCase()}
              </div>
            </div>

            <div className="roast-card">
              <h3>🔥 The Roast</h3>
              <p className="roast-text">{analysis.roast}</p>
            </div>

            {analysis.rewrite && (
              <div className="rewrite-card">
                <h3>💚 Greener Alternative</h3>
                <div className="rewrite-content">
                  <p className="rewrite-text">{analysis.rewrite}</p>
                  <div className="savings">
                    <span className="savings-text">
                      💾 Saves {analysis.token_savings} tokens ({analysis.carbon_savings}g CO₂)
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="analysis-card">
              <h3>🤖 AI Analysis</h3>
              <p className="analysis-text">{analysis.claude_analysis}</p>
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>🌍 Why This Matters</h3>
          <p>
            Every AI prompt consumes computational resources and generates CO₂ emissions. 
            By optimizing your prompts, you can reduce your digital carbon footprint while 
            getting better results from AI models.
          </p>
          <div className="tips">
            <h4>💡 Tips for Greener Prompts:</h4>
            <ul>
              <li>Be direct and specific</li>
              <li>Avoid unnecessary pleasantries</li>
              <li>Remove redundant requests</li>
              <li>Use clear, concise language</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built for Infosys Carbon-Conscious Intelligence Challenge</p>
      </footer>
    </div>
  )
}

export default App
