function categorizeText(text) {
  const lowerText = text.toLowerCase();

  const categories = {
    // Prioritize this block to catch painting-related entries early
    "Arts & Humanities → Painting / Drawing": [
      "paint", "painting", "canvas", "draw", "drawing", "sketch", "color", "brush", "charcoal", "illustrate", "art store", "art", "hobby"
    ],

    "Personal → Emotions": [
      "happy", "sad", "angry", "frustrated", "joy", "grateful", "anxious", "depressed", "excited", "nervous"
    ],
    "Personal → Daily Routine": [
      "wake up", "morning", "night routine", "breakfast", "sleep schedule", "exercise", "walk", "routine", "daily plan"
    ],
    "Personal → Relationships": [
      "friend", "family", "love", "partner", "boyfriend", "girlfriend", "spouse", "relationship", "date", "crush"
    ],
    "Personal → Health & Fitness": [
      "fitness", "workout", "diet", "gym", "nutrition", "healthy", "unhealthy", "fat", "fit", "steps", "running", "weight"
    ],
    "Personal → Life Reflections": [
      "life", "thoughts", "regret", "realization", "change", "habit", "grow", "personality", "reflection", "introspection"
    ],

    "Work & Career → Meetings": [
      "meeting", "team sync", "standup", "agenda", "calendar invite", "discussion", "recap", "1-on-1"
    ],
    "Work & Career → Deadlines & Planning": [
      "deadline", "plan", "milestone", "roadmap", "timeline", "due date", "sprint", "kanban"
    ],
    "Work & Career → Office Politics": [
      "promotion", "manager", "office politics", "colleague", "team conflict", "hierarchy"
    ],
    "Work & Career → Job Search": [
      "resume", "interview", "hiring", "application", "linkedin", "offer", "job hunting", "headhunter"
    ],
    "Work & Career → Productivity": [
      "productive", "efficiency", "focus", "priority", "task", "project", "time block", "deep work"
    ],

    "Education → Research & Thesis": [
      "research", "thesis", "paper", "experiment", "lab", "journal", "citation"
    ],
    "Education → School / College Topics": [
      "class", "school", "college", "university", "teacher", "subject", "professor", "semester"
    ],
    "Education → Assignments & Exams": [
      "assignment", "exam", "test", "quiz", "submission", "grade", "evaluation"
    ],
    "Education → Learning New Skills": [
      "learning", "practice", "self study", "new skill", "skill up", "improve", "workshop"
    ],
    "Education → Online Courses": [
      "coursera", "udemy", "edx", "online course", "bootcamp", "certificate"
    ],
    "Education → Study Plans": [
      "study plan", "schedule", "goal setting", "study time", "revision"
    ],

    "Science & Technology → Computer Science → Programming": [
      "programming", "code", "coding", "software", "bug", "feature", "javascript", "python", "java", "typescript", "function", "variable"
    ],
    "Science & Technology → Computer Science → AI & ML": [
      "machine learning", "ai", "artificial intelligence", "model", "training", "data", "prompt", "nlp", "transformer", "llm"
    ],
    "Science & Technology → Computer Science → Web/Mobile Development": [
      "frontend", "backend", "react", "api", "html", "css", "node", "express", "mobile app", "ui", "ux", "responsive", "vite"
    ],
    "Science & Technology → Computer Science → Data Structures": [
      "data structure", "array", "linked list", "stack", "queue", "tree", "graph", "hashmap", "maximum", "find max", "element", "compare", "index", "sort", "search", "traverse"
    ],
    "Science & Technology → Engineering": [
      "mechanical", "electrical", "civil", "robot", "hardware", "circuit", "design", "CAD"
    ],
    "Science & Technology → Mathematics": [
      "math", "algebra", "geometry", "calculus", "probability", "equation", "statistics"
    ],
    "Science & Technology → Space & Physics": [
      "space", "nasa", "rocket", "planet", "gravity", "relativity", "quantum", "astrophysics"
    ],
    "Science & Technology → Biology & Medicine": [
      "biology", "body", "health", "disease", "doctor", "medicine", "brain", "genetics"
    ],
    "Science & Technology → Environmental Science": [
      "climate", "environment", "pollution", "earth", "weather", "recycle", "sustainability"
    ],

    "Arts & Humanities → Literature / Poetry": [
      "poem", "poetry", "literature", "novel", "story", "write", "author", "book"
    ],
    "Arts & Humanities → Philosophy": [
      "existence", "meaning", "truth", "ethics", "belief", "value", "logic"
    ],
    "Arts & Humanities → History": [
      "war", "revolution", "empire", "ancient", "historical", "past", "timeline"
    ],
    "Arts & Humanities → Music / Performing Arts": [
      "music", "song", "dance", "instrument", "theatre", "stage", "actor", "perform"
    ],

    "Social & Culture → Family & Traditions": [
      "family", "parents", "siblings", "tradition", "custom", "generation"
    ],
    "Social & Culture → Festivals & Events": [
      "festival", "celebration", "diwali", "christmas", "eid", "event", "party"
    ],
    "Social & Culture → Religion & Spirituality": [
      "god", "pray", "temple", "church", "religion", "spiritual", "faith"
    ],
    "Social & Culture → Social Issues": [
      "poverty", "inequality", "education system", "racism", "violence", "rights"
    ],
    "Social & Culture → Languages & Communication": [
      "language", "speak", "english", "hindi", "french", "communication", "translate"
    ],

    "Finance & Economics → Personal Finance": [
      "money", "saving", "expense", "bank", "spending", "cash", "wallet", "upi"
    ],
    "Finance & Economics → Budgeting": [
      "budget", "monthly expense", "plan finances", "savings goal"
    ],
    "Finance & Economics → Investing": [
      "stock", "invest", "etf", "mutual fund", "nifty", "sensex", "portfolio"
    ],
    "Finance & Economics → Business & Startups": [
      "startup", "founder", "business model", "pitch", "funding", "revenue"
    ],
    "Finance & Economics → Global Economy": [
      "inflation", "gdp", "interest rate", "central bank", "economy", "market"
    ],

    "Entertainment → Movies / TV Shows": [
      "movie", "tv", "series", "episode", "netflix", "actor", "cinema", "prime"
    ],
    "Entertainment → Music": [
      "song", "music", "melody", "rap", "album", "track", "playlist"
    ],
    "Entertainment → Games": [
      "game", "gamer", "playstation", "xbox", "mobile game", "esports", "console"
    ],
    "Entertainment → Memes": [
      "meme", "funny", "joke", "laugh", "troll", "viral"
    ],
    "Entertainment → Celebrities": [
      "celebrity", "famous", "star", "actor", "influencer", "paparazzi"
    ],

    "Lifestyle → Food & Cooking": [
      "food", "cook", "recipe", "meal", "restaurant", "dish", "kitchen"
    ],
    "Lifestyle → Travel": [
      "travel", "trip", "destination", "vacation", "explore", "place", "journey"
    ],
    "Lifestyle → Fashion": [
      "fashion", "clothes", "outfit", "style", "dress", "trend"
    ],
    "Lifestyle → Interior Design": [
      "interior", "room", "design", "home decor", "aesthetic", "furniture"
    ],
    "Lifestyle → Hobbies": [
      "hobby", "craft", "collect", "diy", "build", "learn", "pastime"
    ],

    "News & Current Events → Politics": [
      "government", "policy", "election", "vote", "law", "prime minister", "president", "bill"
    ],
    "News & Current Events → International Affairs": [
      "country", "foreign", "china", "usa", "united nations", "world news", "diplomacy"
    ],
    "News & Current Events → Local News": [
      "ottawa", "india", "city news", "traffic", "update", "local event"
    ],
    "News & Current Events → Climate & Environment": [
      "climate", "global warming", "eco", "carbon", "sustainability"
    ],
    "News & Current Events → Technology Updates": [
      "tech", "startup", "launch", "ai news", "feature release", "new tool", "product update"
    ],

    "Meta / Abstract Thoughts → Random Ideas": [
      "idea", "thought", "random", "note", "log", "concept", "inspiration"
    ],
    "Meta / Abstract Thoughts → Dreams": [
      "dream", "sleep", "nightmare", "imagine", "fantasy", "lucid"
    ],
    "Meta / Abstract Thoughts → “Shower Thoughts”": [
      "deep", "unexpected", "weird", "strange", "why", "shower"
    ],
    "Meta / Abstract Thoughts → Philosophical Musings": [
      "existence", "why", "meaning of life", "universe", "soul", "metaphysics"
    ]
  };

   for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(lowerText)) {
        return category;
      }
    }
  }

  return "Uncategorized";
}

module.exports = { categorizeText };