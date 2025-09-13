import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);

  const analyzePrompt = async () => {
    const res = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-6">
      <textarea
        className="border p-2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Paste your prompt here..."
      />
      <button
        className="bg-green-500 text-white px-4 py-2 mt-2"
        onClick={analyzePrompt}
      >
        Analyze
      </button>
      {result && (
        <div className="mt-4">
          <h2 className="font-bold">Roast:</h2>
          <p>{result.roast}</p>
        </div>
      )}
    </div>
  );
}

export default App;
