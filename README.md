# React Chatbot App

A simple chatbot-style web app built with **React** and **Vite**.  
This project is mainly for **learning purposes** – to practice React concepts, state management, component structure, and integrating APIs in a modern frontend setup.

---

## 🎯 Purpose of This Project

This app was created to:

- Learn how to set up a **React + Vite** project
- Practice **functional components** and **props**
- Work with **useState** and **useEffect**
- Build a simple **chat UI**
- Experiment with calling a **chatbot / LLM API**
- Optionally store **chat history in localStorage**

---

## 🛠️ Tech Stack

- **React** (functional components + hooks)
- **Vite** (for fast dev server and bundling)
- **JavaScript (ES6+)**
- **CSS** for styling
- **localStorage** for storing chat history
- (Optional) **OpenRouter / other LLM API** for bot responses

---

## 📁 Project Structure (simplified)

```bash
src/
  main.jsx          # App entry (React + Vite mount)
  App.jsx           # Root component, holds chatMessages state
  components/
    ChatInput.jsx   # Input box + send button
    ChatMessages.jsx # Renders list of chat messages
    ChatMessage.jsx # Single message bubble (user/bot)
  assets/
    chatbot.svg     # Bot icon
    user.svg        # User icon
    loading-spinner.gif
  App.css           # Main styles
