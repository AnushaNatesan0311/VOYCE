import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { useVoyce } from '../context/VoyceContext'

const LocationInfo = () => {
  const { location } = useVoyce()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-effect rounded-xl p-4 mb-4"
    >
      <div className="flex items-center justify-center space-x-2">
        <MapPin className="w-5 h-5 text-yellow-400" />
        <div className="text-center">
          {location ? (
            <div>
              <p className="font-medium">
                📍 {location.city}, {location.country}
              </p>
              <p className="text-xs opacity-70 mt-1">
                Lat: {location.lat?.toFixed(4)}, Lng: {location.lng?.toFixed(4)}
              </p>
            </div>
          ) : (
            <p className="text-sm opacity-80">
              📍 Requesting location access...
            </p>
          )}
        </div>
      </div>
      
      {location && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 pt-3 border-t border-white/20"
        >
          <div className="flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Navigation className="w-3 h-3" />
              <span>Navigation Ready</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Location</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default LocationInfo