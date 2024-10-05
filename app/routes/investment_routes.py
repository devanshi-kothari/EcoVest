from flask import Blueprint, request, jsonify
from app.services.investment_recommender import generate_investment_recommendations

bp = Blueprint('investments', __name__, url_prefix='/api/investments')

@bp.route('/recommend', methods=['POST'])
def recommend_investments():
    user_data = request.json
    
    # Extract user preferences and portfolio data
    user_preferences = user_data.get('preferences', {})
    current_portfolio = user_data.get('current_portfolio', {})
    
    # Generate recommendations
    recommendations = generate_investment_recommendations(user_preferences, current_portfolio)
    
    return jsonify(recommendations)