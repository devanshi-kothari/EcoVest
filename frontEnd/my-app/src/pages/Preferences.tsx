import './Home.css';
import { Link } from 'react-router-dom';
import Search from './Search';
import Sidebar from '../components/Sidebar';
import Slider from '../components/Slider';
import { useState } from 'react';

function Preferences() {
  const [energy, setEnergy] = useState(1);
  const [water, setWater] = useState(1);
  const [waste, setWaste] = useState(1);
  const [waterConservation, setWaterConservation] = useState(1);
  const [GreenBuildings, setGreenBuildings] = useState(1);
  const [fairLabor, setfairLabor] = useState(1);
  const [carbonReduction, setcarbonReduction] = useState(1);
  const [sustainableAgriculture, setsustainableAgriculture] = useState(1);
  const [sustainableTransport, setsustainableTransport] = useState(1);
  const [climateResilience, setclimateResilience] = useState(1);

  const [categories, setCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const sendDataToBackend = async () => {
    const preferences = {
      solar_energy: energy,
      wind_energy: water,
      biodiversity: waste,
      low_carbon_footprint: waterConservation,
      renewable_energy_investment: GreenBuildings,
      fossil_fuel_divestment: fairLabor,
      carbon_reduction: carbonReduction,
      sustainable_agriculture: sustainableAgriculture,
      sustainable_transport: sustainableTransport,
      climate_resilience: climateResilience,
    };

    const currentPortfolio = {
      AAPL: 50,
      TSLA: 30,
      AMZN: 20,
      GOOGL: 40,
      MSFT: 60,
    };

    const payload = {
      preferences,
      current_portfolio: currentPortfolio,
    };

    try {
      const response = await fetch('http://localhost:5000/api/investments/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const recommendations = await response.json();
      console.log('Recommendations:', recommendations);
      // Handle the recommendations data as needed
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <div className="preferences-container">
          <div className="preference">
            <h2>Set your sustainability preferences:</h2>
            <Slider label="Renewable Energy" value={energy} onChange={setEnergy} />
            <Slider label="Energy Efficiency" value={water} onChange={setWater} />
            <Slider label="Waste Reduction" value={waste} onChange={setWaste} />
            <Slider label="Water Conservation" value={waterConservation} onChange={setWaterConservation} />
            <Slider label="Green Buildings" value={GreenBuildings} onChange={setGreenBuildings} />
            <Slider label="Fair Labor" value={fairLabor} onChange={setfairLabor} />
            <Slider label="Carbon Reduction" value={carbonReduction} onChange={setcarbonReduction} />
            <Slider label="Sustainable Agriculture" value={sustainableAgriculture} onChange={setsustainableAgriculture} />
            <Slider label="Sustainable Transport" value={sustainableTransport} onChange={setsustainableTransport} />
          </div>
          <div className="categories">
            <h2 className="categories-heading">Select categories you're interested in:</h2>
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  id="tech"
                  value="Tech"
                  checked={categories.includes('Tech')}
                  onChange={() => handleCategoryChange('Tech')}
                />
                <label htmlFor="tech">Technology</label>

              </label>
              <label>
                <input
                  type="checkbox"
                  value="Fashion"
                  id="fashion"
                  checked={categories.includes('Fashion')}
                  onChange={() => handleCategoryChange('Fashion')}
                />
                <label htmlFor="fashion">Fashion and Apparel</label>
          
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Energy"
                  id="energy"
                  checked={categories.includes('Energy')}
                  onChange={() => handleCategoryChange('Energy')}
                />
                <label htmlFor="energy">Energy</label>

              </label>
              <label>
                <input
                  type="checkbox"
                  value="ConstructionRealEstate"
                  id="ConstructionRealEstate"
                  checked={categories.includes('Construction')}
                  onChange={() => handleCategoryChange('Construction')}
                />
                <label htmlFor="ConstructionRealEstate">Real Estate & Construction</label>
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Transportation"
                  id="Transportation"
                  checked={categories.includes('Transportation')}
                  onChange={() => handleCategoryChange('Transportation')}
                />
                <label htmlFor="Transportation">Transportation</label>
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Agriculture"
                  id="Agriculture"
                  checked={categories.includes('Agriculture')}
                  onChange={() => handleCategoryChange('Agriculture')}
                />
                <label htmlFor="Agriculture">Agriculture & Food</label>
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Healthcare"
                  id="Healthcare"
                  checked={categories.includes('Healthcare')}
                  onChange={() => handleCategoryChange('Healthcare')}
                />
                <label htmlFor="Healthcare">Healthcare</label>
              </label>
              <button className="preferences-button" onClick={sendDataToBackend}>Submit Preferences</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;