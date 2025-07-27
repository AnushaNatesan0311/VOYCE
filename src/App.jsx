import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import VoiceInterface from './components/VoiceInterface'
import ConversationLog from './components/ConversationLog'
import FeatureStatus from './components/FeatureStatus'
import LocationInfo from './components/LocationInfo'
import LanguageSelector from './components/LanguageSelector'
import ConnectionStatus from './components/ConnectionStatus'
import EmergencyButton from './components/EmergencyButton'
import PermissionRequest from './components/PermissionRequest'
import { VoyceProvider } from './context/VoyceContext'

function App() {
  return (
    <VoyceProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Connection Status */}
        <ConnectionStatus />
        
        {/* Main Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"
              >
                VOYCE
              </motion.h1>
              <motion.p 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg opacity-90 text-shadow"
              >
                Speak Local, Live Global
              </motion.p>
            </div>

            {/* Permission Request */}
            <PermissionRequest />

            {/* Voice Interface */}
            <VoiceInterface />

            {/* Location Info */}
            <LocationInfo />

            {/* Language Selector */}
            <LanguageSelector />

            {/* Emergency Button */}
            <EmergencyButton />

            {/* Feature Status */}
            <FeatureStatus />

            {/* Conversation Log */}
            <ConversationLog />
          </motion.div>
        </div>
      </div>
    </VoyceProvider>
  )
  )
}

export default App