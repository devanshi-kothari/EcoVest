import pandas as pd
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


csv_file = "companies.csv"
df = pd.read_csv(csv_file)
# Assuming the columns are "Company Name", "Column1", and "Column2"
companies = df[['Symbol', 'Security']].to_dict(orient='records')

# Base URL of the website you're scraping
base_url = "https://uprightplatform.com"

driver = webdriver.Chrome(executable_path='/Users/devanshikothari/Downloads/chromedriver-mac-arm64/chromedriver')

esg_data = {}

for company in companies:
    company_ticker = company['Symbol']
    company_name = company['Security']

    driver.get(base_url)

    search_bar = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="outer-content"]/div[2]/div[2]/div/div/div[2]/div[1]/div/div/div[1]/div/div/span'))  # Adjust the locator for the search bar
    )
    search_bar.clear()
    search_bar.send_keys(company_name)
    search_bar.send_keys(Keys.RETURN)

    # driver.implicitly_wait(10)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "search-results-class")))

    esg_values = {}
    
    data_testids = [
        "impact-bar-data-label-E1-N",
        "impact-bar-data-label-E2-N",
        "impact-bar-data-label-E3-N",
        "impact-bar-data-label-E4-N",
        "impact-bar-data-label-E5-N"
    ]
    
    for data_testid in data_testids:
        try:
            # Locate the text element using the data-testid attribute
            text_element = driver.find_element(By.XPATH, f'//text[@data-testid="{data_testid}"]')
            esg_values[data_testid] = text_element.text.strip()  # Extract and store the text
        except Exception as e:
            print(f"Could not find element for {data_testid}: {e}")

    # Add the extracted ESG data to the main dictionary
    esg_data[company_name] = {
        "Symbol": company_ticker,
        "ESG_Values": esg_values
    }

print(esg_data)

with open("/data/esg_data.json", "w") as json_file:
    json.dump(esg_data, json_file, indent=4)

driver.quit()