import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Avvolgiamo il componente App nel BrowserRouter per abilitare il routing */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);