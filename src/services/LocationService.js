export class LocationService {
  constructor() {
    this.currentLocation = null
    this.watchId = null
    this.geocoder = new ReverseGeocoder()
  }

  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'))
        return
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
          }

          try {
            const geocodedLocation = await this.reverseGeocode(location.lat, location.lng)
            this.currentLocation = { ...location, ...geocodedLocation }
            resolve(this.currentLocation)
          } catch (error) {
            // Fallback with coordinates only
            this.currentLocation = { ...location, city: 'Unknown', country: 'Unknown' }
            resolve(this.currentLocation)
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
          reject(new Error(`Location access denied: ${error.message}`))
        },
        options
      )
    })
  }

  async reverseGeocode(lat, lng) {
    try {
      // In a real implementation, this would use Google Maps API or similar
      // For demo purposes, we'll simulate based on coordinates
      return this.simulateReverseGeocode(lat, lng)
    } catch (error) {
      console.error('Reverse geocoding failed:', error)
      return { city: 'Unknown', country: 'Unknown', region: 'Unknown' }
    }
  }

  simulateReverseGeocode(lat, lng) {
    // Simple simulation based on coordinate ranges
    // In production, use proper geocoding service
    
    if (lat >= 12.8 && lat <= 13.2 && lng >= 80.1 && lng <= 80.3) {
      return {
        city: 'Chennai',
        country: 'India',
        region: 'Tamil Nadu',
        timezone: 'Asia/Kolkata'
      }
    } else if (lat >= 19.0 && lat <= 19.3 && lng >= 72.7 && lng <= 73.0) {
      return {
        city: 'Mumbai',
        country: 'India',
        region: 'Maharashtra',
        timezone: 'Asia/Kolkata'
      }
    } else if (lat >= 28.4 && lat <= 28.8 && lng >= 77.0 && lng <= 77.4) {
      return {
        city: 'New Delhi',
        country: 'India',
        region: 'Delhi',
        timezone: 'Asia/Kolkata'
      }
    } else if (lat >= 40.6 && lat <= 40.9 && lng >= -74.1 && lng <= -73.9) {
      return {
        city: 'New York',
        country: 'United States',
        region: 'New York',
        timezone: 'America/New_York'
      }
    } else if (lat >= 51.4 && lat <= 51.6 && lng >= -0.2 && lng <= 0.1) {
      return {
        city: 'London',
        country: 'United Kingdom',
        region: 'England',
        timezone: 'Europe/London'
      }
    } else {
      return {
        city: 'Unknown Location',
        country: 'Unknown',
        region: 'Unknown',
        timezone: 'UTC'
      }
    }
  }

  startLocationTracking() {
    if (!navigator.geolocation) return

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000 // 1 minute
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        }
      },
      (error) => {
        console.error('Location tracking error:', error)
      },
      options
    )
  }

  stopLocationTracking() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId)
      this.watchId = null
    }
  }

  // Get nearby points of interest
  async getNearbyPOIs(category = 'all') {
    if (!this.currentLocation) {
      throw new Error('Location not available')
    }

    // In a real implementation, this would query Google Places API or similar
    return this.simulateNearbyPOIs(category)
  }

  simulateNearbyPOIs(category) {
    const pois = {
      restaurants: [
        { name: 'Local Cuisine Restaurant', distance: '0.2 km', rating: 4.5 },
        { name: 'Street Food Corner', distance: '0.5 km', rating: 4.2 },
        { name: 'Traditional Dining', distance: '0.8 km', rating: 4.7 }
      ],
      attractions: [
        { name: 'Historic Monument', distance: '1.2 km', rating: 4.6 },
        { name: 'Cultural Center', distance: '2.1 km', rating: 4.4 },
        { name: 'Local Market', distance: '0.7 km', rating: 4.3 }
      ],
      hospitals: [
        { name: 'City General Hospital', distance: '1.5 km', phone: '+1234567890' },
        { name: 'Emergency Clinic', distance: '0.9 km', phone: '+1234567891' }
      ]
    }

    return pois[category] || Object.values(pois).flat()
  }

  // Calculate distance between two points
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1)
    const dLng = this.toRadians(lng2 - lng1)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180)
  }
}

class ReverseGeocoder {
  constructor() {
    this.cache = new Map()
  }

  async geocode(lat, lng) {
    const key = `${lat.toFixed(4)},${lng.toFixed(4)}`
    
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    // In production, implement actual reverse geocoding
    const result = { city: 'Unknown', country: 'Unknown' }
    this.cache.set(key, result)
    return result
  }
}