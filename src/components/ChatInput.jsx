import { useState } from 'react'
import lightMode from '../assets/lightMode.png'
import nightMode from '../assets/nightMode.png'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function getBotReply(text) {
    const API_KEY = "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";

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "My React Chatbot"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-v3.2",
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
