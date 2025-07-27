import { motion } from 'framer-motion'
import { Mic, MapPin, Wifi, Globe } from 'lucide-react'
import { useVoyce } from '../context/VoyceContext'

const FeatureStatus = () => {
  const { features } = useVoyce()

  const featureItems = [
    {
      key: 'speech',
      icon: Mic,
      label: 'Speech Recognition',
      active: features.speech
    },
    {
      key: 'gps',
      icon: MapPin,
      label: 'GPS Location',
      active: features.gps
    },
    {
      key: 'offline',
      icon: Wifi,
      label: 'Offline Ready',
      active: features.offline
    },
    {
      key: 'culture',
      icon: Globe,
      label: 'Culture Engine',
      active: features.culture
    }
  ]

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 text-center opacity-90">
        System Status
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {featureItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-effect rounded-xl p-3 text-center transition-all duration-300 ${
              item.active 
                ? 'bg-green-500/20 border-green-400/30' 
                : 'bg-gray-500/20 border-gray-400/30'
            }`}
          >
            <item.icon className={`w-6 h-6 mx-auto mb-2 ${
              item.active ? 'text-green-400' : 'text-gray-400'
            }`} />
            <p className="text-xs font-medium">{item.label}</p>
            <div className={`w-2 h-2 rounded-full mx-auto mt-2 ${
              item.active ? 'bg-green-400' : 'bg-gray-400'
            }`} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FeatureStatus