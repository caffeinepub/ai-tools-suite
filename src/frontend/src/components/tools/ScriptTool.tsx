import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clapperboard, Copy, Check, Loader2, FileText } from "lucide-react";
import { generateVideoScript } from "@/utils/aiGenerators";
import { useSaveHistory } from "@/hooks/useQueries";
import { toast } from "sonner";

const DURATIONS = ["1 min", "3 min", "5 min", "10 min"];

export function ScriptTool() {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("3 min");
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const saveHistory = useSaveHistory();

  const handleGenerate = async () => {
    const text = topic.trim();
    if (!text || isGenerating) return;

    setIsGenerating(true);
    await new Promise((res) => setTimeout(res, 1500));

    const result = generateVideoScript(text, duration);
    setScript(result);
    setIsGenerating(false);

    saveHistory.mutate({ toolType: "script", input: `${text} [${duration}]`, output: result });
  };

  const handleCopy = async () => {
    if (!script) return;
    await navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Input section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="script-topic" className="tool-section-label">
            Video Topic / Title
          </Label>
          <Input
            id="script-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g., How to Build a Successful YouTube Channel..."
            className="bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-tool-script/60 h-11"
            disabled={isGenerating}
          />
        </div>

        <div className="space-y-2">
          <Label className="tool-section-label">Video Duration</Label>
          <div className="flex gap-2 flex-wrap">
            {DURATIONS.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  duration === d
                    ? "bg-tool-script text-white shadow-md"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="w-full h-11 rounded-xl gap-2 bg-tool-script hover:bg-tool-script/80 text-white font-medium"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Writing Script...
            </>
          ) : (
            <>
              <Clapperboard className="w-4 h-4" />
              Generate Script
            </>
          )}
        </Button>
      </div>

      {/* Output */}
      {script && !isGenerating && (
        <div className="flex-1 space-y-3 animate-card-enter">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-tool-script" />
              <span className="text-sm font-medium">Generated Script</span>
              <span className="text-xs bg-tool-script/10 text-tool-script border border-tool-script/20 px-2 py-0.5 rounded-full">
                {duration}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2 border-tool-script/30 text-tool-script hover:bg-tool-script/10 h-8"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy All"}
            </Button>
          </div>

          <ScrollArea className="h-[400px] rounded-xl border border-border/60 bg-secondary/40 backdrop-blur-sm" style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.03)" }}>
            <pre className="p-5 text-[0.82rem] text-foreground/90 whitespace-pre-wrap font-mono-code leading-relaxed">
              {script}
            </pre>
          </ScrollArea>
        </div>
      )}

      {/* Empty state */}
      {!script && !isGenerating && (
        <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-tool-script/10 flex items-center justify-center mx-auto mb-4">
            <Clapperboard className="w-8 h-8 text-tool-script/60" />
          </div>
          <p className="text-muted-foreground text-sm">Your script will appear here</p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Enter a topic and select duration
          </p>
        </div>
      )}

      {/* Loading state */}
      {isGenerating && (
        <div className="flex-1 border border-border rounded-2xl p-10 text-center flex flex-col items-center justify-center animate-fade-in bg-secondary/30">
          <Loader2 className="w-10 h-10 text-tool-script animate-spin mb-4" />
          <p className="text-foreground font-medium">Writing your {duration} script...</p>
          <p className="text-muted-foreground text-sm mt-1">Crafting hooks, main points & CTAs</p>
        </div>
      )}
    </div>
  );
}
