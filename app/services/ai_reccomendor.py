from openai import OpenAI

def get_stock_suggestions(portfolio, preferences):
    # Prepare user message with portfolio and preferences
    user_message = f"My current stock portfolio is: {portfolio}. I am interested in sustainability preferences such as: {preferences}. Return only a json file and no additional text"

    client = OpenAI()

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a sustainable investment json generator helping users with stock suggestions based on sustainability preferences. You will take in the user's current portfolio and sustainability preferences, and then rebalance their portolfio to meet these sustainability needs without drastically altering their positons or investment areas and without negatively affecting their returns. Consider which stocks the user should buy, sell, and current holdings thye should rebalance. Only return a json file with each stock and the numner of shares the user should purchase (positive) or sell (negative) or not change (0): { stock: quantity of change, stock: quantity of change}. No additional text"}, #Just provide a series of reccomendations on stocks to buy, sell, and current holdings to rebalance.
            {
                "role": "user",
                "content": user_message
            }
        ]
    )
    suggested_stocks = completion.choices[0].message.content
    return suggested_stocks

sample_portfolio = {
    "AAPL": 50,
    "TSLA": 30,
    "AMZN": 20,
    "GOOGL": 40,
    "MSFT": 60
  }

sample_preferences = {
    "solar_energy": 0.8,
    "wind_energy": 0.5,
    "biodiversity": 0.7,
    "low_carbon_footprint": 0.9,
    "renewable_energy_investment": 1.0,
    "fossil_fuel_divestment": 1.0
  }

print(get_stock_suggestions(sample_portfolio, sample_preferences))