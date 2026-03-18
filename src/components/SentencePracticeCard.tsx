import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Eye,
  Lightbulb,
  Loader2,
  MessageSquareText,
  XCircle,
  HelpCircle,
} from "lucide-react";
import {
  PracticeSentence,
  explainError,
  getHint,
  translateWord,
  EvaluationResult,
} from "../services/gemini";

export interface SentencePracticeCardProps {
  sentence: PracticeSentence;
  index: number;
  context: string;
  key?: string | number;
}

export function SentencePracticeCard({
  sentence,
  index,
  context,
}: SentencePracticeCardProps) {
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<
    "idle" | "evaluating" | "evaluated" | "revealed"
  >("idle");
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);

  const [translatedWord, setTranslatedWord] = useState<{
    word: string;
    translation: string;
  } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const handleWordClick = async (word: string) => {
    const cleanWord = word.replace(/[.,?!()]/g, "");
    if (!cleanWord) return;

    setIsTranslating(true);
    setTranslatedWord({ word: cleanWord, translation: "..." });
    const translation = await translateWord(cleanWord, sentence.polish);
    setTranslatedWord({ word: cleanWord, translation });
    setIsTranslating(false);
  };

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[.,?!]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleCheck = () => {
    if (!userInput.trim()) return;

    setStatus("evaluating");

    // Local checking logic
    const normalizedInput = normalizeText(userInput);
    const acceptable = sentence.acceptableTranslations || [sentence.english];

    const isCorrect = acceptable.some(
      (t) => normalizeText(t) === normalizedInput,
    );

    setTimeout(() => {
      if (isCorrect) {
        setEvaluation({
          isCorrect: true,
          feedback: "Świetnie! Twoje tłumaczenie jest poprawne.",
        });
      } else {
        setEvaluation({
          isCorrect: false,
          feedback:
            "Niestety, to nie jest poprawne tłumaczenie. Spróbuj jeszcze raz lub sprawdź odpowiedź.",
        });
      }
      setAiExplanation(null);
      setStatus("evaluated");
    }, 300); // Tiny delay for UX
  };

  const handleExplainError = async () => {
    if (!userInput.trim() || !evaluation || evaluation.isCorrect) return;

    setIsExplaining(true);
    const explanation = await explainError(
      sentence.polish,
      sentence.english,
      userInput,
    );
    setAiExplanation(explanation);
    setIsExplaining(false);
  };

  const handleGetHint = async () => {
    if (hint) return;
    setIsHintLoading(true);
    const newHint = await getHint(sentence.polish, context);
    setHint(newHint);
    setIsHintLoading(false);
  };

  const handleReveal = () => {
    setStatus("revealed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-xl border bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-white/50 dark:border-slate-800/50 shadow-[0_4px_24px_0_rgba(31,38,135,0.02)] transition-colors"
    >
      <div className="mb-4">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 block">
          Zdanie {index + 1}
        </span>
        <p className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
          {sentence.polish.split(" ").map((word, i) => (
            <span key={i}>
              <span
                onClick={() => handleWordClick(word)}
                className="cursor-pointer border-b border-dotted border-slate-400 dark:border-slate-600 hover:bg-indigo-50/80 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                title="Kliknij, aby przetłumaczyć"
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5" />
          Kliknij na dowolne słowo, którego nie znasz, aby zobaczyć tłumaczenie.
        </p>

        {/* Word Translation Box */}
        {translatedWord && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 inline-flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-sm border border-slate-200/50 dark:border-slate-700/50"
          >
            <span className="font-medium">{translatedWord.word}</span>
            <span className="text-slate-400 dark:text-slate-500">→</span>
            {isTranslating ? (
              <Loader2 className="w-3 h-3 animate-spin text-indigo-500" />
            ) : (
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {translatedWord.translation}
              </span>
            )}
            <button
              onClick={() => setTranslatedWord(null)}
              className="ml-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              ×
            </button>
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        <textarea
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            if (status === "evaluated") setStatus("idle");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCheck();
            }
          }}
          disabled={status === "revealed" || status === "evaluating"}
          placeholder="Wpisz swoje tłumaczenie po angielsku..."
          className="w-full p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all resize-none h-20 disabled:bg-slate-50/50 dark:disabled:bg-slate-800/50 disabled:text-slate-500 dark:disabled:text-slate-400"
        />

        {/* Actions Row */}
        {status !== "revealed" && (
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button
              onClick={handleGetHint}
              disabled={isHintLoading || hint !== null}
              className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium hover:text-amber-700 dark:hover:text-amber-400 transition-colors text-sm disabled:opacity-50"
            >
              {isHintLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Lightbulb className="w-4 h-4" />
              )}
              Podpowiedź
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleReveal}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                Pokaż odpowiedź
              </button>

              <button
                onClick={handleCheck}
                disabled={!userInput.trim() || status === "evaluating"}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm disabled:opacity-50 disabled:hover:bg-indigo-600 shadow-md"
              >
                {status === "evaluating" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MessageSquareText className="w-4 h-4" />
                )}
                Sprawdź
              </button>
            </div>
          </div>
        )}

        {/* Hint Box */}
        {hint && status !== "revealed" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm border border-amber-100/50 dark:border-amber-800/50 p-3 rounded-lg flex gap-3 items-start text-sm"
          >
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-amber-900 dark:text-amber-400">{hint}</p>
          </motion.div>
        )}

        {/* Evaluation Box */}
        {status === "evaluated" && evaluation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`p-4 rounded-lg border backdrop-blur-sm flex flex-col gap-3 ${
              evaluation.isCorrect
                ? "bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-100/50 dark:border-emerald-800/50"
                : "bg-rose-50/80 dark:bg-rose-900/20 border-rose-100/50 dark:border-rose-800/50"
            }`}
          >
            <div className="flex gap-3 items-start">
              {evaluation.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={
                    evaluation.isCorrect
                      ? "text-emerald-900 dark:text-emerald-400"
                      : "text-rose-900 dark:text-rose-400"
                  }
                >
                  {evaluation.feedback}
                </p>
                {evaluation.isCorrect && (
                  <div className="mt-3 pt-3 border-t border-emerald-200/50 dark:border-emerald-800/50">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider mb-1 block">
                      Wzorcowa odpowiedź
                    </span>
                    <p className="text-emerald-800 dark:text-emerald-300 font-medium">
                      {sentence.english}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Explanation button for incorrect answers */}
            {!evaluation.isCorrect && !aiExplanation && (
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleExplainError}
                  disabled={isExplaining}
                  className="flex items-center gap-2 text-xs font-medium bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 px-3 py-1.5 rounded-md hover:bg-rose-200 dark:hover:bg-rose-800/50 transition-colors disabled:opacity-50"
                >
                  {isExplaining ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <HelpCircle className="w-3.5 h-3.5" />
                  )}
                  Wyjaśnij błąd
                </button>
              </div>
            )}

            {/* Explanation result */}
            {aiExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 pt-3 border-t border-rose-200/50 dark:border-rose-800/50"
              >
                <div className="flex items-start gap-2">
                  <MessageSquareText className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 block">
                      Wyjaśnienie
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {aiExplanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Revealed Answer Box */}
        {status === "revealed" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 p-4 rounded-lg flex gap-3 items-start"
          >
            <Eye className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                Poprawna odpowiedź
              </span>
              <p className="text-slate-900 dark:text-white font-medium">
                {sentence.english}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
