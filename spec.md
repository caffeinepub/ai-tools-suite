# AI Tools Suite

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- AI Chat: A conversational chatbot interface where users can type messages and get AI-style responses (simulated with smart pre-defined responses and pattern matching)
- AI Image Generator: A tool where users describe an image and get a placeholder/mock generated image result with prompt display
- AI Video Script Writer: Users enter a topic/title and get a structured video script (intro, main points, outro) as output
- AI Logo Maker: Users enter brand name and style preferences, get a text-based logo concept with color suggestions
- AI Hashtag Generator: Users enter a topic or caption, get a list of relevant hashtags for social media
- AI Homework Helper: Users enter a question or homework problem, get a step-by-step explanation/answer

### Modify
- None

### Remove
- None

## Implementation Plan
- Build a single-page React app with a sidebar/tab navigation for all 6 tools
- Each tool has its own panel with input fields and output display
- Use mock/simulated AI responses on the frontend (no real AI API needed)
- Store recent usage history per tool in backend (Motoko canister)
- Clean, modern UI with card-based layout and distinct color themes per tool

## UX Notes
- Landing page shows all 6 tools as cards
- Clicking a tool opens its interface
- Each tool has a clear input area and styled output area
- Mobile-friendly layout
- Hindi/English bilingual labels where appropriate
- Loading animation while "generating" responses
