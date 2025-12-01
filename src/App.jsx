import { useState } from 'react'
import './App.css'
import ChatbotIcon from './assets/chatbot.svg?react';
import UserIcon from './assets/user.svg?react';

export function ChatInput() {
  return (
    <>
      <input placeholder='Send a message to Chatbot' size="30" />
      <button>Send</button>
    </>
  );
}

export function ChatMessage({ message, sender }) {
  return (
    <div>
      {sender === "bot" && <ChatbotIcon width={24} height={24} />}
      {message}
      {sender === "user" && <UserIcon width={24} height={24} />}
    </div>
  )

}

function App() {
  return (
    <>
      <ChatInput />
      <ChatMessage
        message="hello chat bot"
        sender="user"
      />
      <ChatMessage
        message="hello how can i help you?"
        sender="bot"
      />
      <ChatMessage
        message="what is date today"
        sender="user"
      />
      <ChatMessage
        message="its 12/1/2025"
        sender="bot"
      />
    </>
  );
}

export default App
