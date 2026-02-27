import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Hash, Copy, Check, TrendingUp, Star, Tag, AlignLeft } from "lucide-react";
import { generateHashtags } from "@/utils/aiGenerators";
import type { HashtagSet } from "@/utils/aiGenerators";
import { useSaveHistory } from "@/hooks/useQueries";
import { toast } from "sonner";

const PLATFORMS = ["Instagram", "Twitter/X", "YouTube", "LinkedIn", "General"] as const;
type Platform = (typeof PLATFORMS)[number];

const PLATFORM_ICONS: Record<Platform, string> = {
  Instagram: "📸",
  "Twitter/X": "𝕏",
  YouTube: "▶",
  LinkedIn: "in",
  General: "🌐",
};

interface HashtagGroupProps {
  title: string;
  icon: React.ReactNode;
  tags: string[];
  accentClass: string;
  onCopy: (tags: string[]) => void;
}

function HashtagGroup({ title, icon, tags, accentClass, onCopy }: HashtagGroupProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    onCopy(tags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-secondary/40 rounded-xl p-4 border border-border/50 space-y-3" style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-muted-foreground">({tags.length})</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => {
              navigator.clipboard.writeText(tag);
              toast.success(`Copied ${tag}`);
            }}
            className={`text-xs px-2 py-1 rounded-full border transition-all hover:scale-105 ${accentClass}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HashtagTool() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hashtagSet, setHashtagSet] = useState<HashtagSet | null>(null);
  const [allCopied, setAllCopied] = useState(false);
  const saveHistory = useSaveHistory();

  const handleGenerate = async () => {
    const text = topic.trim();
    if (!text || isGenerating) return;

    setIsGenerating(true);
    await new Promise((res) => setTimeout(res, 1200));

    const result = generateHashtags(text, platform);
    setHashtagSet(result);
    setIsGenerating(false);

    const allTags = [...result.popular, ...result.niche, ...result.trending, ...result.longTail];
    saveHistory.mutate({
      toolType: "hashtag",
      input: `${text} [${platform}]`,
      output: allTags.join(" "),
    });
  };

  const copyGroup = async (tags: string[]) => {
    await navigator.clipboard.writeText(tags.join(" "));
    toast.success(`Copied ${tags.length} hashtags!`);
  };

  const copyAll = async () => {
    if (!hashtagSet) return;
    const all = [
      ...hashtagSet.popular,
      ...hashtagSet.niche,
      ...hashtagSet.trending,
      ...hashtagSet.longTail,
    ];
    await navigator.clipboard.writeText(all.join(" "));
    setAllCopied(true);
    toast.success(`Copied all ${all.length} hashtags!`);
    setTimeout(() => setAllCopied(false), 2500);
  };

  const totalCount = hashtagSet
    ? hashtagSet.popular.length + hashtagSet.niche.length + hashtagSet.trending.length + hashtagSet.longTail.length
    : 0;

  return (
    <div className="space-y-5">
      {/* Input section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hashtag-topic" className="tool-section-label">
            Topic / Caption / Keyword
          </Label>
          <Input
            id="hashtag-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g., travel photography, morning yoga..."
            className="bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-tool-hashtag/60 h-11"
            disabled={isGenerating}
          />
        </div>

        <div className="space-y-2">
          <Label className="tool-section-label">Platform</Label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  platform === p
                    ? "bg-tool-hashtag text-white shadow-md"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <span className="text-xs">{PLATFORM_ICONS[p]}</span>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!topic.trim() || isGenerating}
        className="w-full h-11 rounded-xl gap-2 bg-tool-hashtag hover:bg-tool-hashtag/80 text-white font-medium"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating Hashtags...
          </>
        ) : (
          <>
            <Hash className="w-4 h-4" />
            Generate Hashtags
          </>
        )}
      </Button>

      {/* Results */}
      {hashtagSet && !isGenerating && (
        <div className="space-y-4 animate-card-enter">
          {/* Stats bar */}
          <div className="flex items-center justify-between bg-secondary/50 rounded-xl p-3 border border-border">
            <div className="flex items-center gap-3">
              <Hash className="w-4 h-4 text-tool-hashtag" />
              <span className="text-sm font-medium">{totalCount} hashtags generated</span>
              <span className="text-xs bg-tool-hashtag/10 text-tool-hashtag border border-tool-hashtag/20 px-2 py-0.5 rounded-full">
                {platform}
              </span>
            </div>
            <Button
              size="sm"
              onClick={copyAll}
              className="h-8 gap-1.5 bg-tool-hashtag hover:bg-tool-hashtag/80 text-white rounded-lg"
            >
              {allCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {allCopied ? "Copied All!" : "Copy All"}
            </Button>
          </div>

          <HashtagGroup
            title="Popular"
            icon={<Star className="w-4 h-4 text-yellow-400" />}
            tags={hashtagSet.popular}
            accentClass="bg-yellow-400/10 text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/20"
            onCopy={copyGroup}
          />
          <HashtagGroup
            title="Niche"
            icon={<Hash className="w-4 h-4 text-tool-hashtag" />}
            tags={hashtagSet.niche}
            accentClass="bg-tool-hashtag/10 text-tool-hashtag border-tool-hashtag/20 hover:bg-tool-hashtag/20"
            onCopy={copyGroup}
          />
          <HashtagGroup
            title="Trending"
            icon={<TrendingUp className="w-4 h-4 text-tool-script" />}
            tags={hashtagSet.trending}
            accentClass="bg-tool-script/10 text-tool-script border-tool-script/20 hover:bg-tool-script/20"
            onCopy={copyGroup}
          />
          <HashtagGroup
            title="Long-tail"
            icon={<AlignLeft className="w-4 h-4 text-tool-homework" />}
            tags={hashtagSet.longTail}
            accentClass="bg-tool-homework/10 text-tool-homework border-tool-homework/20 hover:bg-tool-homework/20"
            onCopy={copyGroup}
          />
        </div>
      )}

      {/* Loading */}
      {isGenerating && (
        <div className="border border-border rounded-2xl p-10 text-center animate-fade-in bg-secondary/30">
          <Loader2 className="w-10 h-10 text-tool-hashtag animate-spin mx-auto mb-4" />
          <p className="text-foreground font-medium">Analyzing trends...</p>
          <p className="text-muted-foreground text-sm mt-1">Finding the best hashtags for {platform}</p>
        </div>
      )}

      {/* Empty state */}
      {!hashtagSet && !isGenerating && (
        <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-tool-hashtag/10 flex items-center justify-center mx-auto mb-4">
            <Hash className="w-8 h-8 text-tool-hashtag/60" />
          </div>
          <p className="text-muted-foreground text-sm">Your hashtag sets will appear here</p>
          <p className="text-muted-foreground/60 text-xs mt-1">Grouped by popularity and reach</p>
        </div>
      )}
    </div>
  );
}
