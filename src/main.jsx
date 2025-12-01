import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ChatInput} from './App.jsx'

const chatinpt = (
  <>
  <ChatInput />
  </>
);
createRoot(document.getElementById('container')).render(
  <StrictMode>
    {chatinpt}
  </StrictMode>,
)
