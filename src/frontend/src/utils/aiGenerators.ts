// ─── Language Detection ───────────────────────────────────────────────────────
export function isHindi(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

// ─── AI Chat Response Generator ───────────────────────────────────────────────
export function generateChatResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  const hindi = isHindi(input);

  if (hindi) {
    if (/नमस्|हेलो|हाय|हि/.test(input)) {
      return "नमस्ते! मैं आपकी AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकती हूँ? 😊";
    }
    if (/मौसम|weather/.test(input)) {
      return "आज का मौसम सुहाना लग रहा है! हालाँकि मुझे real-time डेटा नहीं मिलता, लेकिन आप किसी भी मौसम ऐप पर जाँच सकते हैं। आपके शहर में कैसा मौसम है?";
    }
    if (/मदद|help|सहायता/.test(input)) {
      return "बिल्कुल! मैं आपकी मदद करने के लिए यहाँ हूँ। आप मुझसे किसी भी विषय पर बात कर सकते हैं — शिक्षा, मनोरंजन, टेक्नोलॉजी, या और कुछ भी!";
    }
    if (/कौन|तुम|आप/.test(input)) {
      return "मैं एक AI चैटबॉट हूँ। मुझे आपकी सहायता करने के लिए बनाया गया है। मैं सवालों के जवाब देने, जानकारी देने और बातचीत करने में माहिर हूँ।";
    }
    if (/धन्यवाद|शुक्रिया/.test(input)) {
      return "आपका स्वागत है! अगर आपको और कोई मदद चाहिए तो बताइए। 🙏";
    }
    return `आपका सवाल बहुत दिलचस्प है। "${input.slice(0, 30)}..." — इस विषय पर मेरी राय यह है कि हर समस्या का एक समाधान होता है। क्या आप इसके बारे में और बताना चाहेंगे?`;
  }

  // English responses
  if (/^(hi|hello|hey|helo|namaste|greetings)/i.test(lower)) {
    return "Hey there! 👋 I'm your AI assistant. What can I help you with today? Feel free to ask me anything — I'm here to help!";
  }
  if (/how are you|how r u|how do you do/i.test(lower)) {
    return "I'm doing great, thank you for asking! As an AI, I don't have feelings per se, but I'm fully charged and ready to help you. How about you? 😊";
  }
  if (/weather/i.test(lower)) {
    return "I don't have access to real-time weather data, but you can check weather.com or your phone's weather app for accurate forecasts. Is there anything else I can help with?";
  }
  if (/what (is|are) (your name|you called)/i.test(lower)) {
    return "I'm your AI assistant, here to help with questions, conversations, and more! I don't have a specific name, but you can call me whatever you like. 😄";
  }
  if (/help|assist|support/i.test(lower)) {
    return "Of course! I'm here to help. I can answer questions, explain concepts, help brainstorm ideas, write content, and have conversations on virtually any topic. What do you need?";
  }
  if (/thank(s| you)/i.test(lower)) {
    return "You're very welcome! It's my pleasure to assist. Feel free to come back anytime you need help. 🙏";
  }
  if (/who (made|created|built) you/i.test(lower)) {
    return "I'm an AI assistant built as part of this AI Tools Suite. I'm designed to help you with conversations, answer questions, and assist with various tasks!";
  }
  if (/what can you do/i.test(lower)) {
    return "Great question! I can:\n• Answer questions on almost any topic\n• Help you brainstorm and think through problems\n• Explain complex concepts in simple terms\n• Have meaningful conversations\n• Provide advice and suggestions\n\nWhat would you like to explore?";
  }
  if (/joke|funny|humor/i.test(lower)) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything! 😄",
      "I told my computer I needed a break. Now it won't stop sending me Kit-Kat ads. 🍫",
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  if (/math|calculate|compute/i.test(lower)) {
    return "Math is fascinating! For calculations, I can help explain concepts and solve problems step by step. What mathematical challenge are you working on?";
  }
  if (/love|relationship|feelings/i.test(lower)) {
    return "That's a deeply human topic. Relationships and emotions are complex, beautiful, and sometimes challenging. I'm happy to listen and share thoughts. What's on your mind?";
  }

  // Default thoughtful responses
  const defaults = [
    `That's an interesting thought about "${input.slice(0, 40).trim()}". There are many perspectives to consider here. Could you elaborate further? I'd love to explore this topic deeper with you.`,
    `I find that question quite compelling. The way I see it, every situation has multiple dimensions worth examining. What specific aspect would you like to focus on?`,
    `Great point! This touches on something important. Let me think about this carefully — the key insight here is that context matters greatly. What's your take on it?`,
    `I appreciate you sharing that with me. To give you the most helpful response, could you tell me more about what you're looking for? I want to make sure I understand your needs fully.`,
    `That's worth exploring! In my analysis, this kind of question often leads to fascinating discoveries. Let's think through this together — what do you already know about it?`,
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ─── Video Script Generator ───────────────────────────────────────────────────
export function generateVideoScript(topic: string, duration: string): string {
  const wordCounts: Record<string, number> = {
    "1 min": 150,
    "3 min": 450,
    "5 min": 750,
    "10 min": 1500,
  };
  const words = wordCounts[duration] || 450;
  const mainPoints = extractMainPoints(topic);

  return `🎬 VIDEO SCRIPT: "${topic.toUpperCase()}"
Duration: ${duration} (~${words} words)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[HOOK / INTRO — 0:00-0:15]
"Did you know that ${topic.toLowerCase()} is one of the most talked-about topics right now? In the next ${duration}, I'm going to break down everything you need to know. Stay till the end — there's a game-changer I saved for last."

[INTRO ANIMATION + TITLE CARD]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[MAIN POINT 1: Understanding the Basics]
"First, let's establish what we're actually talking about when we say ${topic}. Many people have heard the term, but few truly understand what it means at its core.

${mainPoints[0]}

This is crucial because without this foundation, everything else we discuss won't make complete sense. Take a moment to let that sink in."

[B-ROLL: relevant visuals, animations, or demonstrations]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[MAIN POINT 2: Why It Matters]
"Now that we understand the basics, let's talk about why ${topic} matters to YOU specifically.

${mainPoints[1]}

The impact of this cannot be overstated. Whether you're a beginner or have years of experience, understanding this will change how you approach the subject entirely."

[CUT TO: Interview style or talking head]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[MAIN POINT 3: Actionable Steps]
"So what can you actually DO with this information? Here's the practical part:

Step 1: ${mainPoints[2]}
Step 2: Start applying it consistently — even 10 minutes a day makes a difference.
Step 3: Track your progress and iterate based on what works.

${mainPoints[3]}

The key is to start TODAY. Not tomorrow, not next week."

[SCREEN RECORDING or DEMO if applicable]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[CALL TO ACTION]
"Here's your challenge: Take ONE thing from this video and implement it today. Just one. Drop a comment below telling me which point resonated most with you.

If you found this valuable, hit that like button — it really helps more people find this content. And if you want more videos like this, subscribe and hit the notification bell so you never miss an update."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[OUTRO]
"That wraps up today's video on ${topic}. Remember: ${mainPoints[4]}

Until next time, keep learning, keep growing, and I'll see you in the next one. Take care!"

[END SCREEN: 20 seconds with subscribe button and video recommendations]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PRODUCTION NOTES:
• Thumbnail: Close-up face + bold text "${topic.slice(0, 20)}"
• Tags: #${topic.replace(/\s+/g, '')} #tutorial #howto #${topic.split(' ')[0].toLowerCase()}
• Best upload time: Tuesday-Thursday, 2-4 PM EST
• Description: First 150 chars should contain main keyword`;
}

function extractMainPoints(topic: string): string[] {
  const t = topic.toLowerCase();
  if (/tech|ai|machine|software|code|program/i.test(t)) {
    return [
      `${topic} represents a fundamental shift in how we interact with technology. At its core, it's about solving real-world problems more efficiently.`,
      `Research shows that professionals who master ${topic} see a 3x increase in productivity and open doors to opportunities that didn't exist 5 years ago.`,
      `Begin with the fundamentals — master the core concepts before moving to advanced techniques. Resources like documentation and communities are your best friends.`,
      `The most successful practitioners of ${topic} combine technical knowledge with creative problem-solving. It's not just about tools, but mindset.`,
      `The best time to learn ${topic} was yesterday. The second best time is right now. Small consistent steps beat occasional big efforts every time.`,
    ];
  }
  if (/health|fitness|workout|diet|nutrition/i.test(t)) {
    return [
      `${topic} is not a one-size-fits-all approach. Your body is unique, and what works for someone else may need adjustment for your specific needs.`,
      `Studies consistently show that consistency trumps intensity when it comes to ${topic}. Showing up 80% of the time beats occasional perfect efforts.`,
      `Start with a baseline assessment. Know where you are before deciding where you want to go — track the metrics that actually matter for ${topic}.`,
      `The mental component of ${topic} is often overlooked but accounts for 50% of success. Mindset shifts are as important as physical actions.`,
      `Progress in ${topic} isn't linear. Expect plateaus, embrace them as consolidation phases, and trust the process.`,
    ];
  }
  return [
    `${topic} has evolved significantly over the past decade. Understanding its history helps us appreciate its current form and predict its future direction.`,
    `The real value of ${topic} lies not just in theory but in practical application. Real-world examples show us what's truly possible.`,
    `Start small and iterate. Pick the most important aspect of ${topic} and focus on mastering it before expanding your scope.`,
    `Community and collaboration accelerate learning. Find others interested in ${topic} and learn from their experiences.`,
    `Every expert in ${topic} started as a complete beginner. The only difference between them and you is time and consistent effort.`,
  ];
}

// ─── Logo Generator ───────────────────────────────────────────────────────────
export interface LogoConcept {
  brandName: string;
  style: string;
  colors: Array<{ name: string; hex: string; role: string }>;
  font: string;
  tagline: string;
  concept: string;
  iconSuggestion: string;
}

export function generateLogoConcept(brandName: string, style: string): LogoConcept {
  const palettes: Record<string, Array<{ name: string; hex: string; role: string }>> = {
    Modern: [
      { name: "Midnight", hex: "#0F172A", role: "Primary" },
      { name: "Electric Cyan", hex: "#06B6D4", role: "Accent" },
      { name: "Slate", hex: "#94A3B8", role: "Secondary" },
    ],
    Minimal: [
      { name: "Obsidian", hex: "#1C1C1C", role: "Primary" },
      { name: "Pure White", hex: "#FAFAFA", role: "Background" },
      { name: "Graphite", hex: "#6B7280", role: "Secondary" },
    ],
    Bold: [
      { name: "Deep Crimson", hex: "#DC2626", role: "Primary" },
      { name: "Jet Black", hex: "#111827", role: "Background" },
      { name: "Gold Accent", hex: "#F59E0B", role: "Accent" },
    ],
    Playful: [
      { name: "Coral", hex: "#FB7185", role: "Primary" },
      { name: "Sunshine", hex: "#FBBF24", role: "Secondary" },
      { name: "Mint", hex: "#34D399", role: "Accent" },
    ],
    Professional: [
      { name: "Navy Blue", hex: "#1E3A5F", role: "Primary" },
      { name: "Silver", hex: "#C0C0C0", role: "Secondary" },
      { name: "Off-White", hex: "#F8F9FA", role: "Background" },
    ],
  };

  const fonts: Record<string, string> = {
    Modern: "Sora or Plus Jakarta Sans — clean geometric with personality",
    Minimal: "Inter or Helvetica Neue — pure clarity, nothing extraneous",
    Bold: "Bebas Neue or Black Han Sans — maximum impact, zero compromise",
    Playful: "Nunito or Fredoka One — rounded, friendly, approachable",
    Professional: "Libre Baskerville or Merriweather — trustworthy, established",
  };

  const taglines: Record<string, string> = {
    Modern: "Redefining what's possible",
    Minimal: "Less noise. More signal.",
    Bold: "Make your mark.",
    Playful: "Where ideas come alive!",
    Professional: "Excellence in every detail.",
  };

  const concepts: Record<string, string> = {
    Modern: `A forward-thinking mark that positions ${brandName} as an innovator. The logo uses geometric precision with subtle dynamic elements — suggesting movement and progress. Clean lines communicate reliability while the modern palette signals a tech-forward brand that's ahead of the curve.`,
    Minimal: `Pure distillation of ${brandName}'s essence. The logo strips away everything non-essential, leaving only what truly communicates the brand's core value. Negative space is used intentionally — what's NOT there is as important as what IS. This approach signals confidence and sophistication.`,
    Bold: `${brandName} demands attention. This logo concept uses maximum contrast and strong typography to create an undeniable visual presence. Perfect for brands that want to dominate their space and leave a lasting impression on every person who encounters it.`,
    Playful: `${brandName} radiates warmth and approachability. The logo uses rounded forms, vibrant colors, and dynamic energy to communicate a brand that's fun to interact with. This style resonates particularly well with younger audiences and lifestyle brands.`,
    Professional: `${brandName} communicates trust, expertise, and longevity. Classic proportions and refined typography signal a brand with heritage and substance. This concept instills confidence — clients feel they're in capable hands.`,
  };

  const icons: Record<string, string> = {
    Modern: "Abstract geometric mark — hexagon or diamond with inner glow",
    Minimal: "Single letterform from brand initials, perfectly proportioned",
    Bold: "Strong shield or angular emblem with bold initials",
    Playful: "Rounded character or mascot element with expressive features",
    Professional: "Classic badge or crest with clean inner details",
  };

  return {
    brandName,
    style,
    colors: palettes[style] || palettes["Modern"],
    font: fonts[style] || fonts["Modern"],
    tagline: taglines[style] || taglines["Modern"],
    concept: concepts[style] || concepts["Modern"],
    iconSuggestion: icons[style] || icons["Modern"],
  };
}

// ─── Hashtag Generator ────────────────────────────────────────────────────────
export interface HashtagSet {
  popular: string[];
  niche: string[];
  trending: string[];
  longTail: string[];
}

export function generateHashtags(topic: string, platform: string): HashtagSet {
  const clean = topic.trim().toLowerCase().replace(/[^a-z0-9\s]/g, "");
  const words = clean.split(/\s+/).filter(Boolean);
  const mainTag = words.join("");
  const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const mainTagTitle = words.map(titleCase).join("");

  const platformPopular: Record<string, string[]> = {
    Instagram: ["#instagood", "#photooftheday", "#instagram", "#love", `#${mainTag}`],
    "Twitter/X": [`#${mainTag}`, "#trending", "#viral", `#${mainTagTitle}Today`, "#MustRead"],
    YouTube: [`#${mainTag}`, "#youtube", "#viral", `#${mainTagTitle}Tutorial`, "#subscribe"],
    LinkedIn: [`#${mainTag}`, "#professional", "#business", "#career", "#networking"],
    General: [`#${mainTag}`, "#viral", "#trending", "#explore", `#${mainTagTitle}Lovers`],
  };

  const niche = [
    `#${mainTag}community`,
    `#${mainTag}tips`,
    `#${mainTag}life`,
    `#${mainTag}daily`,
    `#${mainTag}vibes`,
    `#${mainTag}goals`,
    `#${mainTag}inspiration`,
    `#best${mainTag}`,
    `#${mainTag}world`,
    `#${mainTag}culture`,
  ];

  const trending = [
    `#${mainTagTitle}${new Date().getFullYear()}`,
    `#New${mainTagTitle}`,
    `#${mainTagTitle}Trend`,
    `#${mainTagTitle}Challenge`,
    `#${mainTagTitle}Viral`,
  ];

  const longTail = [
    `#${mainTag}forbeginners`,
    `#${mainTag}tutorial${new Date().getFullYear()}`,
    `#best${mainTag}tips`,
    `#how${mainTag}works`,
    `#${mainTag}explained`,
    `#${mainTag}stepbystep`,
    `#${mainTag}ideas`,
    `#${mainTag}hacks`,
    `#${mainTag}secrets`,
    `#${mainTag}101`,
  ];

  // Add topic-specific hashtags
  if (/food|recipe|cook|eat|delicious/i.test(topic)) {
    niche.push("#foodphotography", "#foodie", "#yummy", "#homecooking");
  }
  if (/travel|trip|journey|explore/i.test(topic)) {
    niche.push("#wanderlust", "#travelgram", "#adventure", "#explore");
  }
  if (/fashion|style|outfit|clothes/i.test(topic)) {
    niche.push("#ootd", "#fashionista", "#styleinspo", "#lookbook");
  }
  if (/fitness|gym|workout|health/i.test(topic)) {
    niche.push("#fitfam", "#gymlife", "#healthylifestyle", "#motivated");
  }
  if (/tech|ai|software|code/i.test(topic)) {
    niche.push("#techinnovation", "#ai", "#coding", "#developer");
  }

  return {
    popular: (platformPopular[platform] || platformPopular["General"]).slice(0, 5),
    niche: niche.slice(0, 10),
    trending: trending.slice(0, 5),
    longTail: longTail.slice(0, 8),
  };
}

// ─── Homework Helper ──────────────────────────────────────────────────────────
export interface HomeworkSolution {
  steps: Array<{ title: string; content: string }>;
  summary: string;
  keyTerms: string[];
  extraDetail: string;
}

export function generateHomeworkSolution(question: string, subject: string): HomeworkSolution {
  const q = question.toLowerCase();

  if (subject === "Math") {
    return solveMath(question);
  }
  if (subject === "Science") {
    return solveScience(question, q);
  }
  if (subject === "History") {
    return solveHistory(question, q);
  }
  if (subject === "English") {
    return solveEnglish(question, q);
  }
  return solveGeneral(question, q);
}

function solveMath(question: string): HomeworkSolution {
  const numberMatch = question.match(/(\d+(?:\.\d+)?)/g);
  const nums = numberMatch ? numberMatch.map(Number) : [10, 5];

  return {
    steps: [
      { title: "📖 Read and Understand", content: `Carefully read the problem: "${question}"\n\nIdentify: What is given? What are we solving for? Are there any constraints or special conditions?` },
      { title: "🔍 Identify the Type", content: `Based on the problem structure, this appears to involve mathematical operations with the values: ${nums.join(", ")}.\n\nDetermine which formula or method applies: arithmetic, algebra, geometry, or calculus.` },
      { title: "✏️ Set Up the Equation", content: `Let's define our variables:\n• Let x = the unknown value we're solving for\n• Given values: ${nums.join(", ")}\n\nWrite out the mathematical relationship between these values.` },
      { title: "🧮 Solve Step by Step", content: `Step 1: Isolate the variable\nStep 2: Apply inverse operations\nStep 3: Simplify both sides\nStep 4: Verify the solution satisfies the original equation` },
      { title: "✅ Check Your Answer", content: `Always verify by substituting your answer back into the original equation.\n\nDoes it make logical sense? Is the answer within expected bounds?\nUnits check: make sure your answer has the correct units if applicable.` },
    ],
    summary: `To solve this math problem, identify the type of problem (arithmetic/algebra/geometry), set up the appropriate equation, solve systematically, and verify your answer by substituting back into the original.`,
    keyTerms: ["Variable", "Equation", "Solution", "Coefficient", "Constant", "Like terms"],
    extraDetail: `📐 DEEPER UNDERSTANDING:\n\nCommon math strategies:\n1. Draw a diagram when dealing with geometry\n2. Make a table for pattern-based problems\n3. Work backwards for complex word problems\n4. Estimate first to sanity-check your answer\n5. Factor when you see expressions that can be simplified\n\n💡 Memory Tip: PEMDAS/BODMAS — always follow order of operations:\nParentheses → Exponents → Multiplication/Division → Addition/Subtraction`,
  };
}

function solveScience(question: string, q: string): HomeworkSolution {
  const isPhysics = /force|motion|velocity|acceleration|energy|gravity|newton/i.test(q);
  const isChemistry = /atom|molecule|element|compound|reaction|periodic|bond/i.test(q);
  const isBiology = /cell|organism|dna|evolution|photosynthesis|gene|species/i.test(q);

  const topic = isPhysics ? "Physics" : isChemistry ? "Chemistry" : isBiology ? "Biology" : "General Science";

  return {
    steps: [
      { title: `🔬 Core Concept (${topic})`, content: `This question relates to ${topic}. The fundamental principle at work here involves understanding how natural phenomena follow predictable laws and patterns.\n\nThe scientific method guides us: Observe → Hypothesize → Experiment → Analyze → Conclude.` },
      { title: "📚 Key Principles", content: isPhysics
        ? "Newton's Laws, Conservation of Energy, and Thermodynamics form the foundation. Force = mass × acceleration (F=ma) is often the starting point for motion problems."
        : isChemistry
        ? "The Periodic Table organizes elements by atomic number. Chemical bonds (ionic, covalent, metallic) hold atoms together. Conservation of mass: matter is neither created nor destroyed."
        : isBiology
        ? "Cells are the basic unit of life. DNA carries genetic information. Evolution explains biodiversity. Photosynthesis and respiration are opposite but complementary processes."
        : "Scientific laws describe consistent patterns in nature. Theories explain why these patterns exist. Both are supported by extensive evidence." },
      { title: "🧪 Analysis", content: `Applying these principles to your question:\n"${question}"\n\nBreak the problem into parts:\n• What phenomenon is being described?\n• What variables are involved?\n• How do they relate to each other?` },
      { title: "💡 Explanation", content: `The answer involves understanding the cause-and-effect relationship in this scenario.\n\nKey factors:\n1. The initial conditions and what triggers the process\n2. How energy or matter is transformed\n3. The observable outcome and how we can measure it` },
      { title: "🌟 Real-World Application", content: `This concept appears in everyday life:\n• Scientists use this to explain natural phenomena\n• Engineers apply this in designing systems\n• We observe this in nature constantly\n\nUnderstanding this helps predict and explain events in the physical world.` },
    ],
    summary: `This ${topic} question requires understanding the underlying scientific principles, analyzing the given conditions, and applying the relevant laws to reach a logical conclusion.`,
    keyTerms: isPhysics
      ? ["Force", "Mass", "Acceleration", "Velocity", "Energy", "Work", "Power"]
      : isChemistry
      ? ["Atom", "Molecule", "Element", "Compound", "Reaction", "Bond", "Valence"]
      : ["Cell", "Organism", "Gene", "Ecosystem", "Evolution", "Metabolism"],
    extraDetail: `🔭 ADVANCED CONCEPTS:\n\nThis topic connects to broader scientific themes:\n• Systems thinking: how parts interact to create emergent properties\n• Scale: processes work differently at quantum, molecular, and macro scales\n• Equilibrium: natural systems tend toward balanced states\n\n📊 Study Strategy:\n1. Understand concepts before memorizing formulas\n2. Draw diagrams to visualize processes\n3. Connect new knowledge to things you already know\n4. Practice with different types of problems`,
  };
}

function solveHistory(question: string, _q: string): HomeworkSolution {
  return {
    steps: [
      { title: "📅 Historical Context", content: `To understand "${question}", we need to place it in its proper historical context.\n\nHistory is shaped by:\n• Political forces and power structures\n• Economic conditions and trade\n• Social movements and cultural shifts\n• Technological innovations\n• Geographic factors` },
      { title: "🌍 Key Causes & Background", content: `Historical events rarely happen in isolation. They're the result of complex, interconnected causes:\n\n1. Long-term causes: Underlying tensions that built over years or decades\n2. Short-term causes: Immediate triggers that set events in motion\n3. Individual agency: The role of specific leaders and decisions\n4. Structural factors: Social, economic, political systems at play` },
      { title: "📊 Analysis of Events", content: `When analyzing this historical topic:\n\n• Primary sources: Diaries, letters, official documents from the period\n• Secondary sources: Historians' interpretations and analysis\n• Multiple perspectives: Different groups experienced events differently\n• Bias awareness: Consider who wrote the history and why` },
      { title: "⚖️ Significance & Impact", content: `Why does this matter? Historical events have lasting consequences:\n\n• Immediate effects: What changed directly as a result?\n• Long-term effects: How did this shape the future?\n• Global impact: How did this affect other regions?\n• Legacy: How do we remember and interpret this today?` },
      { title: "📝 Forming Your Argument", content: `A strong history answer includes:\n✓ Clear thesis statement\n✓ Evidence from primary/secondary sources\n✓ Analysis (don't just describe — explain WHY)\n✓ Counter-arguments acknowledged\n✓ Conclusion that answers the question directly` },
    ],
    summary: `History requires understanding context, causes, and consequences. Analyze events through multiple perspectives, use evidence to support arguments, and consider both short-term and long-term significance.`,
    keyTerms: ["Primary Source", "Secondary Source", "Chronology", "Causation", "Consequence", "Bias", "Historiography"],
    extraDetail: `🏛️ DEEPER HISTORICAL THINKING:\n\nHistorical thinking skills:\n1. Chronological reasoning: Understanding change over time\n2. Contextualization: Situating events in their historical moment\n3. Comparison: Analyzing similarities and differences across time/place\n4. Causation: Explaining why events happened\n5. Argumentation: Using evidence to make historical claims\n\n📚 Research Tips:\n• Start with encyclopedias for overview, then go to primary sources\n• Look for opposing historical interpretations\n• Use databases like JSTOR for academic articles`,
  };
}

function solveEnglish(question: string, q: string): HomeworkSolution {
  const isGrammar = /grammar|sentence|verb|noun|adjective|tense|pronoun/i.test(q);
  const isWriting = /essay|paragraph|write|draft|thesis|argument/i.test(q);
  const isLiterature = /story|novel|poem|character|theme|metaphor|symbolism/i.test(q);

  return {
    steps: [
      { title: "📖 Understanding the Question", content: `Let's analyze what's being asked: "${question}"\n\n${isGrammar ? "This is a grammar question. We need to identify the grammatical structure and rules at play."
        : isWriting ? "This is a writing task. We need to organize thoughts, develop arguments, and communicate clearly."
        : isLiterature ? "This involves literary analysis. We need to examine text for meaning, themes, and devices."
        : "This English question requires careful reading and thoughtful response."}` },
      { title: isGrammar ? "📏 Grammar Rules" : isWriting ? "✍️ Writing Structure" : "🔍 Literary Analysis", content: isGrammar
        ? "Key grammar principles:\n\n• Subject-Verb Agreement: The verb must match its subject in number\n• Tense Consistency: Maintain consistent tense throughout\n• Pronoun Reference: Pronouns must clearly refer to their antecedents\n• Punctuation: Use commas, semicolons, and colons correctly\n• Active vs. Passive Voice: Active voice is generally clearer and more direct"
        : isWriting
        ? "Effective writing structure:\n\n• Introduction: Hook + Background + Thesis statement\n• Body Paragraphs: Topic sentence + Evidence + Analysis + Transition\n• Conclusion: Restate thesis (not copy) + Synthesis + Closing thought\n\nEach paragraph should have ONE main idea, supported by evidence and your analysis."
        : "Literary analysis framework:\n\n• Plot: What happens (but don't just summarize!)\n• Character: How and why characters change\n• Theme: Central message or insight about human experience\n• Setting: How place/time shapes the story\n• Literary devices: Metaphor, simile, symbolism, irony, foreshadowing" },
      { title: "💡 Application", content: `Applying these concepts to your question:\n\nRemember the key principle: In English, clarity and precision are paramount. Every word choice matters. Read your work aloud — if it sounds awkward, revise it.\n\nStrong English answers demonstrate:\n1. Understanding of the question\n2. Relevant textual evidence\n3. Thoughtful analysis and interpretation\n4. Correct grammar and mechanics` },
      { title: "✏️ Writing Tips", content: `Essential writing advice:\n\n1. Show, don't tell: Use specific examples rather than vague statements\n2. Vary sentence structure: Mix short, punchy sentences with longer, complex ones\n3. Strong vocabulary: Choose precise words over general ones\n4. Transitions: Connect ideas with transitional words and phrases\n5. Revision: First drafts are never perfect — revise, revise, revise!` },
      { title: "🎯 Final Check", content: `Before submitting, check:\n☐ Does it answer the actual question asked?\n☐ Is the grammar correct?\n☐ Are spelling and punctuation right?\n☐ Is the structure clear and logical?\n☐ Have you cited evidence where needed?\n☐ Does the conclusion wrap up effectively?` },
    ],
    summary: `This English question involves ${isGrammar ? "grammar rules and language mechanics" : isWriting ? "structured writing and argumentation" : isLiterature ? "literary analysis and interpretation" : "language skills and communication"}. Apply the relevant principles systematically for a strong response.`,
    keyTerms: isGrammar
      ? ["Subject", "Predicate", "Clause", "Phrase", "Modifier", "Antecedent"]
      : isWriting
      ? ["Thesis", "Argument", "Evidence", "Analysis", "Transition", "Synthesis"]
      : ["Theme", "Motif", "Metaphor", "Symbolism", "Protagonist", "Narrative"],
    extraDetail: `📚 ADVANCED ENGLISH SKILLS:\n\nLevels of reading comprehension:\n1. Literal: What does the text say?\n2. Inferential: What does the text imply?\n3. Critical: How does the text construct meaning?\n4. Creative: How can we apply or extend the text's ideas?\n\n✍️ Writing Process:\nPrewrite → Draft → Revise (content) → Edit (language) → Proofread (errors)\n\nNever skip the revision stage — it's where good writing becomes great writing.`,
  };
}

function solveGeneral(question: string, _q: string): HomeworkSolution {
  return {
    steps: [
      { title: "🎯 Understanding the Question", content: `Let's break down the question: "${question}"\n\nKey steps for any homework problem:\n1. Read the question carefully — what exactly is being asked?\n2. Identify the subject area and relevant concepts\n3. Recall related knowledge you already have\n4. Plan your approach before diving in` },
      { title: "🔍 Research & Analysis", content: `Gather relevant information:\n\n• What do you already know about this topic?\n• What key terms or concepts appear in the question?\n• Are there similar problems you've solved before?\n• What sources would have reliable information on this?\n\nOrganize your thoughts before writing — a brief outline saves time.` },
      { title: "💡 Developing Your Answer", content: `Build a comprehensive response:\n\n1. Start with the core answer or main point\n2. Support it with evidence, examples, or reasoning\n3. Explain the significance or implications\n4. Address any exceptions or nuances\n5. Connect to broader themes or concepts\n\nDepth matters: go beyond surface-level answers.` },
      { title: "🔗 Making Connections", content: `The best answers connect ideas:\n\n• How does this relate to other things you've learned?\n• Are there real-world examples that illustrate this?\n• What are the practical implications?\n• How might different people view this question differently?\n\nShowing these connections demonstrates deep understanding.` },
      { title: "✅ Review & Refine", content: `Before finalizing:\n\n☐ Does my answer directly address the question?\n☐ Have I supported my points with evidence?\n☐ Is my reasoning clear and logical?\n☐ Is my presentation clean and organized?\n☐ Have I proofread for errors?\n\nQuality over quantity: a focused, well-reasoned answer beats a rambling one.` },
    ],
    summary: `This question requires careful analysis, application of relevant knowledge, and clear communication of your reasoning. Break it into parts, address each systematically, and support your answer with evidence.`,
    keyTerms: ["Analysis", "Synthesis", "Evaluation", "Evidence", "Argument", "Conclusion"],
    extraDetail: `🎓 STUDY STRATEGIES:\n\nEffective learning techniques:\n1. Active recall: Test yourself instead of just re-reading\n2. Spaced repetition: Review material over multiple sessions\n3. Feynman Technique: Explain concepts in simple terms\n4. Mind mapping: Visual organization of related ideas\n5. Pomodoro Method: 25 minutes focused work, 5 minute break\n\n💬 Ask for help:\nTeachers, tutors, study groups, and online resources are all valuable.\nDon't struggle alone — seeking help is a sign of intelligence, not weakness!`,
  };
}
