import React from 'react';
import './App.css';
import SortingVisualizer from './components/SortingVisualizer';

const App = () => {
  return (
    <div className="app-container">
      <h1>Sorting Visualizer</h1>
      <SortingVisualizer />
    </div>
  );
};

export default App;
