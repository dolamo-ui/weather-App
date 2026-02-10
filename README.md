# ⛅ Aether Weather - AI-Powered Weather Forecast

<div align="center">
  <img src="screenshots/dashboard.png" alt="Aether Weather Dashboard" width="800"/>
  
  ### Experience Weather Like Never Before
  
  A sleek, modern weather application powered by AI insights and real-time data.
  
  [![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.29.2-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
  [![Google AI](https://img.shields.io/badge/Google_AI-1.38.0-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
  
  [Live Demo](https://dancing-bunny-d28333.netlify.app/) • [Report Bug](https://github.com/yourusername/aether-weather/issues) • [Request Feature](https://github.com/yourusername/aether-weather/issues)
  
</div>

---

## ✨ Features

### 🤖 AI-Powered Insights
- **Smart Weather Analysis** - Get AI-generated insights about current weather conditions
- **Activity Recommendations** - Personalized suggestions based on weather data
- **Natural Language Descriptions** - Easy-to-understand weather summaries

### 🌍 Location Management
- **Saved Locations** - Save up to 10 favorite locations for quick access
- **Geolocation Support** - Automatically detect and use your current location
- **Search Functionality** - Find weather for any city worldwide
- **Location Cards** - Visual preview of weather in saved locations

### 📊 Comprehensive Weather Data
- **Current Conditions** - Temperature, feels-like, weather description
- **Hourly Forecast** - 24-hour detailed forecast with icons
- **7-Day Forecast** - Week-ahead planning with highs and lows
- **Weather Metrics** - Humidity, wind speed, pressure, visibility
- **Sun Times** - Sunrise and sunset information

### ⚙️ Customizable Settings
- **Temperature Units** - Toggle between Celsius and Fahrenheit
- **Wind Speed Units** - Choose km/h or mph
- **Theme Mode** - Beautiful dark and light themes
- **Weather Notifications** - Optional weather alerts
- **Persistent Preferences** - Settings saved across sessions

### 🎨 Modern UI/UX
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Design** - Optimized for all screen sizes
- **Glassmorphism Effects** - Modern, translucent UI elements
- **Weather Icons** - Dynamic icons that match conditions
- **Clean Typography** - Easy-to-read interface

---

## 📸 Screenshots

<div align="center">
  
  ### Main Dashboard
 <img width="1909" height="1487" alt="screencapture-dancing-bunny-d28333-netlify-app-2026-02-10-14_38_58" src="https://github.com/user-attachments/assets/f8e91b6f-96a7-4edd-a30f-ff0b38ac63ec" />

  
  *Beautiful weather overview with hourly and daily forecasts*
  
  ### Settings Panel
  <img width="1909" height="1487" alt="screencapture-dancing-bunny-d28333-netlify-app-2026-02-10-14_38_58" src="https://github.com/user-attachments/assets/4fda4735-459f-4aac-9853-63b3ef1d3ef5" />

  
  *Customize your weather experience*
  
</div>

---

## 🚀 Getting Started


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dolamo-ui/weather-App.git
   cd aether-weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```



3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the app in action!

---

## 🛠️ Built With

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.3 | UI framework |
| **TypeScript** | 5.8.2 | Type safety |
| **Vite** | 6.2.0 | Build tool and dev server |
| **Framer Motion** | 12.29.2 | Animations |
| **Lucide React** | 0.563.0 | Icon library |
| **Google AI** | 1.38.0 | AI-powered insights |



## 🎯 Key Features Explained

### AI Weather Insights

Aether uses Google's Gemini AI to provide intelligent weather analysis:
- Contextual activity suggestions
- Natural language weather summaries
- Personalized recommendations based on conditions

Example insight:
> "Pleasant weather in Soshanguve! Perfect for outdoor activities."

### Saved Locations

Manage multiple locations efficiently:
- Save up to 10 favorite cities
- Quick-switch between locations
- Visual weather preview for each location
- Delete unwanted locations with one click

### Weather Metrics Dashboard

Track all important metrics:
- 🌡️ **Temperature** - Current and feels-like
- 💧 **Humidity** - Percentage of moisture
- 🌬️ **Wind Speed** - Current wind conditions
- 🎚️ **Pressure** - Atmospheric pressure in hPa
- 👁️ **Visibility** - How far you can see
- 🌅 **Sun Times** - Sunrise and sunset

### Forecast System

**Hourly Forecast**
- Next 24 hours in 3-hour intervals
- Temperature trends
- Weather condition icons
- Scrollable timeline view

**7-Day Forecast**
- Extended outlook
- High and low temperatures
- Daily weather conditions
- Day-of-week labels

---



### Customization

#### Adding New Weather Icons

Edit `constants.tsx`:
```typescript
export const WeatherIcons: Record<string, JSX.Element> = {
  Clear: <Sun className="w-16 h-16" />,
  Clouds: <Cloud className="w-16 h-16" />,
  // Add more conditions...
};
```

## 🎨 UI Components

### Weather Card
Displays current weather with:
- Large temperature display
- Weather condition icon
- Description text
- AI-generated insights

### Metric Tiles
Four key metrics displayed as cards:
- Humidity with droplet icon
- Wind speed with wind icon
- Pressure with gauge icon
- Visibility with eye icon

### Forecast Sections
- **Hourly**: Horizontal scrollable timeline
- **Daily**: Grid of 7-day forecast cards

### Settings Modal
- Toggle switches for preferences
- Unit selectors
- Theme switcher
- Save preferences button

---

## 📱 Responsive Design

Aether Weather is fully responsive across devices:

- **Desktop** (1920px+) - Full sidebar with all features
- **Laptop** (1024px - 1919px) - Optimized layout
- **Tablet** (768px - 1023px) - Adapted navigation
- **Mobile** (320px - 767px) - Touch-optimized interface

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |

---

## 🌐 Deployment

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify



## 🤝 Contributing

Contributions make the open-source community amazing! Here's how you can contribute:

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📋 Roadmap

- [ ] Weather maps integration
- [ ] Historical weather data
- [ ] Weather alerts and notifications
- [ ] Multiple language support
- [ ] Weather widgets
- [ ] Social sharing features
- [ ] Offline mode with caching
- [ ] Weather comparisons
- [ ] Custom themes

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Your Name**

- Website: [yourwebsite.com](https://yourwebsite.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) - Weather data provider
- [Google AI](https://ai.google.dev/) - Gemini AI for insights
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS (via inline styles)

---

## 📞 Support

If you like this project, please give it a ⭐ on GitHub!

For support, email your.email@example.com or open an issue.

---

<div align="center">
  
  ### ⭐ Star this repo if you find it useful!
  
  Made with ❤️ and ☕
  
  **Aether Weather** - Because weather should be beautiful
  
</div>

