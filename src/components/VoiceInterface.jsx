import { motion } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'
import { useVoyce } from '../context/VoyceContext'

const VoiceInterface = () => {
  const { 
    isListening, 
    isSpeaking, 
    permissionsGranted, 
    status,
    startListening,
    stopListening 
  } = useVoyce()

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const getButtonClass = () => {
    if (isListening) return 'voice-button listening'
    if (isSpeaking) return 'voice-button speaking'
    return 'voice-button idle'
  }

  const getStatusClass = () => {
    if (isListening) return 'text-green-400'
    if (isSpeaking) return 'text-red-400'
    if (status.includes('error') || status.includes('Error')) return 'text-red-400'
    return 'text-white'
  }

  return (
    <div className="text-center mb-6">
      <motion.button
        whileHover={{ scale: permissionsGranted ? 1.05 : 1 }}
        whileTap={{ scale: permissionsGranted ? 0.95 : 1 }}
        onClick={handleVoiceToggle}
        disabled={!permissionsGranted || isSpeaking}
        className={`${getButtonClass()} ${!permissionsGranted ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <motion.div
          animate={isListening ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.5, repeat: isListening ? Infinity : 0 }}
        >
          {isListening ? (
            <Mic className="w-12 h-12 text-white" />
          ) : (
            <Mic className="w-12 h-12 text-white" />
          )}
        </motion.div>
      </motion.button>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`mt-4 text-lg font-medium min-h-[2rem] ${getStatusClass()}`}
      >
        {status}
      </motion.div>

      {permissionsGranted && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm opacity-70 mt-2"
        >
          {isListening ? 'Listening...' : 'Tap to speak or press Ctrl+Space'}
        </motion.p>
      )}
    </div>
  )
}

export default VoiceInterface