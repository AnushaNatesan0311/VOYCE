# VOYCE - Advanced Voice-First Travel Assistant

VOYCE is a comprehensive voice-first multilingual travel assistant designed for global travelers. It provides real-time translation, cultural intelligence, emergency assistance, and location-aware guidance through natural voice interactions.

## 🌟 Key Features

### Voice-First Interface
- **Always-On Listening**: Hotword detection for hands-free activation
- **Natural Conversations**: Continuous dialogue without button presses
- **Noise-Resistant**: Robust voice recognition for noisy environments
- **Multi-Modal Input**: Voice, touch, and gesture support

### Multilingual Translation
- **Real-Time Voice Translation**: Instant voice-to-voice translation
- **Cultural Context**: Contextually appropriate translations, not literal
- **Tone Adaptation**: Formal/informal tone matching local etiquette
- **Offline Capability**: Essential phrases available without internet

### Location & Context Awareness
- **GPS Integration**: Real-time location-based responses
- **Environmental Sensing**: Adapts to surroundings and context
- **Smart Tours**: Interactive voice-guided walking tours
- **Proximity Alerts**: Landmark detection and smart routing

### Cultural Intelligence
- **Mood Detection**: Voice tone analysis for emotional context
- **Cultural Adaptation**: Responses tailored to local customs
- **Etiquette Guidance**: Real-time cultural tips and advice
- **Local Storytelling**: Culturally relevant narratives and history

### Emergency Protocols
- **Distress Detection**: Automatic recognition of emergency situations
- **Escalation System**: Graduated response with manual override
- **Offline Emergency**: Critical functions work without connectivity
- **Location Sharing**: Automatic emergency services notification

## 🛠 Technical Architecture

### Frontend Stack
- **React 18** with modern hooks and context
- **Framer Motion** for smooth animations
- **Tailwind CSS** for responsive design
- **Lucide React** for consistent iconography

### Core Services
- **VoyceBackend**: Main AI processing and response generation
- **SpeechService**: Voice recognition and text-to-speech
- **LocationService**: GPS and geolocation management
- **EmergencyService**: Emergency detection and response
- **TranslationService**: Multilingual translation with Sarvam API

### Voice Processing
- **Web Speech API**: Browser-native speech recognition
- **Speech Synthesis**: Multi-language text-to-speech
- **Audio Recording**: Fallback for unsupported browsers
- **Voice Analysis**: Tone and mood detection

### Data Management
- **Context State**: React Context for global state
- **Local Storage**: Offline data caching
- **IndexedDB**: Large data storage (planned)
- **Service Worker**: Offline functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Modern browser with Web Speech API support
- Microphone access permission
- Location access permission (optional but recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/voyce-travel-assistant.git
cd voyce-travel-assistant

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SARVAM_API_KEY=your_sarvam_api_key_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
VITE_EMERGENCY_API_ENDPOINT=your_emergency_service_endpoint
```

### Browser Compatibility

- **Chrome/Edge**: Full support including speech recognition
- **Firefox**: Limited speech synthesis support
- **Safari**: Basic functionality with fallbacks
- **Mobile**: Progressive Web App capabilities

## 📱 Usage Guide

### First Time Setup
1. Grant microphone and location permissions
2. Select your preferred language
3. Test voice recognition with "Hello VOYCE"
4. Configure emergency contacts (optional)

### Voice Commands
- **"Hey VOYCE"** - Activate listening
- **"Translate [phrase] to [language]"** - Translation requests
- **"Where is [location]?"** - Navigation help
- **"What are the customs here?"** - Cultural guidance
- **"Emergency help"** - Activate emergency mode
- **"I'm safe"** - Cancel emergency escalation

### Cultural Features
- **Local Greetings**: Learn appropriate greetings for your location
- **Dining Etiquette**: Restaurant and food customs
- **Transportation**: Local transport options and etiquette
- **Shopping**: Bargaining customs and payment methods
- **Religious Sites**: Appropriate behavior and dress codes

### Emergency Features
- **Panic Button**: Instant emergency activation
- **Auto-Escalation**: 30-second countdown with manual override
- **Location Tracking**: Continuous GPS sharing with emergency services
- **Offline Mode**: Critical emergency numbers always available
- **Medical Info**: Store and share medical information with responders

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── VoiceInterface.jsx
│   ├── ConversationLog.jsx
│   ├── FeatureStatus.jsx
│   └── ...
├── context/            # React Context providers
│   ├── VoyceContext.jsx
│   └── voyceReducer.js
├── services/           # Core business logic
│   ├── VoyceBackend.js
│   ├── SpeechService.js
│   ├── LocationService.js
│   ├── EmergencyService.js
│   └── TranslationService.js
└── App.jsx            # Main application component
```

### Key Components

#### VoyceContext
Central state management for the entire application:
- Voice recognition state
- Conversation history
- User preferences
- Location data
- Emergency status

#### SpeechService
Handles all voice-related functionality:
- Speech-to-text conversion
- Text-to-speech synthesis
- Voice tone analysis
- Hotword detection

#### LocationService
Manages location and navigation:
- GPS tracking
- Reverse geocoding
- Points of interest
- Cultural location data

#### EmergencyService
Emergency response system:
- Distress detection
- Escalation protocols
- Emergency contacts
- Location sharing

### Adding New Languages

1. Update `TranslationService.js` with new language data
2. Add language code to `SpeechService.js`
3. Update language selector in `LanguageSelector.jsx`
4. Test voice recognition and synthesis

### Cultural Data Extension

Add new cultural information in `VoyceBackend.js`:

```javascript
cultural_data: {
  'new_city': {
    greetings: ['Local greeting customs'],
    customs: ['Important cultural practices'],
    emergencies: ['Local emergency numbers'],
    dining: ['Food and restaurant etiquette'],
    transportation: ['Local transport options']
  }
}
```

## 🌐 API Integration

### Sarvam AI Translation
- Real-time multilingual translation
- Cultural context awareness
- Tone and formality adaptation
- Voice-to-voice translation

### Google Maps (Planned)
- Detailed location services
- Points of interest
- Navigation and routing
- Local business information

### Emergency Services (Planned)
- Direct emergency service integration
- Medical information sharing
- Real-time location updates
- Emergency contact notification

## 🔒 Privacy & Security

### Data Protection
- **Local Processing**: Voice data processed locally when possible
- **Minimal Storage**: Only essential data cached locally
- **Encryption**: All API communications encrypted
- **User Control**: Full control over data sharing and storage

### Permissions
- **Microphone**: Required for voice features
- **Location**: Optional but enhances cultural context
- **Camera**: Only for emergency photo capture
- **Notifications**: For emergency alerts

### Emergency Privacy
- **Automatic Sharing**: Location shared only during emergencies
- **Medical Data**: Encrypted and shared only with emergency services
- **Contact Privacy**: Emergency contacts notified only during actual emergencies

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
- Configure production API endpoints
- Set up CDN for static assets
- Enable HTTPS for security
- Configure service worker for offline functionality

### Performance Optimization
- Code splitting for faster loading
- Service worker caching
- Lazy loading of non-critical components
- Audio compression for voice features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- ESLint configuration for code quality
- Prettier for code formatting
- Component documentation required
- Test coverage for critical paths

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Sarvam AI** for multilingual translation services
- **Web Speech API** for browser-native voice recognition
- **OpenStreetMap** for location data
- **React Community** for excellent tooling and libraries

## 📞 Support

For support, email support@voyce.travel or join our community Discord.

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Basic voice interface
- ✅ Offline translation
- ✅ Emergency protocols
- ✅ Cultural intelligence

### Phase 2 (Next)
- 🔄 Sarvam AI integration
- 🔄 Advanced voice analysis
- 🔄 Smart tour guides
- 🔄 Personalization engine

### Phase 3 (Future)
- 📋 AR integration
- 📋 IoT device support
- 📋 Advanced AI conversations
- 📋 Community features

---

**VOYCE** - Your intelligent travel companion for a connected world. 🌍✈️🗣️