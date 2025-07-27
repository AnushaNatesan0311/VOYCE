export const initialState = {
  // Voice & Speech
  isListening: false,
  isSpeaking: false,
  permissionsGranted: false,
  
  // Language & Location
  currentLanguage: 'en',
  location: null,
  
  // UI State
  status: 'Initializing...',
  showPermissionRequest: true,
  
  // Conversation
  conversationHistory: [],
  
  // Features
  features: {
    speech: false,
    gps: false,
    offline: false,
    culture: false
  },
  
  // Connection
  connectionStatus: {
    isConnected: false,
    offlineMode: false,
    lastSync: null
  },
  
  // Emergency
  emergencyMode: false,
  emergencyCountdown: null
}

export const voyceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LISTENING':
      return { ...state, isListening: action.payload }
    
    case 'SET_SPEAKING':
      return { ...state, isSpeaking: action.payload }
    
    case 'SET_PERMISSIONS_GRANTED':
      return { 
        ...state, 
        permissionsGranted: action.payload,
        showPermissionRequest: !action.payload
      }
    
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload }
    
    case 'SET_LOCATION':
      return { ...state, location: action.payload }
    
    case 'SET_STATUS':
      return { ...state, status: action.payload }
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversationHistory: [...state.conversationHistory, {
          ...action.payload,
          id: Date.now(),
          timestamp: new Date().toISOString()
        }]
      }
    
    case 'SET_FEATURE_STATUS':
      return {
        ...state,
        features: { ...state.features, ...action.payload }
      }
    
    case 'SET_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload }
    
    case 'SET_EMERGENCY_MODE':
      return { ...state, emergencyMode: action.payload }
    
    case 'SET_EMERGENCY_COUNTDOWN':
      return { ...state, emergencyCountdown: action.payload }
    
    default:
      return state
  }
}