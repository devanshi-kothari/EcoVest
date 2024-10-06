import requests
import pandas as pd
import yfinance as yf
from bs4 import BeautifulSoup
from io import StringIO
import requests


# Step 1: Scrape the list of S&P 500 companies from Wikipedia
def get_sp500_companies():
    url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Parse the table containing S&P 500 companies
    table = soup.find('table', {'id': 'constituents'})
    
    # Convert the HTML table to a string and use StringIO
    table_str = str(table)
    df = pd.read_html(StringIO(table_str))[0]
    
    # Extract ticker symbols and company names
    tickers = df['Symbol'].tolist()
    return tickers

# Get the list of S&P 500 tickers
sp500_tickers = get_sp500_companies()
print(f"Total S&P 500 companies: {len(sp500_tickers)}")
print(sp500_tickers)

def get_esg_data(tickers, api_key = "insert_api_key", year=2021):
    esg_data = {}
    for ticker in tickers:
        try:
            # Make the API request
            url = f'https://financialmodelingprep.com/api/v4/esg-environmental-social-governance-sector-benchmark?year={year}&apikey={api_key}' #&apikey={api_key}
            response = requests.get(url)
            
            if response.status_code == 200:
                data = response.json()
                if data:  # Ensure data is not empty
                    esg_data[ticker] = {
                        'environmental_score': data[0].get('environmentalScore', None),
                        'social_score': data[0].get('socialScore', None),
                        'governance_score': data[0].get('governanceScore', None),
                        'esg_total_score': data[0].get('ESGScore', None),
                    }
                    print(f"Fetched ESG data for {ticker}")
                else:
                    print(f"No ESG data available for {ticker}")
            else:
                print(f"Failed to fetch data for {ticker}: {response.status_code}")
        
        except Exception as e:
            print(f"Failed to fetch data for {ticker}: {e}")

        break

    return esg_data
    

# Step 2: Fetch ESG data for each S&P 500 company
# def fetch_esg_data(tickers):
#     esg_data = {}
#     # for ticker in tickers:
#     #     try:
#     #         stock = yf.Ticker(ticker)
#     #         esg = stock.sustainability.to_dict()
#     #         esg_data[ticker] = esg
#     #         print(f"Fetched ESG data for {ticker}")
#     #     except Exception as e:
#     #         print(f"Failed to fetch data for {ticker}: {e}")

#     for ticker in sp500_tickers:
#         company_esg = get_esg_data(ticker)
#         if esg_data is not None:
#             esg_data[ticker] = company_esg
    
#     return esg_data

# Fetch ESG data for S&P 500 companies
esg_scores = get_esg_data(sp500_tickers)

# Print some example data
for ticker, data in esg_scores.items():
    print(ticker, data)
    break
