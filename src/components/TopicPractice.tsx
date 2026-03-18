import { useState, useEffect } from "react";
import { Branch } from "../data/learningPath";
import { PracticeSentence } from "../services/gemini";
import { Loader2, ArrowLeft } from "lucide-react";
import { SentencePracticeCard } from "./SentencePracticeCard";
import { supabase } from "../lib/supabase";

interface TopicPracticeProps {
  branch: Branch;
  levelTitle: string;
  onBack: () => void;
}

export function TopicPractice({
  branch,
  levelTitle,
  onBack,
}: TopicPracticeProps) {
  const [sentences, setSentences] = useState<PracticeSentence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function fetchSentences() {
      const { data, error } = await supabase
        .from("sentences")
        .select("*")
        .eq("branch_id", branch.id);

      if (error) {
        console.error("Error fetching sentences:", error);
        if (isMounted) setLoading(false);
        return;
      }

      if (isMounted && data) {
        // Shuffle and pick up to 5
        const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 5);

        const formattedSentences: PracticeSentence[] = shuffled.map((s) => ({
          polish: s.polish,
          english: s.english[0], // Primary translation
          acceptableTranslations: s.english, // All acceptable translations for local checking
        }));

        setSentences(formattedSentences);
        setLoading(false);
      }
    }

    fetchSentences();

    return () => {
      isMounted = false;
    };
  }, [branch, levelTitle]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Wróć do Drzewa Umiejętności
      </button>

      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] border border-white/50 dark:border-slate-700/50 mb-8 text-center relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-indigo-500" />
        <span className="inline-block px-3 py-1 bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-sm rounded-full mb-4 font-medium uppercase tracking-wider backdrop-blur-md">
          Trening Gramatyki • {levelTitle}
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          {branch.title}
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {branch.focus || branch.when}
        </p>
      </div>

      <div className="bg-indigo-50/80 dark:bg-indigo-900/20 backdrop-blur-md border border-indigo-200/50 dark:border-indigo-800/50 p-4 rounded-xl mb-8 flex gap-3 items-start transition-colors">
        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
          <span className="font-bold text-lg">?</span>
        </div>
        <div>
          <h4 className="font-semibold text-indigo-900 dark:text-indigo-300">
            Jak ćwiczyć?
          </h4>
          <p className="text-indigo-800 dark:text-indigo-200/80 text-sm mt-1">
            Przetłumacz poniższe zdania na język angielski. Jeśli nie znasz
            jakiegoś słowa, <b>kliknij na nie</b> w polskim zdaniu, aby otrzymać
            tłumaczenie. Możesz poprosić o podpowiedź lub sprawdzić swoje
            tłumaczenie lokalnie.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          Zbuduj zdania
          {loading && (
            <Loader2 className="w-5 h-5 animate-spin text-indigo-600 dark:text-indigo-400" />
          )}
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-32 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-slate-700/30 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sentences.map((sentence, index) => (
              <SentencePracticeCard
                key={index}
                sentence={sentence}
                index={index}
                context={branch.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
