import { useState, useEffect } from 'react';
import { vocabulary, Word } from '../data/vocabulary';
import { Search, Filter, BookOpen, XCircle } from 'lucide-react';

interface VocabularyProps {
  onSelectWord: (word: Word) => void;
  initialLevelId?: string | null;
}

export function Vocabulary({ onSelectWord, initialLevelId }: VocabularyProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<Word['type'] | 'all'>('all');
  const [levelFilter, setLevelFilter] = useState<string | 'all'>(initialLevelId || 'all');

  useEffect(() => {
    if (initialLevelId) {
      setLevelFilter(initialLevelId);
    }
  }, [initialLevelId]);

  const filteredWords = vocabulary.filter(word => {
    const matchesSearch = word.english.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          word.polish.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || word.type === filterType;
    const matchesLevel = levelFilter === 'all' || word.levelId === levelFilter;
    return matchesSearch && matchesType && matchesLevel;
  });

  const levels = ['all', 'level-1', 'level-2', 'level-3', 'level-4', 'level-5'];
  const levelNames: Record<string, string> = {
    'all': 'Wszystkie poziomy',
    'level-1': 'Poziom 1 (A1)',
    'level-2': 'Poziom 2 (A2)',
    'level-3': 'Poziom 3 (B1)',
    'level-4': 'Poziom 4 (B2)',
    'level-5': 'Poziom 5 (C1/C2)',
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Baza Słów i Zwrotów</h2>
        <p className="text-slate-600 dark:text-slate-400">Opanuj 1000-1500 najczęściej używanych słów, aby zrozumieć 80% komunikacji.</p>
      </div>

      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] border border-white/50 dark:border-slate-700/50 mb-8 space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Szukaj słowa lub zwrotu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white backdrop-blur-md"
            />
          </div>
          
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-3 bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none backdrop-blur-md"
          >
            {levels.map(level => (
              <option key={level} value={level}>{levelNames[level]}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {(['all', 'verb', 'phrase', 'noun', 'adjective'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === type 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 backdrop-blur-md'
              }`}
            >
              {type === 'all' ? 'Wszystkie' : 
               type === 'verb' ? 'Czasowniki' : 
               type === 'phrase' ? 'Zwroty' : 
               type === 'noun' ? 'Rzeczowniki' : 'Przymiotniki'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredWords.map(word => (
          <button
            key={word.id}
            onClick={() => onSelectWord(word)}
            className="text-left bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-white/50 dark:border-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-indigo-300/50 dark:hover:border-indigo-700/50 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-all group relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 p-2 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity">
              <BookOpen className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block px-2 py-1 bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs rounded-md font-medium uppercase tracking-wider backdrop-blur-md">
                  {word.type}
                </span>
                {word.levelId && (
                  <span className="inline-block px-2 py-1 bg-indigo-50/80 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-md font-medium backdrop-blur-md">
                    {levelNames[word.levelId]?.split(' ')[1] || word.levelId}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{word.english}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium flex-1">{word.polish}</p>
              
              {word.forms && (
                <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Formy</p>
                  <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-900/30 px-2 py-1 rounded inline-block backdrop-blur-md">{word.forms}</p>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/50 dark:border-slate-800/50 text-slate-500 dark:text-slate-400">
          Nie znaleziono słów spełniających kryteria.
        </div>
      )}
    </div>
  );
}
