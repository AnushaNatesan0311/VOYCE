import { motion } from 'framer-motion'
import { AlertTriangle, Phone } from 'lucide-react'
import { useVoyce } from '../context/VoyceContext'

const EmergencyButton = () => {
  const { handleEmergency, emergencyMode } = useVoyce()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-6"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEmergency}
        className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
          emergencyMode 
            ? 'bg-red-600 animate-pulse' 
            : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        <AlertTriangle className="w-5 h-5" />
        <span>🚨 Emergency Help</span>
        <Phone className="w-5 h-5" />
      </motion.button>
      
      <p className="text-xs text-center opacity-70 mt-2">
        Instant access to local emergency services
      </p>
    </motion.div>
  )
}

export default EmergencyButton