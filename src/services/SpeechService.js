export class SpeechService {
  constructor() {
    this.speechRecognition = null
    this.speechSynthesis = window.speechSynthesis
    this.mediaRecorder = null
    this.audioChunks = []
    this.isInitialized = false
  }

  async initialize() {
    try {
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        this.speechRecognition = new SpeechRecognition()
        this.speechRecognition.continuous = false
        this.speechRecognition.interimResults = false
        this.speechRecognition.maxAlternatives = 1
      }

      // Initialize voices for TTS
      if (this.speechSynthesis) {
        await this.loadVoices()
      }

      this.isInitialized = true
      console.log('Speech service initialized successfully')
    } catch (error) {
      console.error('Speech service initialization failed:', error)
      throw error
    }
  }

  async loadVoices() {
    return new Promise((resolve) => {
      if (this.speechSynthesis.getVoices().length > 0) {
        resolve()
      } else {
        this.speechSynthesis.onvoiceschanged = () => {
          resolve()
        }
      }
    })
  }

  async requestMicrophonePermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      return true
    } catch (error) {
      console.error('Microphone permission denied:', error)
      throw new Error('Microphone access denied')
    }
  }

  async startListening(language = 'en') {
    return new Promise((resolve, reject) => {
      if (!this.speechRecognition) {
        // Fallback to media recorder
        this.startAudioRecording().then(resolve).catch(reject)
        return
      }

      this.speechRecognition.lang = this.getLanguageCode(language)
      
      this.speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        const confidence = event.results[0][0].confidence
        resolve({ transcript, confidence })
      }

      this.speechRecognition.onerror = (event) => {
        reject(new Error(event.error))
      }

      this.speechRecognition.onend = () => {
        // Recognition ended
      }

      try {
        this.speechRecognition.start()
      } catch (error) {
        reject(error)
      }
    })
  }

  stopListening() {
    if (this.speechRecognition) {
      this.speechRecognition.stop()
    }
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop()
    }
  }

  async startAudioRecording() {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.mediaRecorder = new MediaRecorder(stream)
        this.audioChunks = []

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data)
        }

        this.mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' })
          // In a real implementation, this would send to speech-to-text service
          const mockTranscript = this.generateMockTranscript()
          resolve({ transcript: mockTranscript, confidence: 0.8 })
        }

        this.mediaRecorder.start()

        // Auto-stop after 10 seconds
        setTimeout(() => {
          if (this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop()
          }
        }, 10000)

      } catch (error) {
        reject(error)
      }
    })
  }

  generateMockTranscript() {
    const mockTranscripts = [
      "How do I say hello in Tamil?",
      "Where is the nearest restaurant?",
      "What are the local customs here?",
      "I need help with directions",
      "Can you translate this for me?",
      "What's the emergency number here?",
      "How much does this cost?",
      "Where is the bathroom?",
      "Can you help me order food?",
      "What time does the museum close?"
    ]
    return mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)]
  }

  async speak(text, language = 'en') {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesis) {
        resolve()
        return
      }

      // Cancel any ongoing speech
      this.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = this.getLanguageCode(language)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 1.0

      // Try to find a voice for the language
      const voices = this.speechSynthesis.getVoices()
      const voice = voices.find(v => v.lang.startsWith(language)) || voices[0]
      if (voice) {
        utterance.voice = voice
      }

      utterance.onend = () => {
        resolve()
      }

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        resolve() // Don't reject, just continue
      }

      try {
        this.speechSynthesis.speak(utterance)
      } catch (error) {
        console.error('Speech synthesis failed:', error)
        resolve()
      }
    })
  }

  getLanguageCode(langCode) {
    const languageCodes = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'it': 'it-IT',
      'pt': 'pt-PT',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'zh': 'zh-CN',
      'ar': 'ar-SA'
    }
    return languageCodes[langCode] || 'en-US'
  }

  // Advanced voice analysis for mood detection
  analyzeVoiceTone(audioData) {
    // In a real implementation, this would use audio analysis libraries
    // to detect pitch, tone, speed, and emotional indicators
    return {
      pitch: 'normal',
      tone: 'neutral',
      speed: 'normal',
      emotion: 'neutral',
      confidence: 0.7
    }
  }

  // Hotword detection for always-on listening
  async initializeHotwordDetection() {
    // In a real implementation, this would use libraries like Porcupine
    // for wake word detection ("Hey VOYCE", "VOYCE help", etc.)
    console.log('Hotword detection would be initialized here')
  }
}