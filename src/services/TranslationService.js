export class TranslationService {
  constructor() {
    this.sarvamApiKey = process.env.VITE_SARVAM_API_KEY || 'demo-key'
    this.sarvamApiUrl = 'https://api.sarvam.ai/translate'
    this.cache = new Map()
    this.offlineTranslations = this.initializeOfflineTranslations()
  }

  initializeOfflineTranslations() {
    return {
      // Common travel phrases in multiple languages
      greetings: {
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
        'goodbye': {
          'ta': 'பிரியாவிடை (Piriyaavidai)',
          'hi': 'अलविदा (Alvida)',
          'es': 'Adiós',
          'fr': 'Au revoir',
          'de': 'Auf Wiedersehen',
          'it': 'Arrivederci',
          'pt': 'Tchau',
          'ja': 'さようなら (Sayounara)',
          'ko': '안녕히 가세요 (Annyeonghi gaseyo)',
          'zh': '再见 (Zàijiàn)',
          'ar': 'وداعا (Wadaan)'
        }
      },
      courtesy: {
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
        'please': {
          'ta': 'தயவுசெய்து (Thayavuseithu)',
          'hi': 'कृपया (Kripaya)',
          'es': 'Por favor',
          'fr': 'S\'il vous plaît',
          'de': 'Bitte',
          'it': 'Per favore',
          'pt': 'Por favor',
          'ja': 'お願いします (Onegaishimasu)',
          'ko': '부탁합니다 (Butakhamnida)',
          'zh': '请 (Qǐng)',
          'ar': 'من فضلك (Min fadlik)'
        },
        'excuse me': {
          'ta': 'மன்னிக்கவும் (Mannikkavum)',
          'hi': 'माफ़ करें (Maaf karen)',
          'es': 'Disculpe',
          'fr': 'Excusez-moi',
          'de': 'Entschuldigung',
          'it': 'Mi scusi',
          'pt': 'Com licença',
          'ja': 'すみません (Sumimasen)',
          'ko': '실례합니다 (Sillyehamnida)',
          'zh': '不好意思 (Bù hǎoyìsi)',
          'ar': 'عذرا (Uzran)'
        }
      },
      questions: {
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
        },
        'do you speak english': {
          'ta': 'உங்களுக்கு ஆங்கிலம் தெரியுமா (Ungalukku aangilam theriyuma)',
          'hi': 'क्या आप अंग्रेजी बोलते हैं (Kya aap angrezi bolte hain)',
          'es': '¿Habla inglés?',
          'fr': 'Parlez-vous anglais?',
          'de': 'Sprechen Sie Englisch?',
          'it': 'Parla inglese?',
          'pt': 'Você fala inglês?',
          'ja': '英語を話しますか (Eigo wo hanashimasu ka)',
          'ko': '영어 하세요 (Yeongeo haseyo)',
          'zh': '你会说英语吗 (Nǐ huì shuō yīngyǔ ma)',
          'ar': 'هل تتكلم الإنجليزية (Hal tatakallam al-injliiziyya)'
        }
      },
      emergency: {
        'help': {
          'ta': 'உதவி (Udhavi)',
          'hi': 'मदद (Madad)',
          'es': 'Ayuda',
          'fr': 'Aide',
          'de': 'Hilfe',
          'it': 'Aiuto',
          'pt': 'Ajuda',
          'ja': '助けて (Tasukete)',
          'ko': '도움 (Doum)',
          'zh': '帮助 (Bāngzhù)',
          'ar': 'مساعدة (Musaada)'
        },
        'call police': {
          'ta': 'காவல்துறையை அழைக்கவும் (Kaavalthuraiyai azhaikavum)',
          'hi': 'पुलिस को बुलाएं (Police ko bulayen)',
          'es': 'Llame a la policía',
          'fr': 'Appelez la police',
          'de': 'Rufen Sie die Polizei',
          'it': 'Chiama la polizia',
          'pt': 'Chame a polícia',
          'ja': '警察を呼んで (Keisatsu wo yonde)',
          'ko': '경찰을 불러주세요 (Gyeongchareul bulleojuseyo)',
          'zh': '叫警察 (Jiào jǐngchá)',
          'ar': 'اتصل بالشرطة (Ittasil bil-shurta)'
        },
        'i need a doctor': {
          'ta': 'எனக்கு மருத்துவர் வேண்டும் (Enakku maruthuvar vendum)',
          'hi': 'मुझे डॉक्टर चाहिए (Mujhe doctor chahiye)',
          'es': 'Necesito un médico',
          'fr': 'J\'ai besoin d\'un médecin',
          'de': 'Ich brauche einen Arzt',
          'it': 'Ho bisogno di un medico',
          'pt': 'Preciso de um médico',
          'ja': '医者が必要です (Isha ga hitsuyou desu)',
          'ko': '의사가 필요해요 (Uisaga piryohaeyo)',
          'zh': '我需要医生 (Wǒ xūyào yīshēng)',
          'ar': 'أحتاج طبيب (Ahtaj tabiib)'
        }
      }
    }
  }

  async translateText(text, fromLang, toLang, context = {}) {
    const cacheKey = `${text}-${fromLang}-${toLang}`
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      // Try online translation first
      if (navigator.onLine && this.sarvamApiKey !== 'demo-key') {
        const result = await this.translateWithSarvam(text, fromLang, toLang, context)
        this.cache.set(cacheKey, result)
        return result
      } else {
        // Fallback to offline translation
        return this.translateOffline(text, fromLang, toLang, context)
      }
    } catch (error) {
      console.error('Translation failed:', error)
      // Fallback to offline translation
      return this.translateOffline(text, fromLang, toLang, context)
    }
  }

  async translateWithSarvam(text, fromLang, toLang, context) {
    const requestBody = {
      input: text,
      source_language_code: fromLang,
      target_language_code: toLang,
      speaker_gender: context.speakerGender || 'Male',
      mode: context.mode || 'formal',
      model: 'mayura:v1',
      enable_preprocessing: true
    }

    const response = await fetch(this.sarvamApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Subscription-Key': this.sarvamApiKey
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`Sarvam API error: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      translatedText: data.translated_text,
      confidence: data.confidence || 0.9,
      culturalNotes: this.getCulturalNotes(text, fromLang, toLang),
      pronunciation: data.pronunciation || null,
      formalityLevel: context.mode || 'formal',
      source: 'sarvam'
    }
  }

  translateOffline(text, fromLang, toLang, context) {
    const lowerText = text.toLowerCase().trim()
    
    // Search through offline translations
    for (const [category, phrases] of Object.entries(this.offlineTranslations)) {
      for (const [phrase, translations] of Object.entries(phrases)) {
        if (lowerText.includes(phrase) || phrase.includes(lowerText)) {
          const translation = translations[toLang]
          if (translation) {
            return {
              translatedText: translation,
              confidence: 0.8,
              culturalNotes: this.getCulturalNotes(phrase, fromLang, toLang),
              pronunciation: this.getPronunciation(translation, toLang),
              formalityLevel: context.mode || 'formal',
              source: 'offline',
              category: category
            }
          }
        }
      }
    }

    // If no exact match found, return a helpful message
    return {
      translatedText: `[Translation not available offline for "${text}"]`,
      confidence: 0.1,
      culturalNotes: `For accurate translation of "${text}", please connect to the internet.`,
      pronunciation: null,
      formalityLevel: 'neutral',
      source: 'offline',
      category: 'unknown'
    }
  }

  getCulturalNotes(text, fromLang, toLang) {
    const culturalNotes = {
      'hello': {
        'ta': 'In Tamil culture, "Vanakkam" is said with palms pressed together. It shows respect.',
        'hi': 'Namaste is accompanied by a slight bow with palms together. Very respectful greeting.',
        'ja': 'Bow slightly when saying Konnichiwa. The depth of bow shows respect level.',
        'ar': 'Marhaba is casual. For formal situations, use "Ahlan wa sahlan".'
      },
      'thank you': {
        'ta': 'Nandri is formal. For casual thanks, you can say "Thanks" in English.',
        'hi': 'Dhanyawad is very formal. "Shukriya" is more casual.',
        'ja': 'Arigatou is casual. "Arigatou gozaimasu" is more polite.',
        'de': 'Danke is casual. "Vielen Dank" is more formal.'
      }
    }

    const lowerText = text.toLowerCase()
    for (const [phrase, notes] of Object.entries(culturalNotes)) {
      if (lowerText.includes(phrase)) {
        return notes[toLang] || 'Remember to be respectful of local customs when using this phrase.'
      }
    }

    return 'Consider the cultural context when using this translation.'
  }

  getPronunciation(text, language) {
    // Simple pronunciation guide for common phrases
    const pronunciationGuides = {
      'ta': {
        'வணக்கம்': 'VA-nak-kam',
        'நன்றி': 'NAN-dri',
        'எங்கே': 'EN-gay'
      },
      'hi': {
        'नमस्ते': 'na-mas-TAY',
        'धन्यवाद': 'dhan-ya-VAAD',
        'कहाँ': 'ka-HAAN'
      },
      'ja': {
        'こんにちは': 'kon-ni-chi-WA',
        'ありがとう': 'a-ri-ga-TOU',
        'どこ': 'DO-ko'
      }
    }

    const guide = pronunciationGuides[language]
    if (guide) {
      for (const [original, pronunciation] of Object.entries(guide)) {
        if (text.includes(original)) {
          return pronunciation
        }
      }
    }

    return null
  }

  // Voice-to-voice translation
  async translateVoice(audioBlob, fromLang, toLang, context = {}) {
    try {
      // 1. Convert speech to text
      const speechToText = await this.speechToText(audioBlob, fromLang)
      
      // 2. Translate text
      const translation = await this.translateText(speechToText.text, fromLang, toLang, context)
      
      // 3. Convert translated text to speech
      const textToSpeech = await this.textToSpeech(translation.translatedText, toLang)
      
      return {
        originalText: speechToText.text,
        translatedText: translation.translatedText,
        audioUrl: textToSpeech.audioUrl,
        confidence: Math.min(speechToText.confidence, translation.confidence),
        culturalNotes: translation.culturalNotes,
        pronunciation: translation.pronunciation
      }
    } catch (error) {
      console.error('Voice translation failed:', error)
      throw error
    }
  }

  async speechToText(audioBlob, language) {
    // In a real implementation, this would use Whisper API or similar
    // For demo, return mock result
    return {
      text: "Hello, how are you?",
      confidence: 0.9
    }
  }

  async textToSpeech(text, language) {
    // In a real implementation, this would use Sarvam TTS or similar
    // For demo, return mock result
    return {
      audioUrl: null,
      duration: text.length * 100 // Estimate duration
    }
  }

  // Get supported languages
  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'de', name: 'German', nativeName: 'Deutsch' },
      { code: 'it', name: 'Italian', nativeName: 'Italiano' },
      { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
      { code: 'ja', name: 'Japanese', nativeName: '日本語' },
      { code: 'ko', name: 'Korean', nativeName: '한국어' },
      { code: 'zh', name: 'Chinese', nativeName: '中文' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
    ]
  }

  // Clear translation cache
  clearCache() {
    this.cache.clear()
  }

  // Get cache statistics
  getCacheStats() {
    return {
      size: this.cache.size,
      languages: [...new Set([...this.cache.keys()].map(key => key.split('-')[1]))],
      mostTranslated: this.getMostTranslatedPhrases()
    }
  }

  getMostTranslatedPhrases() {
    const phrases = [...this.cache.keys()].map(key => key.split('-')[0])
    const frequency = {}
    phrases.forEach(phrase => {
      frequency[phrase] = (frequency[phrase] || 0) + 1
    })
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([phrase]) => phrase)
  }
}