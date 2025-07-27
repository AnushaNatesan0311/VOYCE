import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useVoyce } from '../context/VoyceContext'

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, getLanguageName } = useVoyce()

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-4"
    >
      <div className="flex items-center justify-center space-x-2 mb-3">
        <Languages className="w-5 h-5 text-blue-400" />
        <span className="text-sm font-medium">Language</span>
      </div>
      
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="glass-effect rounded-xl px-4 py-2 w-full text-center bg-transparent border border-white/30 focus:border-blue-400 focus:outline-none transition-colors"
      >
        {languages.map((lang) => (
          <option 
            key={lang.code} 
            value={lang.code}
            className="bg-gray-800 text-white"
          >
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      
      <p className="text-xs text-center opacity-70 mt-2">
        Current: {languages.find(l => l.code === currentLanguage)?.flag} {getLanguageName(currentLanguage)}
      </p>
    </motion.div>
  )
}

export default LanguageSelector