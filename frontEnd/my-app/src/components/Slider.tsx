import React from 'react';
import './Slider.css';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

// const categories = ['Low', 'Medium', 'High'];

function Slider({ label, value, onChange }: SliderProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="slider-container">
      <label>{label}</label>
      <input
        type="range"
        min="0"
        max="1"
        step=".1"
        value={value}
        onChange={handleSliderChange}
      />
      <span className = "slider-category">{value}</span>
    </div>
  );
}

export default Slider;