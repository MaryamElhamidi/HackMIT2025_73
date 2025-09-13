# backend/app.py
from flask import Flask
from flask_cors import CORS
from backend.analyze import bp as analyze_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(analyze_bp)

@app.route("/")
def home():
    return {"message": "Flask is running!"}

if __name__ == "__main__":
    app.run(debug=True, port=6767)
