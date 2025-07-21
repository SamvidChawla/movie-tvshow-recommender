import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

// ✅ /popular route
app.get("/popular", async (req, res) => {
  try {
    const [moviesRes, tvRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
      fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    ]);

    if (!moviesRes.ok || !tvRes.ok) {
      throw new Error("TMDb fetch failed");
    }

    const moviesData = await moviesRes.json();
    const tvData = await tvRes.json();

    const formatItem = (item, type) => ({
      id: item.id,
      title: item.title || item.name,
      type,
      date: item.release_date || item.first_air_date || "",
      overview: item.overview,
      image: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : null,
    });

    const combined = [
      ...moviesData.results.slice(0, 6).map(m => formatItem(m, "Movie")),
      ...tvData.results.slice(0, 6).map(t => formatItem(t, "TV Show"))
    ];

    res.json({ results: combined });
  } catch (err) {
    console.error("❌ Error fetching popular content:", err.message);
    res.status(500).json({ error: "Failed to fetch popular content" });
  }
});

// ✅ /ai route
app.post("/ai", async (req, res) => {
  const userInput = req.body.prompt;

  if (!userInput) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const config = {
      responseMimeType: "text/plain",
      tools: [],
      systemInstruction: [
        {
          text: `
You are a movie recommendation engine.
Your recommendations must be based on a deep analysis of similarity between movies and shows. When providing a reason, you should synthesize concepts like shared premises, character archetypes, genre, narrative tropes, and overall tone.

✅ Return 5 **movies or shows** in this format:
1. **Title** — Short reason

Do NOT include image URLs or markdown links.
Do NOT generate image links.
Verify streaming service from mutliple latest realiable sources 
If possible avoid information older than 3 months
**Important**: JioHotstar shows only on JioHotstar—not grouped with Disney+ and not grouped with any other Jio Services

End with a follow-up question like:(but not exactly)
"Would you like recommendations based on a specific actor or genre?"
          `,
        },
      ],
    };

    const contents = [{ role: "user", parts: [{ text: userInput }] }];

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-pro",
      config,
      contents,
    });

    let fullText = "";
    for await (const chunk of stream) {
      if (chunk.text) fullText += chunk.text;
    }
    console.log(fullText);
    const lines = fullText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const parsedMovies = [];

    for (const line of lines) {
      const match = line.match(/^\d+\.\s*\*\*(.+?)\*\*\s*[-—–]\s*(.+)/);
      if (match) {
        parsedMovies.push({
          title: match[1],
          description: match[2],
          image: null,
        });
      }
    }

    const followUp = lines.findLast(line => line.endsWith("?")) || "Want more recommendations?";

/*    async function getPosterImage(title, retries = 4) {
      const encoded = encodeURIComponent(title);
      const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encoded}`;
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("TMDb API error");
          const data = await res.json();
          const show = data.results[0];
          return show?.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : null;
        } catch (e) {
          if (i === retries - 1) return null;
          await new Promise(r => setTimeout(r, 300));
        }
      }
    }*/

    res.json({ movies: parsedMovies, followUp });
  } catch (err) {
    console.error("❌ Gemini error:", err.message);
    res.status(500).json({ error: "Something went wrong generating recommendations." });
  }
});

// ✅ Secure TMDB poster proxy
app.get("/poster", async (req, res) => {
  const title = req.query.title;
  if (!title) {
    return res.status(400).json({ error: "Missing title" });
  }

  const encoded = encodeURIComponent(title);
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encoded}`;

  // Retry logic (up to 4 attempts)
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const tmdbRes = await fetch(url);
      if (!tmdbRes.ok) throw new Error(`TMDb API error (attempt ${attempt})`);

      const data = await tmdbRes.json();
      const poster = data?.results?.[0]?.poster_path;

      return res.json({
        image: poster
          ? `https://image.tmdb.org/t/p/w500${poster}`
          : null
      });
    } catch (err) {
      console.warn(`Retry ${attempt} for poster "${title}" failed: ${err.message}`);
      if (attempt === 5) {
        console.error("❌ Final failure fetching poster:", err.message);
        return res.status(500).json({ error: "Failed to get poster after retries" });
      }
      await new Promise(r => setTimeout(r, 300)); // wait 300ms before next retry
    }
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
