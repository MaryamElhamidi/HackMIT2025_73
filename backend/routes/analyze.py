# backend/routes/analyze.py
from flask import Blueprint, request, jsonify
from backend.token_counter_service import token_counter

bp = Blueprint("analyze", __name__)

@bp.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json() or {}
    prompt = data.get("prompt", "")
    tokens = token_counter.count_tokens(prompt)
    kwh = token_counter.tokens_to_kwh(tokens)
    g_co2 = token_counter.kwh_to_gco2(kwh)
    return jsonify({
        "tokens": tokens,
        "kwh": kwh,
        "g_co2": g_co2,
    })
