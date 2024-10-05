import React from 'react';
import './Slider.css';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function Slider({ label, value, onChange }: SliderProps) {
  return (
    <div className="slider-container">
      <label>{label}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span>{value}</span>
    </div>
  );
}

export default Slider;