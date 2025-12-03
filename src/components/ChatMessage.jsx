import ChatbotIcon from '../assets/chatbot.svg';
import UserIcon from '../assets/user.svg';
import './ChatMessage.css'

export function ChatMessage({ message, sender }) {

  return (
    <div className= {sender === "user" ? "chat-message-user" : "chat-message-bot"}>
      {sender === "bot" && <img src={ChatbotIcon} className="chat-message-profile" />}
      <div className='chat-message-text'>
        {message}
      </div>
      {sender === "user" && <img src={UserIcon} className="chat-message-profile" />}
    </div>
  )

}