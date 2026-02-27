import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Palette, Copy, Check, Sparkles } from "lucide-react";
import { generateLogoConcept } from "@/utils/aiGenerators";
import type { LogoConcept } from "@/utils/aiGenerators";
import { useSaveHistory } from "@/hooks/useQueries";
import { toast } from "sonner";

const STYLES = ["Modern", "Minimal", "Bold", "Playful", "Professional"] as const;
type Style = (typeof STYLES)[number];

const STYLE_DESCRIPTIONS: Record<Style, string> = {
  Modern: "Clean, forward-thinking",
  Minimal: "Less is more",
  Bold: "Maximum impact",
  Playful: "Fun & friendly",
  Professional: "Trust & authority",
};

const FONT_WEIGHTS: Record<Style, string> = {
  Modern: "600",
  Minimal: "300",
  Bold: "900",
  Playful: "700",
  Professional: "500",
};

const LETTER_SPACINGS: Record<Style, string> = {
  Modern: "0.05em",
  Minimal: "0.15em",
  Bold: "-0.02em",
  Playful: "0.03em",
  Professional: "0.1em",
};

export function LogoTool() {
  const [brandName, setBrandName] = useState("");
  const [style, setStyle] = useState<Style>("Modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const [concept, setConcept] = useState<LogoConcept | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const saveHistory = useSaveHistory();

  const handleGenerate = async () => {
    const name = brandName.trim();
    if (!name || isGenerating) return;

    setIsGenerating(true);
    await new Promise((res) => setTimeout(res, 1800));

    const result = generateLogoConcept(name, style);
    setConcept(result);
    setIsGenerating(false);

    const output = `Logo concept for "${name}" — Style: ${style}, Colors: ${result.colors.map((c) => c.hex).join(", ")}`;
    saveHistory.mutate({ toolType: "logo", input: `${name} [${style}]`, output });
  };

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    toast.success(`Copied ${hex}!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const currentStyle = style as Style;

  return (
    <div className="space-y-6">
      {/* Input section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand-name" className="tool-section-label">
            Brand Name
          </Label>
          <Input
            id="brand-name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g., NexaFlow, Bloom, Zephyr..."
            className="bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-tool-logo/60 h-11"
            disabled={isGenerating}
          />
        </div>

        <div className="space-y-2">
          <Label className="tool-section-label">Style</Label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setStyle(s)}
                title={STYLE_DESCRIPTIONS[s]}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  style === s
                    ? "bg-tool-logo text-white shadow-md"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!brandName.trim() || isGenerating}
        className="w-full h-11 rounded-xl gap-2 bg-tool-logo hover:bg-tool-logo/80 text-white font-medium"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Designing Logo...
          </>
        ) : (
          <>
            <Palette className="w-4 h-4" />
            Generate Logo Concept
          </>
        )}
      </Button>

      {/* Generated Result */}
      {concept && !isGenerating && (
        <div className="space-y-5 animate-card-enter">
          {/* Logo Preview */}
          <div
            className="rounded-2xl border p-8 text-center space-y-3"
            style={{
              background: `linear-gradient(145deg, ${concept.colors[0].hex}18, ${concept.colors[1]?.hex || concept.colors[0].hex}0c)`,
              borderColor: `${concept.colors[0].hex}35`,
              boxShadow: `0 4px 32px ${concept.colors[0].hex}14, inset 0 1px 0 oklch(1 0 0 / 0.06)`,
            }}
          >
            <div className="flex items-center justify-center gap-1 mb-2">
              <Sparkles className="w-3 h-3 text-tool-logo" />
              <span className="text-xs text-tool-logo font-medium uppercase tracking-widest">
                Logo Preview
              </span>
            </div>

            {/* Stylized brand name */}
            <div
              className="text-4xl md:text-5xl tracking-tight"
              style={{
                color: concept.colors[0].hex,
                fontWeight: FONT_WEIGHTS[currentStyle],
                letterSpacing: LETTER_SPACINGS[currentStyle],
                fontFamily: currentStyle === "Minimal" ? "'Outfit', sans-serif" : "'Space Grotesk', sans-serif",
              }}
            >
              {currentStyle === "Minimal"
                ? concept.brandName.toUpperCase()
                : currentStyle === "Bold"
                ? concept.brandName.toUpperCase()
                : concept.brandName}
            </div>

            {/* Tagline */}
            <p
              className="text-sm"
              style={{ color: concept.colors[1]?.hex || "#888" }}
            >
              {concept.tagline}
            </p>

            {/* Style badge */}
            <span
              className="inline-block text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: `${concept.colors[0].hex}40`,
                color: concept.colors[0].hex,
                background: `${concept.colors[0].hex}10`,
              }}
            >
              {concept.style} Style
            </span>
          </div>

          {/* Color palette */}
          <div className="space-y-2">
            <p className="tool-section-label flex items-center gap-2">
              <Palette className="w-3 h-3" />
              Color Palette
            </p>
            <div className="grid grid-cols-3 gap-3">
              {concept.colors.map((color) => (
                <button
                  type="button"
                  key={color.hex}
                  onClick={() => copyHex(color.hex)}
                  className="group flex flex-col items-center gap-2.5 p-3.5 rounded-xl border border-border/50 hover:border-tool-logo/30 transition-all bg-secondary/40 hover:bg-secondary/70"
                  style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: `0 4px 12px ${color.hex}50`,
                    }}
                  />
                  <div className="text-center">
                    <p className="text-xs font-semibold">{color.name}</p>
                    <p className="text-[0.68rem] text-muted-foreground font-mono flex items-center gap-1 justify-center mt-0.5">
                      {color.hex}
                      {copiedHex === color.hex ? (
                        <Check className="w-3 h-3 text-tool-logo" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </p>
                    <p className="text-[0.65rem] text-muted-foreground/50 mt-0.5">{color.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary/40 rounded-xl p-4 border border-border/50" style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04)" }}>
              <p className="tool-section-label mb-2">Recommended Font</p>
              <p className="text-sm font-medium">{concept.font}</p>
            </div>
            <div className="bg-secondary/40 rounded-xl p-4 border border-border/50" style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04)" }}>
              <p className="tool-section-label mb-2">Icon Concept</p>
              <p className="text-sm font-medium">{concept.iconSuggestion}</p>
            </div>
          </div>

          <div className="bg-secondary/40 rounded-xl p-4 border border-border/50" style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04)" }}>
            <p className="tool-section-label mb-2">Concept Description</p>
            <p className="text-[0.84rem] text-foreground/90 leading-relaxed">{concept.concept}</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {isGenerating && (
        <div className="border border-border rounded-2xl p-10 text-center animate-fade-in bg-secondary/30">
          <Loader2 className="w-10 h-10 text-tool-logo animate-spin mx-auto mb-4" />
          <p className="text-foreground font-medium">Designing your brand identity...</p>
          <p className="text-muted-foreground text-sm mt-1">Selecting colors, fonts & concepts</p>
        </div>
      )}

      {/* Empty state */}
      {!concept && !isGenerating && (
        <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-tool-logo/10 flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-tool-logo/60" />
          </div>
          <p className="text-muted-foreground text-sm">Your logo concept will appear here</p>
          <p className="text-muted-foreground/60 text-xs mt-1">Enter a brand name and select a style</p>
        </div>
      )}
    </div>
  );
}
