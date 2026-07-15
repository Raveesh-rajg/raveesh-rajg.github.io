import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './styles.css'

// reducedMotion="user": every framer spring/entrance collapses to a simple
// fade when the OS asks for reduced motion — matches the CSS media queries.
ReactDOM.createRoot(document.getElementById('root')).render(
  <MotionConfig reducedMotion="user">
    <App />
  </MotionConfig>,
)
