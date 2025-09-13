from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow React to call Flask from localhost:3000

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    prompt = data.get("prompt", "")
    return jsonify({"roast": f"Wow, {len(prompt.split())} words!"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)