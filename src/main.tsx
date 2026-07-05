// ============================================
// Entry Point — React mount + Router + Styles
// ============================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Stylesheets (order matters: variables → animations → global)
import './styles/variables.css'
import './styles/animations.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
