from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Flask is running!"})

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    prompt = data.get("prompt", "")
    token_count = len(prompt.split())
    return jsonify({
        "tokens": token_count,
        "roast": f"Wow… {token_count} words!"
    })

if __name__ == "__main__":
    app.run(debug=True, port=6767)
