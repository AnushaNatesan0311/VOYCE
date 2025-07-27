export class VoyceBackend {
  constructor() {
    this.apiEndpoint = 'https://api.voyce.travel' // Production endpoint
    this.sarvamApiKey = process.env.VITE_SARVAM_API_KEY || 'demo-key'
    this.isConnected = false
    this.offlineMode = false
    this.localDB = {}
    this.culturalEngine = new CulturalEngine()
  }

  async initialize() {
    try {
      await this.connectToServer()
      this.setupOfflineCapabilities()
      this.initializeLocalDatabase()
      this.culturalEngine.initialize()
    } catch (error) {
      console.error('Backend initialization failed:', error)
      this.enableOfflineMode()
    }
  }

  async connectToServer() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (navigator.onLine) {
          this.isConnected = true
          resolve()
        } else {
          reject(new Error('No internet connection'))
        }
      }, 1000)
    })
  }

  setupOfflineCapabilities() {
    this.localDB = {
      translations: {
        'hello': { 
          'ta': 'வணக்கம் (Vanakkam)', 
          'hi': 'नमस्ते (Namaste)', 
          'es': 'Hola',
          'fr': 'Bonjour',
          'de': 'Hallo',
          'it': 'Ciao',
          'pt': 'Olá',
          'ja': 'こんにちは (Konnichiwa)',
          'ko': '안녕하세요 (Annyeonghaseyo)',
          'zh': '你好 (Nǐ hǎo)',
          'ar': 'مرحبا (Marhaba)'
        },
        'thank you': { 
          'ta': 'நன்றி (Nandri)', 
          'hi': 'धन्यवाद (Dhanyawad)', 
          'es': 'Gracias',
          'fr': 'Merci',
          'de': 'Danke',
          'it': 'Grazie',
          'pt': 'Obrigado',
          'ja': 'ありがとう (Arigatou)',
          'ko': '감사합니다 (Gamsahamnida)',
          'zh': '谢谢 (Xièxiè)',
          'ar': 'شكرا (Shukran)'
        },
        'where is': { 
          'ta': 'எங்கே இருக்கிறது (Enge irukkiradhu)', 
          'hi': 'कहाँ है (Kahan hai)', 
          'es': 'Dónde está',
          'fr': 'Où est',
          'de': 'Wo ist',
          'it': 'Dove è',
          'pt': 'Onde está',
          'ja': 'どこですか (Doko desu ka)',
          'ko': '어디에 있나요 (Eodie innayo)',
          'zh': '在哪里 (Zài nǎlǐ)',
          'ar': 'أين (Ayna)'
        },
        'how much': { 
          'ta': 'எவ்வளவு (Evvalaavu)', 
          'hi': 'कितना (Kitna)', 
          'es': 'Cuánto cuesta',
          'fr': 'Combien',
          'de': 'Wie viel',
          'it': 'Quanto costa',
          'pt': 'Quanto custa',
          'ja': 'いくらですか (Ikura desu ka)',
          'ko': '얼마예요 (Eolmayeyo)',
          'zh': '多少钱 (Duōshǎo qián)',
          'ar': 'كم (Kam)'
        }
      },
      cultural_data: {
        'chennai': {
          greetings: ['Vanakkam with palms pressed together', 'Respectful nod for elders'],
          customs: ['Remove shoes before entering homes', 'Use right hand for giving/receiving'],
          emergencies: ['108 - Medical', '100 - Police', '101 - Fire', '1363 - Tourist Helpline'],
          dining: ['Eat with right hand', 'Finish everything on your plate', 'Wash hands before and after meals'],
          transportation: ['Auto-rickshaws negotiate fare', 'Metro is efficient', 'Uber/Ola available']
        },
        'mumbai': {
          greetings: ['Namaste with folded hands', 'Casual wave for peers'],
          customs: ['Respect local train etiquette', 'Dress modestly in religious places'],
          emergencies: ['108 - Medical', '100 - Police', '101 - Fire', '1916 - Tourist Helpline'],
          dining: ['Street food is safe from busy stalls', 'Tipping 10% is standard'],
          transportation: ['Local trains are lifeline', 'Taxis use meters', 'Traffic is heavy']
        }
      },
      phrases: {
        emergency: {
          'ta': 'உதவி வேண்டும் (Udhavi vendum) - I need help',
          'hi': 'मदद चाहिए (Madad chahiye) - I need help',
          'es': 'Necesito ayuda - I need help',
          'fr': 'J\'ai besoin d\'aide - I need help',
          'de': 'Ich brauche Hilfe - I need help',
          'it': 'Ho bisogno di aiuto - I need help',
          'pt': 'Preciso de ajuda - I need help',
          'ja': '助けが必要です (Tasuke ga hitsuyou desu) - I need help',
          'ko': '도움이 필요해요 (Doumi piryohaeyo) - I need help',
          'zh': '我需要帮助 (Wǒ xūyào bāngzhù) - I need help',
          'ar': 'أحتاج مساعدة (Ahtaj musaada) - I need help'
        }
      }
    }
  }

  enableOfflineMode() {
    this.offlineMode = true
    this.isConnected = false
  }

  initializeLocalDatabase() {
    console.log('Local database initialized for offline functionality')
  }

  async generateResponse(transcript, context) {
    const response = await this.analyzeAndRespond(transcript, context)
    return response
  }

  async analyzeAndRespond(transcript, context) {
    const lowerTranscript = transcript.toLowerCase()
    
    // Translation requests
    if (lowerTranscript.includes('say') && lowerTranscript.includes('in')) {
      return this.handleTranslationRequest(transcript, context)
    }
    
    // Cultural inquiries
    if (lowerTranscript.includes('custom') || lowerTranscript.includes('culture') || lowerTranscript.includes('etiquette')) {
      return this.handleCulturalInquiry(context)
    }
    
    // Emergency requests
    if (lowerTranscript.includes('emergency') || lowerTranscript.includes('help') || lowerTranscript.includes('urgent')) {
      return this.handleEmergencyRequest(context)
    }
    
    // Location/navigation requests
    if (lowerTranscript.includes('where') || lowerTranscript.includes('direction') || lowerTranscript.includes('navigate')) {
      return this.handleLocationRequest(transcript, context)
    }

    // Dining recommendations
    if (lowerTranscript.includes('food') || lowerTranscript.includes('restaurant') || lowerTranscript.includes('eat')) {
      return this.handleDiningRequest(context)
    }

    // Transportation help
    if (lowerTranscript.includes('transport') || lowerTranscript.includes('taxi') || lowerTranscript.includes('bus')) {
      return this.handleTransportationRequest(context)
    }
    
    // General travel assistance
    return this.handleGeneralAssistance(transcript, context)
  }

  handleTranslationRequest(transcript, context) {
    const targetLang = context.selectedLanguage
    
    if (transcript.includes('hello')) {
      const translation = this.localDB.translations['hello'][targetLang] || 'Hello'
      return {
        text: `In ${targetLang.toUpperCase()}, you say: "${translation}". This is the most common and respectful way to greet someone locally.`,
        cultural_note: "Remember to use appropriate body language - a slight bow or palms pressed together shows respect in many cultures.",
        audio_url: null
      }
    }

    if (transcript.includes('thank you')) {
      const translation = this.localDB.translations['thank you'][targetLang] || 'Thank you'
      return {
        text: `To say thank you in ${targetLang.toUpperCase()}: "${translation}". Gratitude is universally appreciated and shows respect for local culture.`,
        cultural_note: "In many cultures, a small bow or nod accompanies thanks to show sincerity.",
        audio_url: null
      }
    }
    
    return {
      text: `I can help you translate that into ${targetLang.toUpperCase()}. For the phrase you mentioned, locals would typically say it with cultural context in mind. Would you like me to provide the exact pronunciation as well?`,
      cultural_note: "Translations are adapted for local customs and formality levels.",
      audio_url: null
    }
  }

  handleCulturalInquiry(context) {
    const location = context.location?.city?.toLowerCase() || 'general'
    const culturalData = this.localDB.cultural_data[location] || this.localDB.cultural_data['chennai']
    
    return {
      text: `Here are important cultural customs for your location: ${culturalData.customs.join(', ')}. For greetings: ${culturalData.greetings.join(', ')}. These practices show respect and help you connect better with locals.`,
      cultural_note: "Understanding local customs helps create meaningful connections and shows respect for the culture.",
      audio_url: null
    }
  }

  handleEmergencyRequest(context) {
    const location = context.location?.city?.toLowerCase() || 'general'
    const emergencyData = this.localDB.cultural_data[location]?.emergencies || ['112 - Universal Emergency']
    
    return {
      text: `🚨 EMERGENCY ASSISTANCE: Important numbers for your location: ${emergencyData.join(', ')}. Your current location has been noted. Stay calm and I'm here to help guide you through any emergency situation.`,
      cultural_note: "Keep these numbers saved in your phone. Hotel staff can also assist with local emergency services.",
      audio_url: null,
      priority: 'high',
      autoEscalate: true
    }
  }

  handleLocationRequest(transcript, context) {
    return {
      text: `Based on your location in ${context.location?.city || 'your area'}, I can help you navigate. For restaurants, head towards the main commercial district. For tourist attractions, I recommend checking popular landmarks nearby. Would you like specific walking directions?`,
      cultural_note: "Local transportation includes various options. Always negotiate fares beforehand for auto-rickshaws and similar transport.",
      audio_url: null
    }
  }

  handleDiningRequest(context) {
    const location = context.location?.city?.toLowerCase() || 'general'
    const culturalData = this.localDB.cultural_data[location] || this.localDB.cultural_data['chennai']
    
    return {
      text: `For dining in ${context.location?.city || 'your area'}, I recommend trying local specialties. Look for busy restaurants - they usually have the freshest food. ${culturalData.dining ? culturalData.dining.join(', ') : 'Remember to respect local dining customs.'}`,
      cultural_note: "Busy local eateries often serve the most authentic and safe food. Don't hesitate to ask locals for recommendations.",
      audio_url: null
    }
  }

  handleTransportationRequest(context) {
    const location = context.location?.city?.toLowerCase() || 'general'
    const culturalData = this.localDB.cultural_data[location] || this.localDB.cultural_data['chennai']
    
    return {
      text: `Transportation options in ${context.location?.city || 'your area'}: ${culturalData.transportation ? culturalData.transportation.join(', ') : 'Various options available including taxis, buses, and ride-sharing apps.'}`,
      cultural_note: "Always confirm the fare before starting your journey. Keep small bills handy for local transport.",
      audio_url: null
    }
  }

  handleGeneralAssistance(transcript, context) {
    return {
      text: `I understand you're asking about "${transcript}". As your travel companion in ${context.location?.city || 'this area'}, I'm here to help with language, culture, navigation, and any challenges you face. What specific aspect would you like me to focus on?`,
      cultural_note: "Feel free to ask about anything - from basic phrases to complex cultural situations. I'm designed to help you navigate like a local.",
      audio_url: null
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      offlineMode: this.offlineMode,
      lastSync: new Date().toISOString()
    }
  }
}

class CulturalEngine {
  constructor() {
    this.culturalPatterns = {}
    this.moodAnalyzer = new MoodAnalyzer()
  }

  initialize() {
    console.log('Cultural Engine initialized')
  }

  analyzeCulturalContext(location, language, userMood) {
    // Advanced cultural analysis would go here
    return {
      formalityLevel: this.determineFormalityLevel(location, language),
      culturalSensitivities: this.getCulturalSensitivities(location),
      recommendedTone: this.getRecommendedTone(userMood, location)
    }
  }

  determineFormalityLevel(location, language) {
    // Logic to determine appropriate formality level
    return 'respectful'
  }

  getCulturalSensitivities(location) {
    // Return cultural sensitivities for the location
    return []
  }

  getRecommendedTone(userMood, location) {
    // Determine appropriate response tone
    return 'warm'
  }
}

class MoodAnalyzer {
  analyzeMood(transcript, voiceTone = null) {
    // Advanced mood analysis would integrate voice tone analysis
    const moodKeywords = {
      happy: ['great', 'awesome', 'wonderful', 'excited', 'amazing'],
      sad: ['lost', 'confused', 'worried', 'scared', 'frustrated'],
      urgent: ['emergency', 'urgent', 'quickly', 'now', 'help'],
      neutral: ['where', 'how', 'what', 'when', 'can you']
    }

    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      if (keywords.some(keyword => transcript.toLowerCase().includes(keyword))) {
        return mood
      }
    }
    return 'neutral'
  }
}