import { createContext, useContext, useReducer, useEffect } from 'react'
import { voyceReducer, initialState } from './voyceReducer'
import { VoyceBackend } from '../services/VoyceBackend'
import { SpeechService } from '../services/SpeechService'
import { LocationService } from '../services/LocationService'
import { EmergencyService } from '../services/EmergencyService'

const VoyceContext = createContext()

export const useVoyce = () => {
  const context = useContext(VoyceContext)
  if (!context) {
    throw new Error('useVoyce must be used within a VoyceProvider')
  }
  return context
}

export const VoyceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(voyceReducer, initialState)

  // Initialize services
  const backend = new VoyceBackend()
  const speechService = new SpeechService()
  const locationService = new LocationService()
  const emergencyService = new EmergencyService()

  useEffect(() => {
    // Initialize VOYCE system
    initializeVoyce()
  }, [])

  const initializeVoyce = async () => {
    try {
      dispatch({ type: 'SET_STATUS', payload: 'Initializing VOYCE...' })
      
      // Initialize backend connection
      await backend.initialize()
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: backend.getConnectionStatus() })
      
      // Initialize speech services
      await speechService.initialize()
      dispatch({ type: 'SET_FEATURE_STATUS', payload: { speech: true } })
      
      // Request location
      const location = await locationService.getCurrentLocation()
      dispatch({ type: 'SET_LOCATION', payload: location })
      dispatch({ type: 'SET_FEATURE_STATUS', payload: { gps: true } })
      
      // Set up offline capabilities
      dispatch({ type: 'SET_FEATURE_STATUS', payload: { offline: true } })
      
      // Initialize cultural engine
      dispatch({ type: 'SET_FEATURE_STATUS', payload: { culture: true } })
      
      dispatch({ type: 'SET_STATUS', payload: 'Ready! Tap the microphone to start' })
      dispatch({ type: 'ADD_MESSAGE', payload: { 
        sender: 'system', 
        text: 'Welcome to VOYCE! I\'m your AI travel companion ready to help with translations, cultural guidance, navigation, and emergency assistance.' 
      }})
      
    } catch (error) {
      console.error('VOYCE initialization failed:', error)
      dispatch({ type: 'SET_STATUS', payload: 'Initialization failed - limited functionality available' })
    }
  }

  const requestPermissions = async () => {
    try {
      await speechService.requestMicrophonePermission()
      dispatch({ type: 'SET_PERMISSIONS_GRANTED', payload: true })
      dispatch({ type: 'SET_STATUS', payload: 'Ready! Tap the microphone to start' })
      dispatch({ type: 'ADD_MESSAGE', payload: { 
        sender: 'system', 
        text: 'Permissions granted! VOYCE is ready to assist you.' 
      }})
    } catch (error) {
      dispatch({ type: 'ADD_MESSAGE', payload: { 
        sender: 'system', 
        text: 'Microphone access denied. Please enable it in your browser settings for voice features.' 
      }})
      dispatch({ type: 'SET_STATUS', payload: 'Limited functionality - enable microphone for voice features' })
    }
  }

  const startListening = async () => {
    if (!state.permissionsGranted) {
      await requestPermissions()
      return
    }

    if (state.isSpeaking) return

    try {
      dispatch({ type: 'SET_LISTENING', payload: true })
      dispatch({ type: 'SET_STATUS', payload: 'Listening... Speak now' })
      
      const result = await speechService.startListening(state.currentLanguage)
      if (result.transcript) {
        await handleSpeechResult(result.transcript)
      }
    } catch (error) {
      handleSpeechError(error.message)
    }
  }

  const stopListening = () => {
    speechService.stopListening()
    dispatch({ type: 'SET_LISTENING', payload: false })
    dispatch({ type: 'SET_STATUS', payload: 'Processing...' })
  }

  const handleSpeechResult = async (transcript) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'user', text: transcript } })
    dispatch({ type: 'SET_LISTENING', payload: false })

    const context = {
      location: state.location,
      selectedLanguage: state.currentLanguage,
      conversationHistory: state.conversationHistory,
      mood: detectMood(transcript)
    }

    try {
      const response = await backend.generateResponse(transcript, context)
      dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'assistant', text: response.text } })
      
      if (response.cultural_note) {
        dispatch({ type: 'ADD_MESSAGE', payload: { 
          sender: 'system', 
          text: `💡 Cultural Tip: ${response.cultural_note}` 
        }})
      }

      await speakResponse(response.text)

      if (response.autoEscalate) {
        startEmergencyEscalation()
      }

    } catch (error) {
      dispatch({ type: 'ADD_MESSAGE', payload: { 
        sender: 'system', 
        text: 'Sorry, I encountered an error processing your request. Please try again.' 
      }})
      dispatch({ type: 'SET_STATUS', payload: 'Error occurred - tap to try again' })
    }
  }

  const handleSpeechError = (error) => {
    dispatch({ type: 'SET_LISTENING', payload: false })
    dispatch({ type: 'SET_STATUS', payload: `Speech error: ${error} - Tap to try again` })
    dispatch({ type: 'ADD_MESSAGE', payload: { 
      sender: 'system', 
      text: `Voice recognition error: ${error}. You can try speaking again.` 
    }})
  }

  const speakResponse = async (text) => {
    dispatch({ type: 'SET_SPEAKING', payload: true })
    dispatch({ type: 'SET_STATUS', payload: 'Speaking...' })

    try {
      await speechService.speak(text, state.currentLanguage)
    } catch (error) {
      console.error('TTS Error:', error)
    } finally {
      dispatch({ type: 'SET_SPEAKING', payload: false })
      dispatch({ type: 'SET_STATUS', payload: 'Ready - tap to speak again' })
    }
  }

  const detectMood = (input) => {
    const moodKeywords = {
      happy: ['great', 'awesome', 'wonderful', 'excited', 'amazing'],
      sad: ['lost', 'confused', 'worried', 'scared', 'frustrated'],
      urgent: ['emergency', 'urgent', 'quickly', 'now', 'help'],
      neutral: ['where', 'how', 'what', 'when', 'can you']
    }

    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
        return mood
      }
    }
    return 'neutral'
  }

  const changeLanguage = (language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language })
    dispatch({ type: 'ADD_MESSAGE', payload: { 
      sender: 'system', 
      text: `Language changed to ${getLanguageName(language)}. VOYCE will now respond in ${language} when possible.` 
    }})
  }

  const getLanguageName = (code) => {
    const names = {
      'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
      'it': 'Italian', 'pt': 'Portuguese', 'hi': 'Hindi', 'ta': 'Tamil',
      'ja': 'Japanese', 'ko': 'Korean', 'zh': 'Chinese', 'ar': 'Arabic'
    }
    return names[code] || code
  }

  const handleEmergency = async () => {
    dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'system', text: '🚨 EMERGENCY MODE ACTIVATED' } })

    const context = {
      location: state.location,
      selectedLanguage: state.currentLanguage,
      priority: 'emergency'
    }

    try {
      const emergencyResponse = await backend.generateResponse('emergency help needed', context)
      dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'assistant', text: emergencyResponse.text } })
      await speakResponse(emergencyResponse.text)

      if (emergencyResponse.autoEscalate) {
        startEmergencyEscalation()
      }
    } catch (error) {
      const fallbackResponse = `🚨 EMERGENCY ASSISTANCE: Call local emergency services immediately. Universal emergency number: 112. Your location: ${state.location?.city || 'Location detection in progress'}. Stay calm, help is coming.`
      dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'assistant', text: fallbackResponse } })
      await speakResponse(fallbackResponse)
    }
  }

  const startEmergencyEscalation = () => {
    emergencyService.startEscalation(state.location, (message) => {
      dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'system', text: message } })
    })
  }

  const value = {
    ...state,
    requestPermissions,
    startListening,
    stopListening,
    changeLanguage,
    handleEmergency,
    getLanguageName
  }

  return (
    <VoyceContext.Provider value={value}>
      {children}
    </VoyceContext.Provider>
  )
}