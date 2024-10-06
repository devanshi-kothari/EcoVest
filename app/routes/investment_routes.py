from flask import Blueprint, request, jsonify
from services.investment_recommender import generate_investment_recommendations
from services.vectorizer import vectorize

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

@bp.route('/feedback', methods=['POST'])
def process_feedback():
    feedback_data = request.json
    old_portfolio = feedback_data.get("portfolio", {})
    change = feedback_data.get("change", {})
    feedback = feedback_data.get("user_response", "")

    vectorize(change,feedback)

    for stock in change:
        if feedback == "no":
            if stock in old_portfolio:
                old_portfolio[stock] += -1*change[stock]
    print(old_portfolio)
    return jsonify(old_portfolio)
