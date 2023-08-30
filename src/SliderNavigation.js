import React, { useState } from 'react';





const SliderNavigation = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, items.length - 1));
  };

  return (
    <div className="slider-navigation">
      <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
      <div className="slider-content">
        {items[currentIndex]}
      </div>
      <button onClick={handleNext} disabled={currentIndex === items.length - 1}>Next</button>
    </div>
  );
};

export default SliderNavigation;
