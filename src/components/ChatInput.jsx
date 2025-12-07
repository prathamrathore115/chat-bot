import { useState } from 'react'
import lightMode from '../assets/lightMode.png'
import nightMode from '../assets/nightMode.png'
import './ChatInput.css';


export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function getBotReply(text) {
    const api_key = import.meta.env.VITE_API_KEY;
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${base_url}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${api_key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "amazon/nova-2-lite-v1:free",
        messages: [
          { role: "user", content: text }
        ]
      })
    });

    const data = await res.json();
    return data.choices[0].message.content;
  }

  async function sendMessage() {
    if (!inputText.trim()) return;

    const userMessage = {
      message: inputText,
      sender: "user",
      id: crypto.randomUUID(),
      isLoading: false
    };

    const messagesWithUser = [...chatMessages, userMessage];

    const loadingMessageId = crypto.randomUUID();
    const loadingMessage = {
      id: loadingMessageId,
      message: "",
      sender: "bot",
      isLoading: true
    };

    setChatMessages([...messagesWithUser, loadingMessage]);
    setInputText('');

    try {
      const response = await getBotReply(userMessage.message);

      setChatMessages(prev =>
        prev.map(msg =>
          msg.id === loadingMessageId
            ? { ...msg, message: response, isLoading: false }
            : msg
        )
      );
    } catch (err) {
      console.error(err);
      setChatMessages(prev =>
        prev.map(msg =>
          msg.id === loadingMessageId
            ? {
              ...msg,
              message: "Sorry, I couldn't reach the server.",
              isLoading: false
            }
            : msg
        )
      );
    }

  }

  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;

      document.body.className = newMode ? 'dark-theme' : 'light-theme';
      document.getElementsByClassName('chat-send-btn')[0].style.color = newMode ? 'white' : 'black';
      return newMode;
    })
  }



  return (
    <div className='chat-input-container'>
      <input
        className='chat-input'
        placeholder='Send a message to Chatbot'
        size="30"
        onChange={saveInputText}
        value={inputText}
      />
      <button className='chat-send-btn' onClick={sendMessage}>Send</button>
      <button className='theme-btn' onClick={toggleTheme}>
        {
          isDarkMode ? (<img src={lightMode} className='theme-img' />) : (<img src={nightMode} className='theme-img' />)
        }
      </button>
    </div>
  );
}
