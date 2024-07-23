import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppWithProvider from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithProvider />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
