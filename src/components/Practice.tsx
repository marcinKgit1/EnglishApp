import { useState, useEffect } from 'react';
import { Word } from '../data/vocabulary';
import { generateSentences, PracticeSentence } from '../services/gemini';
import { Loader2, ArrowLeft } from 'lucide-react';
import { SentencePracticeCard } from './SentencePracticeCard';

interface PracticeProps {
  word: Word;
  onBack: () => void;
}

export function Practice({ word, onBack }: PracticeProps) {
  const [sentences, setSentences] = useState<PracticeSentence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    generateSentences(word.english, word.type).then(data => {
      if (isMounted) {
        setSentences(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [word]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Wróć do bazy słów
      </button>

      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] border border-white/50 dark:border-slate-700/50 mb-8 text-center relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-emerald-500" />
        <span className="inline-block px-3 py-1 bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-sm rounded-full mb-4 font-medium uppercase tracking-wider backdrop-blur-md">
          Trening: {word.type}
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{word.english}</h2>
        <p className="text-xl text-slate-500 dark:text-slate-400">{word.polish}</p>
        {word.forms && (
          <p className="mt-4 text-sm font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg inline-block backdrop-blur-md">
            {word.forms}
          </p>
        )}
      </div>

      <div className="bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-md border border-amber-200/50 dark:border-amber-800/50 p-4 rounded-xl mb-8 flex gap-3 items-start transition-colors">
        <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-500 rounded-lg flex items-center justify-center shrink-0">
          <span className="font-bold text-lg">!</span>
        </div>
        <div>
          <h4 className="font-semibold text-amber-900 dark:text-amber-400">Podpowiedź</h4>
          <p className="text-amber-800 dark:text-amber-300/80 text-sm mt-1">
            Przetłumacz poniższe zdania na język angielski używając słowa "{word.english}". Jeśli nie znasz jakiegoś słowa, <b>kliknij na nie</b> w polskim zdaniu, aby otrzymać tłumaczenie. Możesz poprosić o podpowiedź lub sprawdzić swoje tłumaczenie lokalnie.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          Zbuduj zdania w różnych kontekstach
          {loading && <Loader2 className="w-5 h-5 animate-spin text-indigo-600 dark:text-indigo-400" />}
        </h3>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-32 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-slate-700/30 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sentences.map((sentence, index) => (
              <SentencePracticeCard 
                key={index} 
                sentence={sentence} 
                index={index} 
                context={`Użyj słowa/zwrotu: ${word.english}`} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
