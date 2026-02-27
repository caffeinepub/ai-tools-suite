import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Image,
  Video,
  Palette,
  Hash,
  GraduationCap,
  ArrowLeft,
  Sparkles,
  ArrowRight,
  Heart,
} from "lucide-react";
import { ChatTool } from "@/components/tools/ChatTool";
import { ImageTool } from "@/components/tools/ImageTool";
import { ScriptTool } from "@/components/tools/ScriptTool";
import { LogoTool } from "@/components/tools/LogoTool";
import { HashtagTool } from "@/components/tools/HashtagTool";
import { HomeworkTool } from "@/components/tools/HomeworkTool";
import { useUsageStats } from "@/hooks/useQueries";

// ─── Tool Configuration ───────────────────────────────────────────────────────
type ToolId = "chat" | "image" | "script" | "logo" | "hashtag" | "homework";

interface Tool {
  id: ToolId;
  name: string;
  nameHi: string;
  tagline: string;
  icon: React.ReactNode;
  accentClass: string;
  borderClass: string;
  bgClass: string;
  textClass: string;
  shadowClass: string;
  meshClass: string;
  description: string;
  // FIX 1: each card gets a unique resting glow color for inline style
  glowColor: string;
}

const TOOLS: Tool[] = [
  {
    id: "chat",
    name: "AI Chat",
    nameHi: "एआई चैट",
    tagline: "Conversational Intelligence",
    icon: <MessageCircle className="w-6 h-6" />,
    accentClass: "bg-tool-chat",
    borderClass: "border-tool-chat",
    bgClass: "bg-tool-chat/10",
    textClass: "text-tool-chat",
    shadowClass: "shadow-tool-chat",
    meshClass: "mesh-bg-chat",
    description: "Chat with AI in English or Hindi. Ask anything, get thoughtful responses instantly.",
    glowColor: "oklch(0.63 0.21 258)",
  },
  {
    id: "image",
    name: "Image Generator",
    nameHi: "छवि निर्माता",
    tagline: "Text to Visual Art",
    icon: <Image className="w-6 h-6" />,
    accentClass: "bg-tool-image",
    borderClass: "border-tool-image",
    bgClass: "bg-tool-image/10",
    textClass: "text-tool-image",
    shadowClass: "shadow-tool-image",
    meshClass: "mesh-bg-image",
    description: "Describe any image and watch AI bring your vision to life with vivid detail.",
    glowColor: "oklch(0.61 0.23 296)",
  },
  {
    id: "script",
    name: "Script Writer",
    nameHi: "स्क्रिप्ट लेखक",
    tagline: "YouTube & Video Scripts",
    icon: <Video className="w-6 h-6" />,
    accentClass: "bg-tool-script",
    borderClass: "border-tool-script",
    bgClass: "bg-tool-script/10",
    textClass: "text-tool-script",
    shadowClass: "shadow-tool-script",
    meshClass: "mesh-bg-script",
    description: "Generate full video scripts with hooks, main talking points, and CTAs.",
    glowColor: "oklch(0.66 0.19 158)",
  },
  {
    id: "logo",
    name: "Logo Maker",
    nameHi: "लोगो निर्माता",
    tagline: "Brand Identity Design",
    icon: <Palette className="w-6 h-6" />,
    accentClass: "bg-tool-logo",
    borderClass: "border-tool-logo",
    bgClass: "bg-tool-logo/10",
    textClass: "text-tool-logo",
    shadowClass: "shadow-tool-logo",
    meshClass: "mesh-bg-logo",
    description: "Create logo concepts with curated color palettes and font recommendations.",
    glowColor: "oklch(0.73 0.21 58)",
  },
  {
    id: "hashtag",
    name: "Hashtag Generator",
    nameHi: "हैशटैग जेनरेटर",
    tagline: "Boost Your Reach",
    icon: <Hash className="w-6 h-6" />,
    accentClass: "bg-tool-hashtag",
    borderClass: "border-tool-hashtag",
    bgClass: "bg-tool-hashtag/10",
    textClass: "text-tool-hashtag",
    shadowClass: "shadow-tool-hashtag",
    meshClass: "mesh-bg-hashtag",
    description: "20–30 targeted hashtags for Instagram, Twitter, YouTube, LinkedIn, and more.",
    glowColor: "oklch(0.63 0.25 338)",
  },
  {
    id: "homework",
    name: "Homework Helper",
    nameHi: "होमवर्क सहायक",
    tagline: "Step-by-Step Solutions",
    icon: <GraduationCap className="w-6 h-6" />,
    accentClass: "bg-tool-homework",
    borderClass: "border-tool-homework",
    bgClass: "bg-tool-homework/10",
    textClass: "text-tool-homework",
    shadowClass: "shadow-tool-homework",
    meshClass: "mesh-bg-homework",
    description: "Detailed explanations for Math, Science, History, English & more subjects.",
    glowColor: "oklch(0.66 0.19 198)",
  },
];

// ─── Usage Stats ──────────────────────────────────────────────────────────────
function UsageStats() {
  const { data: stats } = useUsageStats();
  if (!stats || stats.length === 0) return null;
  const total = stats.reduce((sum, [, count]) => sum + Number(count), 0);
  if (total === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
      <span className="tool-section-label mr-1">Activity</span>
      {stats
        .filter(([, count]) => Number(count) > 0)
        .map(([toolType, count]) => {
          const tool = TOOLS.find((t) => t.id === toolType);
          if (!tool) return null;
          return (
            <div
              key={toolType}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${tool.bgClass} ${tool.textClass}`}
              style={{ borderColor: `${tool.glowColor}30` }}
            >
              <span className="[&>svg]:w-3 [&>svg]:h-3">{tool.icon}</span>
              <span className="font-semibold tabular-nums">{String(count)}</span>
            </div>
          );
        })}
    </div>
  );
}

// ─── FIX 1: Tool Card — resting depth + individual glow gradient ──────────────
interface ToolCardProps {
  tool: Tool;
  onSelect: (id: ToolId) => void;
  animDelay: string;
}

function ToolCard({ tool, onSelect, animDelay }: ToolCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(tool.id)}
      className={`tool-card group relative text-left rounded-2xl border bg-card p-6 overflow-hidden w-full transition-all duration-300`}
      style={{
        animationDelay: animDelay,
        // Resting border uses a faint tool-colored tint — each card is unique
        borderColor: `${tool.glowColor}22`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `
          0 0 0 1px ${tool.glowColor}40,
          0 8px 32px oklch(0.04 0 0 / 0.7),
          0 0 60px ${tool.glowColor}18
        `;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `
          0 1px 2px oklch(0.03 0 0 / 0.9),
          0 4px 16px oklch(0.04 0 0 / 0.6),
          inset 0 1px 0 oklch(1 0 0 / 0.05)
        `;
      }}
    >
      {/* Radial glow emanating from icon corner — resting, always visible */}
      <div
        className="absolute -top-8 -left-8 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${tool.glowColor}18 0%, transparent 70%)`,
        }}
      />

      {/* Hover fill — tool-tinted wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 20% 30%, ${tool.glowColor}0d 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-110 ${tool.bgClass} ${tool.textClass}`}
          style={{ borderColor: `${tool.glowColor}28` }}
        >
          {tool.icon}
        </div>

        {/* FIX 2: Name hierarchy — bigger, bolder, display font */}
        <h3 className="font-display font-bold text-[1.1rem] leading-tight text-foreground mb-0.5">
          {tool.name}
        </h3>
        {/* Hindi label — clearly subordinate, muted */}
        <p className="text-[0.7rem] text-muted-foreground mb-3 font-normal tracking-wide">
          {tool.nameHi}
        </p>

        {/* Tagline pill */}
        <div
          className={`inline-flex items-center text-[0.68rem] font-medium px-2.5 py-0.5 rounded-full mb-4 ${tool.bgClass} ${tool.textClass}`}
          style={{ border: `1px solid ${tool.glowColor}30` }}
        >
          {tool.tagline}
        </div>

        {/* Description */}
        <p className="text-[0.8rem] text-muted-foreground leading-relaxed">
          {tool.description}
        </p>

        {/* CTA row */}
        <div
          className={`mt-5 flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-wide uppercase ${tool.textClass} opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:gap-2.5`}
        >
          Open Tool
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </button>
  );
}

// ─── FIX 2: Hero — clear size hierarchy + tight vertical rhythm ───────────────
function HeroSection() {
  return (
    <div className="relative text-center mb-14 pt-16 pb-6">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="orb-1 absolute top-6 left-[8%] w-36 h-36 rounded-full blur-3xl" style={{ background: "oklch(0.63 0.21 258 / 0.14)" }} />
        <div className="orb-2 absolute top-2 right-[12%] w-44 h-44 rounded-full blur-3xl" style={{ background: "oklch(0.61 0.23 296 / 0.11)" }} />
        <div className="orb-3 absolute bottom-0 left-[38%] w-56 h-56 rounded-full blur-3xl" style={{ background: "oklch(0.63 0.25 338 / 0.08)" }} />
        <div className="orb-4 absolute top-20 right-[32%] w-28 h-28 rounded-full blur-2xl" style={{ background: "oklch(0.66 0.19 158 / 0.16)" }} />
      </div>

      {/* Badge pill */}
      <div className="animate-slide-up inline-flex items-center gap-2 mb-8 bg-primary/[0.08] border border-primary/20 text-primary px-4 py-2 rounded-full text-[0.78rem] font-semibold tracking-wide">
        <Sparkles className="w-3.5 h-3.5 animate-pulse-glow" />
        6 AI Tools · Hindi & English
      </div>

      {/* FIX 2: Title — "Suite" is the BIG word (noun > modifier) */}
      <h1 className="animate-slide-up delay-100 font-display leading-[0.9] mb-5">
        {/* Modifier — medium size, shimmer */}
        <span className="block shimmer-text font-extrabold text-4xl md:text-5xl mb-1 tracking-tight">
          AI Tools
        </span>
        {/* Noun — dominant, massive, plain foreground */}
        <span className="block text-foreground font-black text-6xl md:text-8xl tracking-tighter">
          Suite
        </span>
      </h1>

      {/* Hindi subtitle */}
      <p className="animate-slide-up delay-200 text-muted-foreground text-base mb-3 font-medium">
        आपका AI पावर्ड सुपर टूलकिट
      </p>

      {/* Descriptor */}
      <p className="animate-slide-up delay-300 text-muted-foreground/80 max-w-md mx-auto text-[0.875rem] leading-relaxed">
        Chat · Images · Scripts · Logos · Hashtags · Homework — all in one place.
      </p>
    </div>
  );
}

// ─── FIX 3: Tool Page — per-tool ambient background ──────────────────────────
interface ToolPageProps {
  tool: Tool;
  onBack: () => void;
}

function ToolPage({ tool, onBack }: ToolPageProps) {
  const ToolComponents: Record<ToolId, React.ComponentType> = {
    chat: ChatTool,
    image: ImageTool,
    script: ScriptTool,
    logo: LogoTool,
    hashtag: HashtagTool,
    homework: HomeworkTool,
  };

  const ToolComponent = ToolComponents[tool.id];

  return (
    // FIX 3: Use tool-specific mesh background
    <div className={`min-h-screen ${tool.meshClass}`}>
      {/* Sticky header with glassmorphism */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-4">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="w-px h-5 bg-border shrink-0" />

          {/* Tool identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-8 h-8 rounded-lg shrink-0 border flex items-center justify-center ${tool.bgClass} ${tool.textClass}`}
              style={{ borderColor: `${tool.glowColor}30` }}
            >
              <span className="[&>svg]:w-4 [&>svg]:h-4">{tool.icon}</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-display font-bold text-[0.95rem] text-foreground leading-none truncate">
                {tool.name}
              </h1>
              <p className="text-[0.65rem] text-muted-foreground truncate mt-0.5">{tool.nameHi}</p>
            </div>
          </div>

          {/* Tagline badge — right-aligned */}
          <div className="ml-auto shrink-0">
            <span
              className={`hidden sm:inline-flex items-center text-[0.65rem] font-semibold px-2.5 py-1 rounded-full tracking-wide ${tool.bgClass} ${tool.textClass}`}
              style={{ border: `1px solid ${tool.glowColor}28` }}
            >
              {tool.tagline}
            </span>
          </div>
        </div>

        {/* FIX 3: Thin colored underline on header — ties the page color to the tool */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${tool.glowColor} 40%, ${tool.glowColor} 60%, transparent 100%)`,
            opacity: 0.5,
          }}
        />
      </header>

      {/* Tool content — card wrapper for depth */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* FIX 2: Section heading with accent underline */}
        <div className="animate-slide-up mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="tool-section-label">Tool</span>
            <div className="flex-1 h-px bg-border/60" />
          </div>
          <h2 className="font-display font-black text-2xl md:text-3xl text-foreground leading-tight">
            {tool.name}
          </h2>
          {/* Accent underline — tool-colored, short */}
          <div
            className="h-[3px] w-12 rounded-full mt-2 mb-6"
            style={{
              background: `linear-gradient(90deg, ${tool.glowColor}, ${tool.glowColor}60)`,
              animation: "underline-grow 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Tool component card */}
        <div
          className="animate-slide-up delay-100 rounded-2xl border bg-card/80 backdrop-blur-sm p-5 sm:p-7"
          style={{
            borderColor: `${tool.glowColor}18`,
            boxShadow: `0 2px 24px oklch(0.04 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.04)`,
          }}
        >
          <ToolComponent />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-8">
        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          © 2026. Built with{" "}
          <Heart className="w-3 h-3 text-tool-hashtag fill-current" />{" "}
          using{" "}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ onSelectTool }: { onSelectTool: (id: ToolId) => void }) {
  return (
    <div className="min-h-screen mesh-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <HeroSection />
        <UsageStats />

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {TOOLS.map((tool, idx) => (
            <div
              key={tool.id}
              className="animate-card-enter"
              style={{ animationDelay: `${0.08 + idx * 0.07}s` }}
            >
              <ToolCard tool={tool} onSelect={onSelectTool} animDelay={`${0.08 + idx * 0.07}s`} />
            </div>
          ))}
        </div>

        {/* Features bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14 animate-fade-in delay-700">
          {[
            { icon: "⚡", title: "Instant Results", desc: "AI-powered outputs in seconds" },
            { icon: "🌐", title: "Hindi + English", desc: "Full bilingual support in every tool" },
            { icon: "💾", title: "Auto-Saved", desc: "All generations saved to your history" },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 text-center"
              style={{ boxShadow: "0 1px 8px oklch(0.04 0 0 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.04)" }}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-1 text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-7">
        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          © 2026. Built with{" "}
          <Heart className="w-3 h-3 text-tool-hashtag fill-current" />{" "}
          using{" "}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const activeToolDef = activeTool ? TOOLS.find((t) => t.id === activeTool) ?? null : null;

  return (
    <>
      <Toaster richColors position="top-right" />
      {activeToolDef ? (
        <ToolPage tool={activeToolDef} onBack={() => setActiveTool(null)} />
      ) : (
        <HomePage onSelectTool={setActiveTool} />
      )}
    </>
  );
}
