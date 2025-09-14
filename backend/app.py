from flask import Flask, jsonify, request
from flask_cors import CORS
import anthropic
import tiktoken
import os
from dotenv import load_dotenv
import random
import json
from pathlib import Path
import requests
import time

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# === Claude + Tokenizer Setup ===
claude_client = anthropic.Client(api_key=os.getenv("ANTHROPIC_API_KEY"))
encoding = tiktoken.get_encoding("cl100k_base")

# === Carbon constants ===
CARBON_PER_1K_TOKENS = 1.25  # grams CO2

# === History file ===
history_file = Path("history.json")

# === Suno Setup ===
SUNO_API_KEY = os.getenv("SUNO_API_KEY", "b409b9a61fca4574aa4d130e3dcee868")
SUNO_BASE_URL = "https://studio-api.prod.suno.com/api/v2/external/hackmit"

# --------------------------
# Utility Functions
# --------------------------

def count_tokens(text: str) -> int:
    """Count tokens using tiktoken"""
    return len(encoding.encode(text))

def calculate_carbon_footprint(tokens: int) -> float:
    """Calculate CO2 footprint in grams"""
    return round((tokens / 1000) * CARBON_PER_1K_TOKENS, 4)

def get_roast_level(tokens: int, carbon: float) -> str:
    """Classify prompt footprint"""
    if tokens < 50:
        return "efficient"
    elif tokens < 150:
        return "moderate"
    elif tokens < 300:
        return "wasteful"
    else:
        return "excessive"
def generate_roast(tokens: int, carbon: float, roast_level: str) -> str:
    """Pick a roast line based on level"""
    roasts = {
        "efficient": [
            "Wow, look at you. Prompt so short it could fit in a tweet. Touch grass 🌱",
            "You wrote that like you pay for tokens yourself. Respect 💸",
            "Short, sharp and eco-friendly. You’re basically the Elon of prompts, minus the lawsuits 🚀",
            "Prompt so lean it just applied for a modelling contract 📸"
        ],
        "moderate": [
            "This prompt is giving ‘middle child energy’ — not bad, not great. 🌍",
            "Congrats, you’re the diet version of wasteful. Half sugar, half shame 🥤",
            "Your prompt is like a Prius in the fast lane. Pick a side 🚗🌱",
            "Ok but why does this read like you’re getting paid by the word?"
        ],
        "wasteful": [
            f"LMAO… {tokens} tokens? That’s {carbon}g CO₂. Bro wrote a novel to ask a question 📚🔥",
            f"{carbon}g CO₂ for this?? Servers in Oregon just fainted. 🌲⚡",
            f"Your prompt’s so bloated it’s got its own zip code. {carbon}g CO₂ wasted 📮",
            f"Did you copy-paste your diary? {tokens} tokens = {carbon}g CO₂. Seek help 🤡"
        ],
        "excessive": [
            f"HOLY YAPPITY YAP. {tokens} tokens and {carbon}g CO₂?! You just speed-ran global warming 🔥🌍",
            f"{carbon}g CO₂ for THAT? You basically fired up a jet engine to ask ‘hi’ 🛫💀",
            f"Prompt so long ChatGPT started ageing in dog years. {tokens} tokens = {carbon}g CO₂ 🐶📆",
            f"You wrote ‘War & Peace’ to ask for a recipe. {carbon}g CO₂ — the planet wants a restraining order 📚🌋"
        ]
    }
    return random.choice(roasts[roast_level])

def get_claude_rewrite(prompt: str) -> str:
    """Claude makes a greener rewrite"""
    try:
        response = claude_client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=200,
            system="You are an AI assistant that helps users write more efficient, eco-friendly prompts. Rewrite user prompts to be shorter and more direct while preserving the original meaning and intent. Respond with just the rewritten prompt, nothing else.",
            messages=[{"role": "user", "content": f"Rewrite this prompt to be more efficient: {prompt}"}]
        )
        return response.content[0].text.strip()
    except Exception as e:
        print(f"Error getting Claude rewrite: {e}")
        return "Sorry, couldn't generate a rewrite right now. Try being more direct and specific!"

def get_claude_analysis(prompt: str) -> str:
    """Claude says if the prompt is efficient or wasteful"""
    try:
        response = claude_client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=100,
            system="Analyze this AI prompt and determine if it's efficient or wasteful. Respond with just 'EFFICIENT' or 'WASTEFUL' followed by a brief reason.",
            messages=[{"role": "user", "content": f"Analyze this prompt: {prompt}"}]
        )
        return response.content[0].text.strip()
    except Exception as e:
        print(f"Error getting Claude analysis: {e}")
        return "WASTEFUL - Could not analyze"

# --------------------------
# Routes
# --------------------------

@app.route("/")
def home():
    return jsonify({"message": "Flask is running!"})

@app.route("/analyze", methods=["POST"])
def analyze():
    """Main prompt analysis"""
    data = request.get_json()
    prompt = data.get("prompt", "")

    if not prompt.strip():
        return jsonify({"error": "No prompt provided"}), 400

    # Token + carbon calc
    token_count = count_tokens(prompt)
    carbon_cost = calculate_carbon_footprint(token_count)
    roast_level = get_roast_level(token_count, carbon_cost)
    roast = generate_roast(token_count, carbon_cost, roast_level)

    # Claude AI helpers
    rewrite = get_claude_rewrite(prompt)
    claude_analysis = get_claude_analysis(prompt)

    # Savings and score
    rewrite_tokens = count_tokens(rewrite)
    token_savings = max(0, token_count - rewrite_tokens)
    carbon_savings = calculate_carbon_footprint(token_savings)
    efficiency_score = max(0, 100 - (token_count / 10))  # simple scoring

    result = {
        "prompt": prompt,
        "tokens": token_count,
        "carbon_cost": carbon_cost,
        "roast": roast,
        "rewrite": rewrite,
        "roast_level": roast_level,
        "claude_analysis": claude_analysis,
        "token_savings": token_savings,
        "carbon_savings": carbon_savings,
        "efficiency_score": efficiency_score
    }

    # Save history
    history = []
    if history_file.exists():
        try:
            with open(history_file, "r") as f:
                history = json.load(f)
        except json.JSONDecodeError:
            history = []
    history.append(result)
    with open(history_file, "w") as f:
        json.dump(history, f, indent=2)

    return jsonify(result)

@app.route("/song", methods=["POST"])
def generate_song():
    """Generate a diss track from roast text using Suno"""
    data = request.json
    roast_text = data.get("roast", "").strip()
    style = data.get("style", "kendrick")  # optional style toggle

    if not roast_text:
        return jsonify({"error": "No roast text provided"}), 400

    # Suno: use topic mode so it generates original lyrics
    topic_prompt = (
        f"Write a savage 30-second diss rap in the style of {style}. "
        "Do NOT repeat the input text word-for-word. "
        "Make clever rhymes, internal rhymes, punchlines, and a melodic hook. "
        "Start immediately with vocals, no intro. "
        "Theme: roast wasteful AI prompts and carbon emissions. "
        f"Context/theme (for inspiration, not to repeat): {roast_text}"
    )

    payload = {
        "topic": topic_prompt,
        "tags": "rap, hip hop, diss track, lyrical, aggressive, melodic, kendrick-style",
        "make_instrumental": False
    }

    try:
        gen_resp = requests.post(
            f"{SUNO_BASE_URL}/generate",
            headers={"Authorization": f"Bearer {SUNO_API_KEY}", "Content-Type": "application/json"},
            json=payload,
            timeout=20
        )
    except Exception as e:
        return jsonify({"error": "Failed to reach Suno API", "details": str(e)}), 502

    if gen_resp.status_code not in (200, 201):
        return jsonify({"error": "Suno generation failed", "body": gen_resp.text}), 502

    clip_id = gen_resp.json().get("id")
    if not clip_id:
        return jsonify({"error": "No clip id returned"}), 502

    # Poll for streaming/complete
    for _ in range(18):  # ~90s max
        poll = requests.get(
            f"{SUNO_BASE_URL}/clips",
            headers={"Authorization": f"Bearer {SUNO_API_KEY}"},
            params={"ids": clip_id},
            timeout=10
        )
        if poll.status_code == 200:
            clips = poll.json()
            if isinstance(clips, list) and clips:
                clip = clips[0]
                status = clip.get("status", "")
                if status in ["streaming", "complete"]:
                    return jsonify({
                        "status": status,
                        "audio_url": clip.get("audio_url"),
                        "image_url": clip.get("image_url"),
                        "title": clip.get("title", "Green Roast Diss"),
                        "clip_id": clip_id,
                        "metadata": clip.get("metadata", {})
                    })
        time.sleep(5)

    return jsonify({"error": "Song generation timed out"}), 504

# --------------------------

if __name__ == "__main__":
    app.run(debug=True, port=6767)