import './Home.css';
import { Link } from 'react-router-dom';
import Search from './Search';
import Sidebar from '../components/Sidebar';
import Slider from '../components/Slider';
import { useState } from 'react';

function Preferences() {
  const [energy, setEnergy] = useState(2);
  const [water, setWater] = useState(2);
  const [waste, setWaste] = useState(2);
  const [waterConservation, setWaterConservation] = useState(2);
  const [GreenBuildings, setGreenBuildings] = useState(2);
  const [fairLabor, setfairLabor] = useState(2);


  const [categories, setCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
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
          </div>
          <div className="categories">
            <h2>Select categories you're interested in:</h2>
            <label>
              <input
                type="checkbox"
                value="Tech"
                checked={categories.includes('Tech')}
                onChange={() => handleCategoryChange('Tech')}
              />
              Tech
            </label>
            <label>
              <input
                type="checkbox"
                value="Fashion"
                checked={categories.includes('Fashion')}
                onChange={() => handleCategoryChange('Fashion')}
              />
              Fashion
            </label>
            <label>
              <input
                type="checkbox"
                value="Energy"
                checked={categories.includes('Energy')}
                onChange={() => handleCategoryChange('Energy')}
              />
              Energy
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;