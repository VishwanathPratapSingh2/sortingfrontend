import React, { useState } from 'react';
import axios from 'axios';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');

  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setSortedArray([]);
  };

  const handleSort = async () => {
    try {
      const response = await axios.post(  
         `${import.meta.env.VITE_BACKEND_URL}/api/sort`, 
        {
        array,
        algorithm
      }); 
      console.log(response.data.sortedArray) ; 
      setSortedArray(response.data.sortedArray);
    } catch (error) {
      console.error('Sorting failed:', error);
    }
  };

  const renderBars = (arr) => (
    <div className="bars-container">
      {arr.map((value, index) => (
        <div
          key={index}
          className="bar"
          style={{ height: `${value * 3}px` }}
        >
          <span className="bar-label">{value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="visualizer-container">
      <div className="controls">
        <button onClick={generateArray}>Generate Array</button>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="bubble">Bubble Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="heap">Heap Sort</option>
        </select>
        <button onClick={handleSort}>Sort</button>
      </div>

      <div className="array-display">
        <h3>Original Array</h3>
        {renderBars(array)}
      </div>

      {sortedArray.length > 0 && (
        <div className="array-display">
          <h3>Sorted Array</h3>
          {renderBars(sortedArray)}
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;  