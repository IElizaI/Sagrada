import React from 'react';
import uniqid from 'uniqid';
import CellPatternStainedGlass from '../CellPatternStainedGlass/CellPatternStainedGlass';
import './RowPatternStainedGlass.css';

const RowPatternStainedGlass = ({ patternRow, row, cubes }) => {
  return (
    <div className="container-row-cells">
      {patternRow.map((cell, index) => (
        <CellPatternStainedGlass
          cell={cell}
          orderCell={index}
          row={row}
          key={uniqid()}
          cube={cubes[index]}
        />
      ))}
    </div>
  );
};

export default RowPatternStainedGlass;
