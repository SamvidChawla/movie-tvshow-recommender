
# 🎬 ReelRadar — Movie & TV Show Recommender

**ReelRadar** is an AI-powered recommendation tool that suggests highly relevant movies and TV shows based on thematic and narrative similarities. Built using HTML, CSS, JavaScript, and Node.js, it integrates the Gemini API for natural language understanding and the TMDb API for fetching movie posters.

---

## Features

- 🔍 Smart AI recommendations based on premise, character archetypes, tone, and tropes  
- 🧠 Gemini API integration for natural language reasoning  
- 🖼️ TMDb API for accurate and high-quality poster images  
- 🌓 Dark mode toggle for better user experience  
- ✅ "Seen it" feature to mark and store viewed titles  
- 📱 Fully responsive design across devices  
- 💾 Local storage support for persisting user state  

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js  
- **AI Engine:** Gemini API (Google Generative AI)  
- **Media Data:** TMDb API  
- **Persistence:** `localStorage`

---

## Installation

1. Clone the repository:
```
   git clone https://github.com/SamvidChawla/movie-tvshow-recommender
   cd ReelRadar-movie-recommender
```
2. Install dependencies:
```
   npm install
```   
3. Create a `.env` file in the root directory with the following:
```
   GEMINI_API_KEY=your_gemini_api_key
   TMDB_API_KEY=your_tmdb_api_key
```   
4. Start the server:
```
   node server.js
```   
5. Open `index.html` in your browser.

---

## Folder Structure

```
/public           # Frontend files (HTML, CSS, JS)
server.js         # Node.js backend
.env              # Environment variables
README.md         # Project documentation
```

---

## License

This project is for personal and educational use only.

### Note on Third-Party Services

This project uses the TMDb API and the Gemini API. All data and content from these services are subject to their respective terms of service.

Users must obtain their own API keys and comply with TMDb and Gemini usage policies when running this software.
