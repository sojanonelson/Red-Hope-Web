import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';

import AppNavigator from './AppNavigator';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppNavigator />
  </React.StrictMode>
);

