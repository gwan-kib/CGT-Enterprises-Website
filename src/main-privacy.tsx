import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('React root element was not found.')
}

createRoot(rootElement).render(
  <StrictMode>
    <PrivacyPolicyPage />
  </StrictMode>,
)
