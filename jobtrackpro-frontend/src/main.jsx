import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./api/api.js";  // ✅ runs interceptor setup globally
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)