import React, { useState } from 'react';
import './StainedGlassflip.css';

const StainedGlassflip = ({ stainedGlass, onSelect }) => {
  const [side, setSide] = useState(true);

  const handleTakeStainedGlass = async () => {
    let objStainedGlass = side ? stainedGlass.pattern1 : stainedGlass.pattern2;
    onSelect(`${stainedGlass.id}${objStainedGlass.id}`);
  };

  return (
    <div className="wrap">
      <div className={`card ${side ? '' : 'flipped'}`}>
        <div onClick={() => setSide(!side)} className={'front'}>
          <img
            src={stainedGlass.pattern1.src}
            alt={stainedGlass.pattern1.title}
          />
        </div>
        <div onClick={() => setSide(!side)} className={'back'}>
          <img
            src={stainedGlass.pattern2.src}
            alt={stainedGlass.pattern2.title}
          />
        </div>
      </div>
      <button onClick={handleTakeStainedGlass}>Выбрать</button>
    </div>
  );
};

export default StainedGlassflip;
