import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, UserContextProvider } from "./context"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </UserContextProvider>
  </React.StrictMode>
);

reportWebVitals();
