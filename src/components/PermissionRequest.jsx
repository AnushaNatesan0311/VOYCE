import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MapPin, Shield } from 'lucide-react'
import { useVoyce } from '../context/VoyceContext'

const PermissionRequest = () => {
  const { showPermissionRequest, requestPermissions } = useVoyce()

  return (
    <AnimatePresence>
      {showPermissionRequest && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-effect rounded-2xl p-6 mb-6 border border-white/30"
        >
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h3 className="text-lg font-semibold mb-3">
              Welcome to VOYCE
            </h3>
            <p className="text-sm opacity-90 mb-4">
              VOYCE needs access to your microphone and location for the best experience.
            </p>
            
            <div className="space-y-2 mb-6 text-xs">
              <div className="flex items-center justify-center space-x-2 opacity-80">
                <Mic className="w-4 h-4" />
                <span>Microphone for voice interactions</span>
              </div>
              <div className="flex items-center justify-center space-x-2 opacity-80">
                <MapPin className="w-4 h-4" />
                <span>Location for cultural context</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={requestPermissions}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Grant Permissions
            </motion.button>
            
            <p className="text-xs opacity-60 mt-3">
              Your privacy is protected. Data stays on your device.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PermissionRequest