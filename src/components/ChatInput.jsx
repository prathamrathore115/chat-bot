import { useState } from 'react'
import loadingSpinner from '../assets/loading-spinner.gif';
import {Chatbot} from 'supersimpledev';
import './ChatInput.css'


export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  
  async function sendMessage() {
    setInputText('');
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID()
      }
    ];

    // setChatMessages(newChatMessages);
    setChatMessages(
      [...newChatMessages,
      {
        message: <img className='chat-message-loading-spinnner' src={loadingSpinner}/>,
        sender: "bot",
        id: crypto.randomUUID()
      }]
    )

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages(
      [...newChatMessages,
      {
        message: response,
        sender: "bot",
        id: crypto.randomUUID()
      }]
    )

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
