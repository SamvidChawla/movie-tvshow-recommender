 // Image source with fallbacks
const getMovieImage = () => {
  return null;
};

    const form = document.getElementById('promptForm'),
          input = document.getElementById('promptInput'),
          output = document.getElementById('output'),
          darkBtn = document.getElementById('darkBtn'),
          surpriseBtn = document.getElementById('surpriseBtn');

// Set initial mode from localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  darkBtn.textContent = '☀️ Light Mode';
}

// Toggle dark mode
darkBtn.onclick = () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  darkBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};
    
    // Enhanced surprise me functionality
    surpriseBtn.onclick = () => {
      const surprisePrompts = [
        'Surprise me with something mind-bending and cerebral',
        'Show me hidden gems I\'ve never heard of',
        'Give me something weird and wonderful',
        'Recommend your most underrated picks',
        'Show me something that will make me emotional',
        'Give me the most addictive binge-worthy series',
        'Show me something visually stunning',
        'Recommend something that will keep me up all night thinking'
      ];
      const randomPrompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
      input.value = randomPrompt;
      form.requestSubmit();
    };

    const useMock = false; // ✅ Toggle this to false to use the real API

    // Enhanced mock data for better variety
    const mockMoviesDatabase = [
      {
        title: 'Life in Pieces',
        description: 'A comedy about one big family and their sometimes awkward, often hilarious, and ultimately beautiful milestone moments.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Schitt\'s Creek',
        description: 'A wealthy family suddenly finds themselves broke and forced to live in a small town they once bought as a joke.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Parks and Recreation',
        description: 'A mockumentary comedy series about local government in the fictional town of Pawnee, Indiana.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Modern Family',
        description: 'A mockumentary family sitcom that follows the lives of Jay Pritchett and his family.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'The Office',
        description: 'A mockumentary sitcom about the everyday lives of office employees at a paper company.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Friends',
        description: 'Follows the lives of six friends living in Manhattan as they navigate their careers and relationships.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Brooklyn Nine-Nine',
        description: 'A workplace comedy about a team of detectives and their leader in a Brooklyn police precinct.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'How I Met Your Mother',
        description: 'A father recounts to his children the events that led to his meeting their mother.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'The Good Place',
        description: 'A woman struggles to be a good person when she accidentally ends up in the afterlife.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Arrested Development',
        description: 'A wealthy family loses everything and must live in their only remaining asset - a model home.',
        get image() { return getMovieImage(); }
      }
    ];

    const mockPopularContent = [
      {
        title: 'Avatar: The Way of Water',
        description: 'Jake Sully and his family continue their adventure in Pandora.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Wednesday',
        description: 'Wednesday Addams navigates life at Nevermore Academy.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Top Gun: Maverick',
        description: 'Pete "Maverick" Mitchell returns to train a new generation.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'The Batman',
        description: 'Dark detective story featuring a young Batman.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Stranger Things',
        description: 'A group of kids face supernatural threats in 1980s Hawkins.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'The Bear',
        description: 'A chef returns to Chicago to run his deceased brother\'s restaurant.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Euphoria',
        description: 'Teenagers navigate in modern America.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Breaking Bad',
        description: 'A chemistry teacher turns meth kingpin in this intense crime drama.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'The Mandalorian',
        description: 'A lone bounty hunter in the outer reaches of the galaxy beyond the New Republic.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Dune',
        description: 'Epic space opera about power, politics, and prophecy on a desert planet.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Inception',
        description: 'A mind-bending thriller about dream invasion and reality manipulation.',
        get image() { return getMovieImage(); }
      },
      {
        title: 'Parasite',
        description: 'Korean thriller about class conflict and social inequality.',
        get image() { return getMovieImage(); }
      }
    ];

    function getRandomMockMovies(count = 5) {
      const shuffled = [...mockMoviesDatabase].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    function getMockFollowUp() {
      const followUps = [
        'Try another vibe like "space opera" or "slow-burn thriller"!',
        'Want something more specific? Try "Korean thriller" or "animated series".',
        'Looking for more? Search for "feel-good comedy" or "mind-bending sci-fi".',
        'Need different vibes? Try "historical drama" or "supernatural mystery".',
        'Want to explore more? Search "indie films" or "binge-worthy series".'
      ];
      return followUps[Math.floor(Math.random() * followUps.length)];
    }

    form.onsubmit = async e => {
      e.preventDefault();
      showPlaceholders();

      if (useMock) {
        //MOCK DATA
        const movies = getRandomMockMovies();
        const followUp = getMockFollowUp();
        
        // Realistic delay to simulate API call
        setTimeout(() => {
          render(movies, followUp);
        }, 1000);
      } else {
        // ✅ Only runs when useMock = false
        try {
          const seen = getSeenTitles();
          const filters = getFilterValues();
          let fullPrompt = `${input.value}. I've already seen: ${seen.join(', ')}. Please avoid these.`;

          if (filters.stream && filters.stream !== 'Any') fullPrompt += ` Strictly show content available on ${filters.stream}.`;
          if (filters.genre && filters.genre !== 'Any') fullPrompt += ` I strictly want ${filters.genre} genres.`;
          if (filters.type && filters.type !== 'Any') fullPrompt += ` I'm strictly in the mood for a ${filters.type}.`;

          const res = await fetch('http://localhost:3000/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: fullPrompt })
          });
          
          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
          }
          
          const { movies = [], followUp } = await res.json();
          render(movies, followUp);
        } catch (error) {
          console.error('API Error:', error);
          output.innerHTML = `
            <div class="follow-up-card">
              <p>⚠️ Server unavailable. Showing mock recommendations instead.</p>
            </div>
          `;
          // Fallback to mock data
          setTimeout(() => {
            const movies = getRandomMockMovies();
            const followUp = getMockFollowUp();
            render(movies, followUp);
          }, 1000);
        }
      }
    };

    function showPlaceholders() {
      output.innerHTML = `
        <h2 class="section-title">🎯 Finding Perfect Recommendations...</h2>
        <div class="movies-grid search-results" id="placeholder-grid"></div>
      `;
      const grid = document.getElementById('placeholder-grid');
      for (let i = 0; i < 6; i++) {
        const div = document.createElement('div');
        div.className = 'loading-placeholder';
        grid.appendChild(div);
      }
    }

    async function loadPoster(title, imgEl, fallbackEl) {
  try {
    const res = await fetch(`http://localhost:3000/poster?title=${encodeURIComponent(title)}`);
    const data = await res.json();
    if (data.image) {
      imgEl.src = data.image;
      imgEl.onload = () => {
        imgEl.style.display = 'block';
        fallbackEl.style.display = 'none';
      };
    }
  } catch (e) {
    console.warn(`Poster fetch failed for "${title}"`, e);
    // fallback already visible, no need to change
  }
}

function render(movies, follow) {
  const filtered = movies
    .filter(m => !getSeenTitles().includes(m.title))
    .slice(0, 5);

  // Clear previous output
  output.innerHTML = '';

  // Heading above the grid
  const heading = document.createElement('h2');
  heading.className = 'section-title';
  heading.textContent = '🎯 Your Perfect Recommendations';
  output.appendChild(heading);

  // Grid container for 3x2 layout
  const grid = document.createElement('div');
  grid.className = 'movies-grid search-results';
  output.appendChild(grid);

  // Add exactly 5 movie cards
  filtered.forEach(m => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.onclick = () => window.open(`https://google.com/search?q=${encodeURIComponent(m.title + ' watch online')}`);

    card.innerHTML = `
      <img class="movie-poster" style="display: none;" alt="${m.title}">
      <div class="movie-poster" style="display: flex;">${m.title}</div>
      <div class="movie-info">
        <h3 class="movie-title">${m.title}</h3>
        <p class="movie-description">${m.description || 'No description provided.'}</p>
        <div class="movie-actions">
          <button class="btn btn-small seen-btn">👁 Seen It</button>
        </div>
      </div>
    `;

    const img = card.querySelector('img');
    const fallback = card.querySelectorAll('.movie-poster')[1];

    if(useMock!=true){loadPoster(m.title, img, fallback);}

    card.querySelector('.seen-btn').onclick = e => {
      e.stopPropagation();
      addToSeen(m.title);
      card.classList.add('fade-out');
      setTimeout(() => card.remove(), 600);
      saveSeenToLocal(); // Ensure it's saved
    };

    grid.appendChild(card);
  });

  // Add follow-up card as the 6th card in the grid
  if (follow) {
    const followCard = document.createElement('div');
    followCard.className = 'follow-up-card';
    followCard.innerHTML = `<p>${follow}</p>`;
    grid.appendChild(followCard); // Add to grid instead of output
  }
}

    function addToSeen(title) {
      const seen = getSeenTitles();
      if (!seen.includes(title)) {
        seen.push(title);
        saveSeenToLocal(seen);
      }
    }

    function getSeenTitles() {
      try {
        return JSON.parse(localStorage.getItem('seen') || '[]');
      } catch {
        return [];
      }
    }

    function removeFromSeen(title) {
      const seen = getSeenTitles().filter(t => t !== title);
      saveSeenToLocal(seen);
    }

    function saveSeenToLocal(seenArray = null) {
      try {
        const seen = seenArray || getSeenTitles();
        localStorage.setItem('seen', JSON.stringify(seen));
        console.log('Saved seen content to localStorage:', seen);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }

    // Seen shows modal functionality
    document.getElementById('viewSeenBtn').onclick = () => {
      const list = document.getElementById('seenList');
      list.innerHTML = '';
      const seen = getSeenTitles();
      document.getElementById('seenModal').classList.remove('hidden');

      if (seen.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No shows marked as seen yet</p>';
        return;
      }

      seen.forEach(title => {
        const item = document.createElement('div');
        item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; margin-bottom: 0.5rem; background: var(--bg-secondary); border-radius: 10px;';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        titleSpan.style.fontWeight = '500';
        
        const btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.className = 'btn btn-small';
        btn.style.background = '#ef4444';
        btn.style.color = 'white';
        btn.onclick = () => {
          removeFromSeen(title);
          item.remove();
        };

        item.appendChild(titleSpan);
        item.appendChild(btn);
        list.appendChild(item);
      });
    };

    function closeSeenModal() {
      document.getElementById('seenModal').classList.add('hidden');
    }

    // Filter modal functionality
    document.getElementById('filterBtn').onclick = () => {
      document.getElementById('filterModal').classList.remove('hidden');
    };

    function closeFilterModal() {
      document.getElementById('filterModal').classList.add('hidden');
    }

    function getFilterValues() {
      const streamSelect = document.getElementById('streamFilter');
      const selectedStreams = Array.from(streamSelect.selectedOptions).map(option => option.value);
      
      const genreSelect = document.getElementById('genreFilter');
      const selectedGenres = Array.from(genreSelect.selectedOptions).map(option => option.value);
      
      const typeSelect = document.getElementById('typeFilter');
      const selectedTypes = Array.from(typeSelect.selectedOptions).map(option => option.value);

      return {
        stream: selectedStreams.includes('') || selectedStreams.length === 0 ? 'Any' : selectedStreams.join(', '),
        genre: selectedGenres.includes('') || selectedGenres.length === 0 ? 'Any' : selectedGenres.join(', '),
        type: selectedTypes.includes('') || selectedTypes.length === 0 ? 'Any' : selectedTypes.join(', ')
      };
    }

    function applyFilters() {
      closeFilterModal();
      form.requestSubmit();
    }

async function fetchWithRetry(url, options = {}, retries = 5, delay = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("No valid 'results' field in response");
      }

      return data; // ✅ success

    } catch (err) {
      console.warn(`⚠️ Attempt ${attempt} failed: ${err.message}`);

      if (attempt === retries) {
        throw new Error(`All ${retries} attempts failed`);
      }

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

    // Enhanced popular content with fallback
async function showPopular() {
  output.innerHTML = `
    <h2 class="section-title">🔥 Popular Movies & Shows</h2>
    <div class="movies-grid" id="popular-placeholder"></div>
  `;

  const grid = document.getElementById("popular-placeholder");

  // Show loading placeholders
  grid.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const div = document.createElement('div');
    div.className = 'loading-placeholder';
    grid.appendChild(div);
  }

  // Directly use mock data if enabled
  if (typeof useMock !== 'undefined' && useMock) {
    console.log("⚙️ Mock mode enabled: using mockPopularContent");
    //alert("Mock Mode is enabled!");
    await new Promise(resolve => setTimeout(resolve, 800)); // Optional: simulate delay
    grid.innerHTML = '';
    mockPopularContent.forEach(item => {
      const card = createMovieCard(item);
      grid.appendChild(card);
    });
    return;
  }

  try {
    const data = await fetchWithRetry("http://localhost:3000/popular", {}, 5, 3000);
    grid.innerHTML = '';
    data.results.forEach(item => {
      const card = createMovieCard(item);
      grid.appendChild(card);
    });

  } catch (finalErr) {
    console.error("❌ Could not fetch after retries:", finalErr.message);
    grid.innerHTML = '';
    mockPopularContent.forEach(item => {
      const card = createMovieCard(item);
      grid.appendChild(card);
    });
  }
}

    function createMovieCard(item) {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.onclick = () => window.open(`https://google.com/search?q=${encodeURIComponent(item.title + ' movie watch online')}`);
      const imageHTML = item.image
  ? `<img src="${item.image}" alt="${item.title}" class="movie-poster" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
  : `<div class="movie-poster" style="display: flex;">${item.title}</div>`;
      card.innerHTML = `
      ${imageHTML}
        <div class="movie-poster" style="display: none;">${item.title}</div>
        <div class="movie-info">
          <h3 class="movie-title">${item.title}</h3>
          <p class="movie-description">${item.description || item.overview || 'No description available.'}</p>
          <div class="movie-actions">
            <button class="btn btn-small seen-btn">👁 Seen It</button>
          </div>
        </div>
      `;
      
      card.querySelector('.seen-btn').onclick = e => {
        e.stopPropagation();
        addToSeen(item.title);
        card.classList.add('fade-out');
        setTimeout(() => card.remove(), 600);
        saveSeenToLocal(); // Ensure it's saved
      };
      
      return card;
    }

    // Initialize popular content on page load
    document.addEventListener("DOMContentLoaded", showPopular);

    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
      }
    });
