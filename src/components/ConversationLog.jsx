import { motion, AnimatePresence } from 'framer-motion'
import { useVoyce } from '../context/VoyceContext'
import { useEffect, useRef } from 'react'

const ConversationLog = () => {
  const { conversationHistory } = useVoyce()
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversationHistory])

  const getMessageClass = (sender) => {
    switch (sender) {
      case 'user':
        return 'message-bubble user-message'
      case 'assistant':
        return 'message-bubble assistant-message'
      case 'system':
        return 'message-bubble system-message'
      default:
        return 'message-bubble'
    }
  }

  const formatMessage = (message) => {
    const { sender, text } = message
    switch (sender) {
      case 'user':
        return `You: ${text}`
      case 'assistant':
        return `VOYCE: ${text}`
      default:
        return text
    }
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 text-center opacity-90">
        Conversation
      </h3>
      <div 
        ref={scrollRef}
        className="glass-effect rounded-2xl p-4 max-h-80 overflow-y-auto space-y-2"
      >
        <AnimatePresence>
          {conversationHistory.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={getMessageClass(message.sender)}
            >
              <p className="text-sm leading-relaxed">
                {formatMessage(message)}
              </p>
              <span className="text-xs opacity-60 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {conversationHistory.length === 0 && (
          <div className="text-center text-sm opacity-60 py-8">
            Your conversation will appear here...
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversationLog