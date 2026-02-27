import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, GraduationCap, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { generateHomeworkSolution } from "@/utils/aiGenerators";
import type { HomeworkSolution } from "@/utils/aiGenerators";
import { useSaveHistory } from "@/hooks/useQueries";

const SUBJECTS = ["Math", "Science", "History", "English", "General"] as const;
type Subject = (typeof SUBJECTS)[number];

const SUBJECT_ICONS: Record<Subject, string> = {
  Math: "📐",
  Science: "🔬",
  History: "🏛️",
  English: "📝",
  General: "💡",
};

const SUBJECT_COLORS: Record<Subject, string> = {
  Math: "text-blue-400",
  Science: "text-green-400",
  History: "text-amber-400",
  English: "text-purple-400",
  General: "text-tool-homework",
};

interface StepCardProps {
  step: { title: string; content: string };
  index: number;
}

function StepCard({ step, index }: StepCardProps) {
  return (
    <div
      className="flex gap-4 animate-card-enter"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="shrink-0">
        <div className="w-8 h-8 rounded-full bg-tool-homework/20 border border-tool-homework/30 flex items-center justify-center text-tool-homework text-sm font-bold">
          {index + 1}
        </div>
        {index < 4 && (
          <div className="w-px h-6 bg-tool-homework/20 mx-auto mt-1" />
        )}
      </div>
      <div className="flex-1 pb-4">
        <h4 className="text-sm font-semibold mb-2 text-foreground">{step.title}</h4>
        <div
          className="bg-secondary/40 rounded-xl p-4 border border-border/50"
          style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04)" }}
        >
          <p className="text-[0.82rem] text-foreground/90 whitespace-pre-wrap leading-relaxed font-mono-code">
            {step.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HomeworkTool() {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState<Subject>("General");
  const [isGenerating, setIsGenerating] = useState(false);
  const [solution, setSolution] = useState<HomeworkSolution | null>(null);
  const [showExtra, setShowExtra] = useState(false);
  const saveHistory = useSaveHistory();

  const handleSolve = async () => {
    const text = question.trim();
    if (!text || isGenerating) return;

    setIsGenerating(true);
    setShowExtra(false);
    await new Promise((res) => setTimeout(res, 1600));

    const result = generateHomeworkSolution(text, subject);
    setSolution(result);
    setIsGenerating(false);

    saveHistory.mutate({
      toolType: "homework",
      input: `[${subject}] ${text}`,
      output: result.summary,
    });
  };

  return (
    <div className="space-y-5">
      {/* Input section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="tool-section-label">Subject</Label>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSubject(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  subject === s
                    ? "bg-tool-homework text-white shadow-md"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <span>{SUBJECT_ICONS[s]}</span>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="homework-question" className="tool-section-label flex items-center gap-2">
            Your Question or Problem
            <span className="text-muted-foreground/50 font-normal normal-case tracking-normal text-[0.7rem]">/ अपना प्रश्न लिखें</span>
          </Label>
          <Textarea
            id="homework-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Enter your ${subject.toLowerCase()} question here...\ne.g., "Explain the causes of World War I" or "Solve: 2x + 5 = 15"`}
            className="min-h-[100px] resize-none bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-tool-homework/60 rounded-xl text-sm"
            disabled={isGenerating}
          />
        </div>

        <Button
          onClick={handleSolve}
          disabled={!question.trim() || isGenerating}
          className="w-full h-11 rounded-xl gap-2 bg-tool-homework hover:bg-tool-homework/80 text-white font-medium"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Solving...
            </>
          ) : (
            <>
              <GraduationCap className="w-4 h-4" />
              Get Step-by-Step Solution
            </>
          )}
        </Button>
      </div>

      {/* Solution */}
      {solution && !isGenerating && (
        <div className="space-y-5 animate-card-enter">
          {/* Summary */}
          <div className="bg-tool-homework/10 rounded-xl p-4 border border-tool-homework/20">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-tool-homework" />
              <span className="text-sm font-semibold text-tool-homework">Quick Summary</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{solution.summary}</p>
          </div>

          {/* Key Terms */}
          <div>
            <p className="tool-section-label mb-2">Key Terms</p>
            <div className="flex flex-wrap gap-2">
              {solution.keyTerms.map((term) => (
                <span
                  key={term}
                  className="text-xs bg-secondary border border-border text-foreground px-2 py-1 rounded-full"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <p className="tool-section-label mb-3">
              Step-by-Step Solution
            </p>
            <div className="space-y-1">
              {solution.steps.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} />
              ))}
            </div>
          </div>

          {/* Extra detail toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowExtra((v) => !v)}
              className="w-full flex items-center justify-between p-4 bg-secondary/50 rounded-xl border border-border hover:bg-secondary transition-all text-sm font-medium"
            >
              <div className="flex items-center gap-2">
                <span className={`text-sm ${SUBJECT_COLORS[subject]}`}>
                  {SUBJECT_ICONS[subject]}
                </span>
                Show More Detail
              </div>
              {showExtra ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {showExtra && (
              <div className="mt-2 bg-secondary/30 rounded-xl border border-border p-4 animate-slide-up">
                <pre className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed font-mono-code">
                  {solution.extraDetail}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading */}
      {isGenerating && (
        <div className="border border-border rounded-2xl p-10 text-center animate-fade-in bg-secondary/30">
          <Loader2 className="w-10 h-10 text-tool-homework animate-spin mx-auto mb-4" />
          <p className="text-foreground font-medium">Analyzing your {subject} problem...</p>
          <p className="text-muted-foreground text-sm mt-1">Building step-by-step solution</p>
        </div>
      )}

      {/* Empty state */}
      {!solution && !isGenerating && (
        <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-tool-homework/10 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-tool-homework/60" />
          </div>
          <p className="text-muted-foreground text-sm">Step-by-step solution will appear here</p>
          <p className="text-muted-foreground/60 text-xs mt-1">Ask any question in {subject}</p>
        </div>
      )}
    </div>
  );
}
