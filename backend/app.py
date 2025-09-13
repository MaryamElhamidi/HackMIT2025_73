from flask import Flask, jsonify, request
from flask_cors import CORS
import anthropic
import tiktoken
import os
from dotenv import load_dotenv
import re
import random

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Flask is running!"})

# Initialize Claude client
claude_client = anthropic.Client(api_key=os.getenv("ANTHROPIC_API_KEY"))

# Initialize tokenizer for accurate token counting
encoding = tiktoken.get_encoding("cl100k_base")

# Carbon footprint constants (grams CO2 per token)
CARBON_PER_1K_TOKENS = 1.25  # grams CO2

def count_tokens(text):
    """Count tokens using tiktoken (same as OpenAI)"""
    return len(encoding.encode(text))

def calculate_carbon_footprint(tokens):
    """Calculate carbon footprint in grams CO2"""
    return round((tokens / 1000) * CARBON_PER_1K_TOKENS, 4)

def get_roast_level(tokens, carbon):
    """Determine roast level based on token count and carbon footprint"""
    if tokens < 50:
        return "efficient"
    elif tokens < 150:
        return "moderate"
    elif tokens < 300:
        return "wasteful"
    else:
        return "excessive"

def generate_roast(tokens, carbon, roast_level):
    """Generate funny roast based on prompt wastefulness"""
    roasts = {
        "efficient": [
            "Nice! You're actually being pretty eco-friendly with that prompt 🌱",
            "Respect! You kept it concise and green 💚",
            "You're doing the planet a solid with that efficient prompt!",
            "Short and sweet - the way Mother Nature likes it! 🌿"
        ],
        "moderate": [
            "Not bad, but you could probably trim a few words there, eco-warrior 🌍",
            "Decent effort, but your prompt is like a slightly overwatered plant 🌱",
            "You're in the green zone, but there's room for improvement!",
            "Not terrible, but your carbon footprint is giving off 'could be better' vibes"
        ],
        "wasteful": [
            f"Bruh... {tokens} tokens? That's {carbon}g CO₂! You just killed a small plant asking ChatGPT to write a grocery list 🌱💀",
            f"Yikes! {carbon}g of CO₂ for that? Your prompt is more wasteful than a plastic straw factory 🥤",
            f"Bro, you just used {tokens} tokens to ask 'what's the weather?' That's {carbon}g CO₂ of pure digital deforestation 🌳",
            f"Your prompt is so wordy, it's like asking someone to walk to the corner store via the moon. {carbon}g CO₂ wasted! 🚀"
        ],
        "excessive": [
            f"HOLY CARBON FOOTPRINT! {tokens} tokens and {carbon}g CO₂?! You just single-handedly melted an ice cube asking for a recipe 🧊💥",
            f"Bruh, you just emitted {carbon}g CO₂ with that prompt! That's like driving a car for 0.3 seconds just to ask 'hi' 🚗💨",
            f"Your prompt is so long, it has its own carbon footprint! {carbon}g CO₂ - you could've powered a small village with that energy ⚡",
            f"Did you just write a novel to ask ChatGPT to write a novel? {tokens} tokens = {carbon}g CO₂ = one very confused AI 🤖💭"
        ]
    }
    return random.choice(roasts[roast_level])

def get_claude_rewrite(prompt):
    """Use Claude to suggest a greener rewrite of the prompt"""
    try:
        response = claude_client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=200,
            system="You are an AI assistant that helps users write more efficient, eco-friendly prompts. Rewrite user prompts to be shorter and more direct while preserving the original meaning and intent. Respond with just the rewritten prompt, nothing else.",
            messages=[
                {"role": "user", "content": f"Rewrite this prompt to be more efficient: {prompt}"}
            ]
        )
        return response.content[0].text.strip()
    except Exception as e:
        print(f"Error getting Claude rewrite: {e}")
        return "Sorry, couldn't generate a rewrite right now. Try being more direct and specific!"

def get_claude_analysis(prompt):
    """Use Claude to analyze if the prompt is already efficient"""
    try:
        response = claude_client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=100,
            system="Analyze this AI prompt and determine if it's efficient or wasteful. Respond with just 'EFFICIENT' or 'WASTEFUL' followed by a brief reason.",
            messages=[
                {"role": "user", "content": f"Analyze this prompt: {prompt}"}
            ]
        )
        return response.content[0].text.strip()
    except Exception as e:
        print(f"Error getting Claude analysis: {e}")
        return "WASTEFUL - Could not analyze"

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    prompt = data.get("prompt", "")

    if not prompt.strip():
        return jsonify({"error": "No prompt provided"}), 400

    # Use proper token counting and carbon calculation
    token_count = count_tokens(prompt)
    carbon_cost = calculate_carbon_footprint(token_count)
    roast_level = get_roast_level(token_count, carbon_cost)
    roast = generate_roast(token_count, carbon_cost, roast_level)
    
    # Get AI-generated rewrite and analysis
    rewrite = get_claude_rewrite(prompt)
    claude_analysis = get_claude_analysis(prompt)
    
    # Calculate potential savings
    rewrite_tokens = count_tokens(rewrite)
    token_savings = max(0, token_count - rewrite_tokens)
    carbon_savings = calculate_carbon_footprint(token_savings)
    
    # Calculate efficiency score (100 - waste percentage)
    efficiency_score = max(0, 100 - (token_count / 10))  # Simple scoring

    return jsonify({
        "tokens": token_count,
        "carbon": carbon_cost,
        "roast": roast,
        "rewrite": rewrite,
        "roast_level": roast_level,
        "claude_analysis": claude_analysis,
        "token_savings": token_savings,
        "carbon_savings": carbon_savings,
        "efficiency_score": efficiency_score
    })

if __name__ == "__main__":
    app.run(debug=True, port=6767)
