// main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './Root'; // 👈 Not App directly

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
