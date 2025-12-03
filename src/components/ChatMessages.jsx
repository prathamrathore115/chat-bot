import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

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