from services.portfolio_analyzer import analyze_portfolio
from services.sustainability_scorer import score_sustainability
from services.ai_reccomendor import get_stock_suggestions
import json
import numpy as np
from scipy.optimize import minimize
import random
import yfinance as yf

def generate_investment_recommendations(user_preferences, current_portfolio):
    # Analyze the current portfolio
    portfolio_analysis = analyze_portfolio(current_portfolio)
    
    # Score sustainability based on user preferences
    sustainability_scores = score_sustainability(user_preferences)

    
    # Generate recommendations based on analysis and scores
    # recommendations = optimize_portfolio(portfolio_analysis, sustainability_scores, user_preferences)
    suggestions = json.loads(get_stock_suggestions(current_portfolio, user_preferences))
    # universe = []
    # for stock in current_portfolio:
    #     universe.append(stock)
    # new_portfolio = optimize_portfolio(current_portfolio, user_preferences, {}, universe)
    new_portfolio = {}
    new_buys = {}
    current_buys = {} # buying more a stock that is currently held
    sells = {}
    for stock in suggestions:
        if stock in current_portfolio:
            new_portfolio[stock] = current_portfolio[stock]+suggestions[stock]
            if suggestions[stock] > 0:
                current_buys[stock] = suggestions[stock]
            elif suggestions[stock] < 0:
                sells[stock] = suggestions[stock]
        elif suggestions[stock] > 0:
            new_buys[stock] = suggestions[stock]
            new_portfolio[stock] = suggestions[stock]
    
    for stock in current_portfolio:
        if stock not in new_portfolio:
            new_portfolio[stock] = current_portfolio[stock]

    old_returns = calculate_portfolio_returns(current_portfolio)
    new_returns = calculate_portfolio_returns(new_portfolio)
    
    # Calculate sustainability scores
    old_sustainability = calculate_sustainability_score(current_portfolio)
    new_sustainability = calculate_sustainability_score(new_portfolio)
    sustainability_improvement = (new_sustainability - old_sustainability) / old_sustainability * 100


    # recommendations = convert_weights_to_actions(current_portfolio, new_portfolio)

    outputs = []
    outputs.append({"old_portfolio": current_portfolio})
    outputs.append({"new_portfolio": new_portfolio})
    outputs.append({"new_buys": new_buys})
    outputs.append({"current_buys": current_buys})
    outputs.append({"sells": sells})
    outputs.append({"old_returns": f"{old_returns:.2%}"})
    outputs.append({"new_returns": f"{new_returns:.2%}"})
    outputs.append({"returns_difference": f"{new_returns - old_returns:.2%}"})
    outputs.append({"old_sustainability": f"{old_sustainability:.2f}"})
    outputs.append({"new_sustainability": f"{new_sustainability:.2f}"})
    outputs.append({"sustainability_improvement": f"{sustainability_improvement:.2f}%"})
    

    print(outputs)

    return outputs



def calculate_portfolio_returns(portfolio):
    total_value = sum(portfolio.values())
    returns = 0
    for stock, shares in portfolio.items():
        try:
            ticker = yf.Ticker(stock)
            historical_data = ticker.history(period="1y")
            if not historical_data.empty and len(historical_data) > 1:
                annual_return = (historical_data['Close'].iloc[-1] / historical_data['Close'].iloc[0]) - 1
            else:
                print(f"Warning: Not enough historical data for {stock}. Using 0% return.")
                annual_return = 0
            weight = shares / total_value
            returns += weight * annual_return
        except Exception as e:
            print(f"Error processing {stock}: {str(e)}. Using 0% return.")
            # If there's an error, assume 0% return for this stock
            pass
    return returns

def optimize_portfolio(current_portfolio, user_preferences, esg_data, universe):

    sustainability_scores = {stock: random.uniform(0, 100) for stock in universe}
    # sustainability_scores = {}
    # i = 6
    # for stock in current_portfolio:
    #     sustainability_scores[stock] = i
    #     i+=20
    def objective(weights):
        # Calculate the difference from current portfolio
        # portfolio_diff = np.sum(np.abs(weights - current_weights))

        alpha = 0.1
        portfolio_diff = np.sum(np.abs(weights - current_weights)) * alpha
        
        # Calculate the sustainability score
        # sustainability_scores = {stock: random.uniform(0, 100) for stock in universe}
        # sustainability_score = sum(sustainability_scores[stock] * weight for stock, weight in zip(universe, weights))
        sustainability_score = sum(sustainability_scores[stock] * weight for stock, weight in zip(universe, weights))
        print(sustainability_score)
        # sustainability_score = calculate_sustainability_score(weights, esg_data, user_preferences)
        
        # We want to maximize sustainability score while minimizing portfolio changes
        return -sustainability_score + portfolio_diff

    def constraint_sum_to_one(weights):
        return np.sum(weights) - 1.0

    n = len(universe)
    current_weights = np.zeros(n)
    for stock, quantity in current_portfolio.items():
        if stock in universe:
            current_weights[universe.index(stock)] = quantity

    current_weights /= np.sum(current_weights)

    bounds = [(0, 1) for _ in range(n)]
    constraints = ({'type': 'eq', 'fun': constraint_sum_to_one})

    result = minimize(objective, current_weights, method='SLSQP', bounds=bounds, constraints=constraints)
    print(result)

    return dict(zip(universe, result.x))

def calculate_sustainability_score(portfolio):
    return sum(shares * random.uniform(0, 1) for shares in portfolio.values())
    # score = 0
    # for stock, weight in zip(universe, weights):
    #     stock_esg = esg_data[stock]
    #     stock_score = sum(stock_esg[category] * user_preferences[category] for category in user_preferences)
    #     score += weight * stock_score
    # return score


def convert_weights_to_actions(current_portfolio, optimized_weights):
    actions = []
    print(optimized_weights)
    for stock, new_weight in optimized_weights.items():
        current_weight = current_portfolio.get(stock, 0) / sum(current_portfolio.values())
        print(new_weight, current_weight)
        if new_weight > current_weight:
            actions.append({
                "action": "Buy",
                "stock": stock,
                "amount": int((new_weight - current_weight) * sum(current_portfolio.values()))
            })
        elif new_weight < current_weight:
            actions.append({
                "action": "Sell",
                "stock": stock,
                "amount": int((current_weight - new_weight) * sum(current_portfolio.values()))
            })
    
    return {
        "recommended_actions": actions,
        "sustainability_impact": {
            "overall_improvement": f"{random.randint(1, 10)}%"
        }
    }



# def optimize_portfolio(portfolio_analysis, sustainability_scores, user_preferences):

#      # TODO: Implement the actual recommendation algorithm
#     # This is where you'd use the portfolio analysis and sustainability scores
#     # to generate tailored investment recommendations


#     # This is where you'd implement your main investment decision algorithm
#     # For now, we'll return a placeholder recommendation
#     recommendations = {
#         "recommended_actions": [
#             {"action": "Buy", "stock": "SUSTAINABLE_CORP", "amount": 100},
#             {"action": "Sell", "stock": "FOSSIL_FUEL_INC", "amount": 50}
#         ],
#         "sustainability_impact": {
#             "carbon_reduction": "+5%",
#             "renewable_energy_increase": "+3%"
#         }
#     }
    
#     return recommendations