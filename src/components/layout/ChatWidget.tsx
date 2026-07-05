// ============================================
// ChatWidget Component — Floating support chat
// ============================================

import { useState, useRef, useEffect } from 'react'
import { FaCommentDots, FaTimes, FaMinus, FaPaperPlane } from 'react-icons/fa'

const quickReplies = [
  'I want to donate',
  'Tell me about your projects',
  'I have a question',
]

const autoReply = 'Thanks for reaching out! Our team has received your message and will respond via email within 24 hours. In the meantime, feel free to explore our projects or make a donation. 💙'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNotification, setHasNotification] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi! 👋 Welcome to AquaHope. How can we help you today?',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setHasNotification(false)
  }

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    // React escapes text content on render, so no manual HTML-entity escaping —
    // doing both showed users literal "&amp;" instead of "&".
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response after 1.5s
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: autoReply },
      ])
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  return (
    <div className="chat-widget">
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar">💧</div>
            <div>
              <div className="chat-header-name">AquaHope Support</div>
              <div className="chat-header-status">Online now</div>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              className="chat-header-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
            >
              <FaMinus />
            </button>
            <button
              className="chat-header-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message chat-message-${msg.sender}`}
            >
              {msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="chat-typing">
              <span className="chat-typing-dot"></span>
              <span className="chat-typing-dot"></span>
              <span className="chat-typing-dot"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 1 && (
          <div className="chat-quick-replies">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                className="chat-quick-reply"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className="chat-send-btn"
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        className={`chat-toggle ${hasNotification ? 'notif' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat support' : 'Open chat support'}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </button>
    </div>
  )
}
