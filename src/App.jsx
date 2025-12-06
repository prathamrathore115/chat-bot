import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import './App.css'


function App() {
  const [chatMessages,setChatMessages] = useState(() =>{
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() =>{
    localStorage.setItem('chatHistory', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <>
    <div className='app-container'>
      <ChatMessages
        chatMessages={chatMessages}
        />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        />
    </div>
      </>
  );
}

export default App


