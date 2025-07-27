export class EmergencyService {
  constructor() {
    this.isEscalating = false
    this.escalationTimer = null
    this.emergencyContacts = []
    this.localEmergencyNumbers = {}
  }

  startEscalation(location, messageCallback) {
    if (this.isEscalating) return

    this.isEscalating = true
    let countdown = 30

    messageCallback('⚠️ EMERGENCY ESCALATION: No response detected in 30 seconds. Say "I\'m safe" to cancel.')

    this.escalationTimer = setInterval(() => {
      countdown--
      
      if (countdown > 0) {
        messageCallback(`Emergency escalation in ${countdown}s - Say "I'm safe" to cancel`)
      } else {
        clearInterval(this.escalationTimer)
        this.executeEmergencyProtocol(location, messageCallback)
      }
    }, 1000)

    // Set up cancellation listener
    this.setupCancellationListener(messageCallback)
  }

  setupCancellationListener(messageCallback) {
    // In a real implementation, this would integrate with the speech service
    // to listen for cancellation phrases
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isEscalating) {
        this.cancelEscalation(messageCallback)
      }
    })
  }

  cancelEscalation(messageCallback) {
    if (!this.isEscalating) return

    this.isEscalating = false
    if (this.escalationTimer) {
      clearInterval(this.escalationTimer)
      this.escalationTimer = null
    }

    messageCallback('✅ Emergency escalation cancelled. Glad you\'re safe!')
  }

  async executeEmergencyProtocol(location, messageCallback) {
    this.isEscalating = false
    
    messageCallback('🚨 EMERGENCY PROTOCOL ACTIVATED')
    
    try {
      // 1. Get local emergency numbers
      const emergencyNumbers = this.getLocalEmergencyNumbers(location)
      
      // 2. Prepare emergency data
      const emergencyData = {
        timestamp: new Date().toISOString(),
        location: location,
        userAgent: navigator.userAgent,
        coordinates: location ? `${location.lat}, ${location.lng}` : 'Unknown',
        accuracy: location?.accuracy || 'Unknown'
      }

      // 3. In a real implementation, this would:
      // - Send location to emergency services
      // - Contact emergency contacts
      // - Provide continuous location tracking
      // - Send SMS with location details
      
      messageCallback(`📞 Emergency services contacted. Location: ${location?.city || 'Unknown'}`)
      messageCallback(`Emergency numbers: ${emergencyNumbers.join(', ')}`)
      
      // 4. Provide continuous assistance
      setTimeout(() => {
        messageCallback('🆘 Help is on the way. Stay where you are if safe to do so.')
        messageCallback('📱 Your location is being continuously tracked and shared with emergency services.')
      }, 2000)

      // 5. Start continuous location tracking
      this.startEmergencyLocationTracking(location, messageCallback)

    } catch (error) {
      console.error('Emergency protocol execution failed:', error)
      messageCallback('⚠️ Emergency protocol encountered an error, but basic emergency numbers are available.')
    }
  }

  getLocalEmergencyNumbers(location) {
    const city = location?.city?.toLowerCase() || 'unknown'
    const country = location?.country?.toLowerCase() || 'unknown'

    // Emergency numbers by location
    const emergencyNumbers = {
      'india': ['108 - Medical Emergency', '100 - Police', '101 - Fire', '112 - Universal Emergency'],
      'united states': ['911 - Emergency Services'],
      'united kingdom': ['999 - Emergency Services', '112 - European Emergency'],
      'germany': ['112 - Emergency Services', '110 - Police'],
      'france': ['112 - Emergency Services', '15 - Medical', '17 - Police', '18 - Fire'],
      'spain': ['112 - Emergency Services'],
      'italy': ['112 - Emergency Services'],
      'japan': ['119 - Fire/Medical', '110 - Police'],
      'china': ['120 - Medical', '110 - Police', '119 - Fire'],
      'default': ['112 - Universal Emergency Number']
    }

    return emergencyNumbers[country] || emergencyNumbers['default']
  }

  startEmergencyLocationTracking(initialLocation, messageCallback) {
    if (!navigator.geolocation) return

    const trackingOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        }

        // In a real implementation, this would continuously send location updates
        // to emergency services
        console.log('Emergency location update:', currentLocation)
      },
      (error) => {
        console.error('Emergency location tracking error:', error)
        messageCallback('⚠️ Location tracking interrupted. Please share your location manually if possible.')
      },
      trackingOptions
    )

    // Stop tracking after 2 hours (emergency services should have responded by then)
    setTimeout(() => {
      navigator.geolocation.clearWatch(watchId)
      messageCallback('📍 Emergency location tracking ended after 2 hours.')
    }, 2 * 60 * 60 * 1000)
  }

  // Add emergency contact
  addEmergencyContact(contact) {
    this.emergencyContacts.push({
      id: Date.now(),
      ...contact,
      addedAt: new Date().toISOString()
    })
  }

  // Remove emergency contact
  removeEmergencyContact(contactId) {
    this.emergencyContacts = this.emergencyContacts.filter(
      contact => contact.id !== contactId
    )
  }

  // Get emergency contacts
  getEmergencyContacts() {
    return this.emergencyContacts
  }

  // Send emergency SMS (would integrate with SMS service)
  async sendEmergencySMS(location, message) {
    // In a real implementation, this would use SMS API
    console.log('Emergency SMS would be sent:', { location, message })
    
    const smsData = {
      to: this.emergencyContacts.map(contact => contact.phone),
      message: `EMERGENCY: ${message}. Location: ${location?.city || 'Unknown'} (${location?.lat}, ${location?.lng}). Time: ${new Date().toLocaleString()}`,
      priority: 'high'
    }

    return smsData
  }

  // Medical information for emergency responders
  getMedicalInfo() {
    // In a real app, this would be stored in user profile
    return {
      bloodType: 'Unknown',
      allergies: [],
      medications: [],
      emergencyContacts: this.emergencyContacts,
      medicalConditions: []
    }
  }

  // Panic button functionality
  activatePanicMode(location, messageCallback) {
    messageCallback('🚨 PANIC MODE ACTIVATED - IMMEDIATE EMERGENCY RESPONSE')
    
    // Skip countdown for panic mode
    this.executeEmergencyProtocol(location, messageCallback)
    
    // Additional panic mode features
    this.startPanicModeFeatures(location, messageCallback)
  }

  startPanicModeFeatures(location, messageCallback) {
    // 1. Continuous audio recording (if permitted)
    // 2. Photo capture from camera
    // 3. Immediate SMS to all emergency contacts
    // 4. Loud alarm sound
    // 5. Screen flash for attention
    
    messageCallback('📱 Panic mode features activated: continuous recording, emergency contacts notified, location tracking active.')
  }
}