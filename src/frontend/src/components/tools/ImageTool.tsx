import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Download, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { useSaveHistory } from "@/hooks/useQueries";
import { toast } from "sonner";

interface GeneratedImage {
  prompt: string;
  gradient: string;
  style: string;
  timestamp: Date;
}

const GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
];

const STYLES = [
  "Photorealistic", "Digital Art", "Oil Painting", "Watercolor",
  "Concept Art", "Anime Style", "3D Render", "Sketch",
];

function getGradientForPrompt(prompt: string): string {
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) {
    hash = ((hash << 5) - hash) + prompt.charCodeAt(i);
    hash |= 0;
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function getStyleForPrompt(prompt: string): string {
  const p = prompt.toLowerCase();
  if (/photo|real|picture|portrait|landscape/i.test(p)) return "Photorealistic";
  if (/anime|manga|cartoon|kawaii/i.test(p)) return "Anime Style";
  if (/paint|oil|watercolor|brush/i.test(p)) return "Oil Painting";
  if (/3d|render|cg|digital/i.test(p)) return "3D Render";
  if (/sketch|draw|pencil|line/i.test(p)) return "Sketch";
  return STYLES[Math.floor(Math.random() * STYLES.length)];
}

export function ImageTool() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedImage | null>(null);
  const [progress, setProgress] = useState(0);
  const saveHistory = useSaveHistory();

  const handleGenerate = async () => {
    const text = prompt.trim();
    if (!text || isGenerating) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 95));
    }, 200);

    await new Promise((res) => setTimeout(res, 2000));
    clearInterval(interval);
    setProgress(100);

    await new Promise((res) => setTimeout(res, 200));

    const result: GeneratedImage = {
      prompt: text,
      gradient: getGradientForPrompt(text),
      style: getStyleForPrompt(text),
      timestamp: new Date(),
    };

    setGenerated(result);
    setIsGenerating(false);

    const output = `Image generated: "${text}" — Style: ${result.style}`;
    saveHistory.mutate({ toolType: "image", input: text, output });
  };

  const handleDownload = () => {
    toast.success("Image download started!", {
      description: "Your image is being prepared for download.",
    });
  };

  const handleRegenerate = () => {
    if (generated) {
      setPrompt(generated.prompt);
      setGenerated(null);
      setTimeout(() => handleGenerate(), 100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input section */}
      <div className="space-y-3">
        <label htmlFor="image-prompt" className="tool-section-label flex items-center gap-2">
          Describe your image
          <span className="text-muted-foreground/50 font-normal normal-case tracking-normal text-[0.7rem]">/ अपनी छवि का वर्णन करें</span>
        </label>
        <Textarea
          id="image-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A mystical forest at twilight with glowing mushrooms, ultra-detailed, cinematic lighting..."
          className="min-h-[120px] resize-none bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-tool-image/60 rounded-xl text-sm"
          disabled={isGenerating}
        />
        <div className="flex gap-3">
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="flex-1 bg-tool-image hover:bg-tool-image/80 text-white h-11 rounded-xl gap-2 font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Image
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      {isGenerating && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex justify-between">
            <span className="tool-section-label">Processing your prompt...</span>
            <span className="tool-section-label tabular-nums">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-secondary/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-tool-image rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, boxShadow: "0 0 8px oklch(0.61 0.23 296 / 0.6)" }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            ✨ AI is creating your masterpiece...
          </p>
        </div>
      )}

      {/* Generated Result */}
      {generated && !isGenerating && (
        <div className="animate-card-enter space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-tool-image" />
              <span className="text-sm font-medium">Generated Image</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {generated.timestamp.toLocaleTimeString()}
            </span>
          </div>

          {/* Image preview */}
          <div className="relative rounded-2xl overflow-hidden border border-border">
            <div
              className="w-full aspect-video flex items-end p-4"
              style={{ background: generated.gradient }}
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 w-full">
                <p className="text-white text-sm font-medium leading-snug">
                  {generated.prompt}
                </p>
                <p className="text-white/60 text-xs mt-1">Style: {generated.style}</p>
              </div>
            </div>

            {/* Overlay badge */}
            <div className="absolute top-3 right-3">
              <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                AI Generated
              </span>
            </div>
          </div>

          {/* Style chips */}
          <div className="flex flex-wrap gap-2">
            {["High Quality", "1024×1024", generated.style, "AI Art"].map((tag) => (
              <span
                key={tag}
                className="text-xs bg-tool-image/10 text-tool-image border border-tool-image/20 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleDownload}
              className="flex-1 h-10 rounded-xl gap-2 bg-tool-image hover:bg-tool-image/80 text-white"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={handleRegenerate}
              className="h-10 rounded-xl gap-2 border-tool-image/30 text-tool-image hover:bg-tool-image/10"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Note: This is a simulated preview. Real image generation requires an AI model API.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!generated && !isGenerating && (
        <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-tool-image/10 flex items-center justify-center mx-auto mb-4">
            <Wand2 className="w-8 h-8 text-tool-image/60" />
          </div>
          <p className="text-muted-foreground text-sm">
            Your generated image will appear here
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Enter a description and click Generate
          </p>
        </div>
      )}
    </div>
  );
}
