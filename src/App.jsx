import { useState } from 'react'
import './App.css'
import ChatbotIcon from './assets/chatbot.svg?react';
import UserIcon from './assets/user.svg?react';

export function ChatInput() {
  return (
    <>
      <input className='inputMsg' placeholder='Send a message to Chatbot' size="30" />
      <button className='sendBtn'>Send</button>
    </>
  );
}

export function ChatMessages() {
  const chatMessage = [
    {
      message: "hello chat bot",
      sender: "user",
      id: 1
    },
    {
      message: "hello how can i help you?",
      sender: "bot",
      id: 2
    },
    {
      message: "what is date today",
      sender: "user",
      id: 3
    },
    {
      message: "its 12/1/2025",
      sender: "bot",
      id: 4
    },
  ];

  function handleSendMessage() {
    

        chatMessage.push({
          message: "userMessage",
          sender: "user",
          id: chatMessage.length + 1
        });

        
        console.log(chatMessage);
  
  }

  return (
    <>
      <button onClick={handleSendMessage}>send mesaage</button>
      {chatMessage.map((chat) => (
        <ChatMessage
          message={chat.message}
          sender={chat.sender}
          key={chat.id}
        />
      ))}
    </>
  )


}

function ChatMessage({ message, sender }) {
  return (
    <div>
      {sender === "bot" && <ChatbotIcon width={44} height={44} />}
      {message}
      {sender === "user" && <UserIcon width={44} height={44} />}
    </div>
  )

}

function App() {
  return (
    <>
      <ChatInput />
      <ChatMessages />
    </>
  );
}

export default App
