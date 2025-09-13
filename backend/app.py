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
CORS(app)  # allows React frontend to talk to Flask backend

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    prompt = data.get("prompt", "")

    # Dummy logic (to be replaced later)
    token_count = len(prompt.split())
    carbon_cost = round(token_count * 0.0002, 5)  # mock estimate
    roast = f"Bruh... {token_count} tokens? That's {carbon_cost}g CO₂ wasted!"
    greener = "Try: 'Summarize this text' instead of 'Can you please kindly...'" 

    return jsonify({
        "tokens": token_count,
        "carbon_cost": carbon_cost,
        "roast": roast,
        "rewrite": greener
    })

if __name__ == "__main__":
    app.run(debug=True, port=6767)
