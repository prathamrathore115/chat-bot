import { useEffect, useRef, useState } from 'react'
import './App.css'
import ChatbotIcon from './assets/chatbot.svg?react';
import UserIcon from './assets/user.svg?react';
import 'https://unpkg.com/supersimpledev/chatbot.js';


export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages(
      [...newChatMessages,
      {
        message: response,
        sender: "bot",
        id: crypto.randomUUID()
      }]
    )

    setInputText('');
  }

  return (
    <div className='chat-input-container'>
      <input className='chat-input' placeholder='Send a message to Chatbot' size="30"
        onChange={saveInputText}
        value={inputText}
      />
      <button className='chat-send-btn' onClick={sendMessage}>Send</button>
    </div>
  );
}

export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const containerEle = chatMessagesRef.current;

    if(containerEle){
      containerEle.scrollTop = containerEle.scrollHeight;
    }
  },[chatMessages]);
  return (
    <div className='chat-message-container' ref={chatMessagesRef}>
      {chatMessages.map((chat) => (
        <ChatMessage
          message={chat.message}
          sender={chat.sender}
          key={chat.id}
          
        />
      ))}
    </div>
  )


}

function ChatMessage({ message, sender }) {

  return (
    <div className= {sender === "user" ? "chat-message-user" : "chat-message-bot"}>
      {sender === "bot" && <ChatbotIcon className="chat-message-profile" />}
      <div className='chat-message-text'>
        {message}
      </div>
      {sender === "user" && <UserIcon className="chat-message-profile" />}
    </div>
  )

}

function App() {
  const arr = useState([]);

  const chatMessages = arr[0];
  const setChatMessages = arr[1];
  return (
    <div className='app-container'>
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App


