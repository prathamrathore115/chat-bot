import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github.css';
import ChatbotIcon from '../assets/chatbot.svg';
import UserIcon from '../assets/user.svg';
import loadingSpinner from '../assets/loading-spinner.gif';
import './ChatMessage.css'

export function ChatMessage({ message, sender, isLoading }) {

  return (
    <div className={sender === "user" ? "chat-message-user" : "chat-message-bot"}>
      {sender === "bot" && <img src={ChatbotIcon} className="chat-message-profile" />}
      <div className='chat-message-text'>
        {isLoading ? (
          <img
            className='chat-message-loading-spinner'
            src={loadingSpinner}
            alt="Loading..."
          />
        ) : (
          <span>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {message}
            </ReactMarkdown></span>
        )}
      </div>
      {sender === "user" && <img src={UserIcon} className="chat-message-profile" />}
    </div>
  )

}