import { motion } from 'framer-motion'
import { Wifi, WifiOff, Cloud } from 'lucide-react'
import { useVoyce } from '../context/VoyceContext'

const ConnectionStatus = () => {
  const { connectionStatus } = useVoyce()

  const getStatusIcon = () => {
    if (connectionStatus.isConnected) {
      return <Wifi className="w-4 h-4" />
    } else if (connectionStatus.offlineMode) {
      return <WifiOff className="w-4 h-4" />
    } else {
      return <Cloud className="w-4 h-4" />
    }
  }

  const getStatusText = () => {
    if (connectionStatus.isConnected) {
      return '🟢 Connected'
    } else if (connectionStatus.offlineMode) {
      return '🟡 Offline Mode'
    } else {
      return '🔴 Connecting...'
    }
  }

  const getStatusClass = () => {
    if (connectionStatus.isConnected) {
      return 'bg-green-500/20 text-green-400 border-green-400/30'
    } else if (connectionStatus.offlineMode) {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
    } else {
      return 'bg-red-500/20 text-red-400 border-red-400/30'
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-bold flex items-center space-x-2 glass-effect border ${getStatusClass()}`}
    >
      {getStatusIcon()}
      <span>{getStatusText()}</span>
    </motion.div>
  )
}

export default ConnectionStatus