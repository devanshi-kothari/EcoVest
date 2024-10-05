import './Home.css';
import { Link } from 'react-router-dom';
import Search from './Search';
import Sidebar from '../components/Sidebar';
import Slider from '../components/Slider';
import { useState } from 'react';

function Preferences() {
  const [energy, setEnergy] = useState(50);
  const [water, setWater] = useState(50);
  const [waste, setWaste] = useState(50);
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
        <h2>Set your sustainability preferences:</h2>
        <Slider label="Energy Efficiency" value={energy} onChange={setEnergy} />
        <Slider label="Water Conservation" value={water} onChange={setWater} />
        <Slider label="Waste Reduction" value={waste} onChange={setWaste} />
        <h3>Select categories you're interested in:</h3>
        <div className="categories">
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
  );
}

export default Preferences;