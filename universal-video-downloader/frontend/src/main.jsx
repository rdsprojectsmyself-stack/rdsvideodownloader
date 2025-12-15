import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../assets/css/styles.css'
// Note: We might need to ensure tailwind directives are in styles.css or create a new index.css
// But for now sticking to the existing structure, adding directives in next write if needed.

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
