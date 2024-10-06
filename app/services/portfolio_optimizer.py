import numpy as np
from scipy.optimize import minimize
import random
import yfinance as yf

def optimize_portfolio(current_portfolio, universe):
    total_value = sum(current_portfolio.values())

    def objective(weights):
        # Calculate portfolio similarity
        portfolio_diff = np.sum(np.abs(weights - current_weights))
        
        # Calculate expected returns
        returns = sum(historical_returns.get(stock, 0) * weight for stock, weight in zip(universe, weights))
        
        # Calculate sustainability score
        sustainability_scores = {stock: random.uniform(0, 1) for stock in universe}  # Replace with actual ESG data
        sustainability_score = sum(sustainability_scores[stock] * weight for stock, weight in zip(universe, weights))
        
        # Combine objectives with adjustable weights
        return -(0.8 * returns + 0.2 * sustainability_score - 0 * portfolio_diff)

    def constraint_sum_to_one(weights):
        return np.sum(weights) - 1.0

    n = len(universe)
    current_weights = np.array([float(current_portfolio.get(stock, 0)) / total_value for stock in universe])

    # Calculate historical returns
    historical_returns = {}
    for stock in universe:
        try:
            ticker = yf.Ticker(stock)
            historical_data = ticker.history(period="1y")
            if not historical_data.empty and len(historical_data) > 1:
                historical_returns[stock] = (historical_data['Close'].iloc[-1] / historical_data['Close'].iloc[0]) - 1
            else:
                print(f"Warning: Not enough historical data for {stock}. Using average market return.")
                historical_returns[stock] = 0.08  # Assume 8% average market return
        except Exception as e:
            print(f"Error processing {stock}: {str(e)}. Using average market return.")
            historical_returns[stock] = 0.08  # Assume 8% average market return

    bounds = [(0, 1) for _ in range(n)]
    constraints = ({'type': 'eq', 'fun': constraint_sum_to_one})

    # Run optimization multiple times with different starting points
    best_result = None
    best_score = float('inf')
    for _ in range(10):
        initial_weights = np.random.dirichlet(np.ones(n))
        result = minimize(objective, initial_weights, method='SLSQP', bounds=bounds, constraints=constraints)
        if result.fun < best_score:
            best_score = result.fun
            best_result = result

    # Convert optimal weights back to share counts
    optimized_shares = {stock: int(weight * total_value) for stock, weight in zip(universe, best_result.x)}
    
    # Remove stocks with 0 shares
    optimized_shares = {stock: shares for stock, shares in optimized_shares.items() if shares > 0}

    return optimized_shares



# def optimize_portfolio(current_portfolio, user_preferences, esg_data, universe):

#     sustainability_scores = {stock: random.uniform(0, 100) for stock in universe}
#     # sustainability_scores = {}
#     # i = 6
#     # for stock in current_portfolio:
#     #     sustainability_scores[stock] = i
#     #     i+=20
#     def objective(weights):
#         # Calculate the difference from current portfolio
#         # portfolio_diff = np.sum(np.abs(weights - current_weights))

#         alpha = 0.1
#         portfolio_diff = np.sum(np.abs(weights - current_weights)) * alpha
        
#         # Calculate the sustainability score
#         # sustainability_scores = {stock: random.uniform(0, 100) for stock in universe}
#         # sustainability_score = sum(sustainability_scores[stock] * weight for stock, weight in zip(universe, weights))
#         sustainability_score = sum(sustainability_scores[stock] * weight for stock, weight in zip(universe, weights))
#         print(sustainability_score)
#         # sustainability_score = calculate_sustainability_score(weights, esg_data, user_preferences)
        
#         # We want to maximize sustainability score while minimizing portfolio changes
#         return -sustainability_score + portfolio_diff

#     def constraint_sum_to_one(weights):
#         return np.sum(weights) - 1.0

#     n = len(universe)
#     current_weights = np.zeros(n)
#     for stock, quantity in current_portfolio.items():
#         if stock in universe:
#             current_weights[universe.index(stock)] = quantity

#     current_weights /= np.sum(current_weights)

#     bounds = [(0, 1) for _ in range(n)]
#     constraints = ({'type': 'eq', 'fun': constraint_sum_to_one})

#     result = minimize(objective, current_weights, method='SLSQP', bounds=bounds, constraints=constraints)
#     print(result)

#     return dict(zip(universe, result.x))