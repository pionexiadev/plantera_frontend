
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider'
import './index.css'
import './styles/animations.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="plantera-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
