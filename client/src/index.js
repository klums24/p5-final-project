// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from "react-router-dom"
import App from './components/App'; 
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
// import "./index.css";
import { ClientProvider } from './context/clientContext';

ReactDOM.render(
  <ClientProvider>
    <Router>
      <App />
    </Router>
  </ClientProvider>,
  document.getElementById('root')
);

