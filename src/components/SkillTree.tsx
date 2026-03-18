import { motion } from 'motion/react';
import { Level, Branch } from '../data/learningPath';
import { ChevronRight, Info, BookOpen, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SkillTreeProps {
  onPractice?: (branch: Branch, levelTitle: string) => void;
  onOpenVocabulary?: (levelId: string) => void;
}

export function SkillTree({ onPractice, onOpenVocabulary }: SkillTreeProps) {
  const [selectedBranch, setSelectedBranch] = useState<{branch: Branch, levelTitle: string} | null>(null);
  const [learningPath, setLearningPath] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPath() {
      try {
        setErrorMsg('Fetching levels...');
        const { data: levelsData, error: levelsError } = await supabase
          .from('levels')
          .select('*')
          .order('order_index', { ascending: true });

        if (levelsError) {
          setErrorMsg(`Error fetching levels: ${levelsError.message}`);
          setLoading(false);
          return;
        }

        setErrorMsg('Fetching branches...');
        const { data: branchesData, error: branchesError } = await supabase
          .from('branches')
          .select('*')
          .order('order_index', { ascending: true });

        if (branchesError) {
          setErrorMsg(`Error fetching branches: ${branchesError.message}`);
          setLoading(false);
          return;
        }

        if (!levelsData || !branchesData) {
          setErrorMsg('Data is null');
          setLoading(false);
          return;
        }

        if (levelsData.length === 0) {
          setErrorMsg('Levels data is empty array []');
          setLoading(false);
          return;
        }

        const formattedPath: Level[] = levelsData.map(level => ({
          id: level.id,
          title: level.title,
          level: level.level,
          focus: level.focus,
          branches: branchesData.filter(b => b.level_id === level.id).map(b => ({
            id: b.id,
            title: b.title,
            focus: b.focus,
            when: b.when,
            structure: b.structure,
            examples: b.examples
          }))
        }));

        setLearningPath(formattedPath);
        setErrorMsg(null);
      } catch (err: any) {
        setErrorMsg(`Unexpected error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchPath();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400 mb-4" />
        {errorMsg && <p className="text-slate-500">{errorMsg}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {errorMsg && (
        <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          <strong>Debug Error:</strong> {errorMsg}
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Drzewo Umiejętności</h2>
        <p className="text-slate-600 dark:text-slate-400">Ścieżka opanowania czasów od zera do poziomu PRO.</p>
      </div>

      <div className="space-y-12">
        {learningPath.map((level, index) => (
          <motion.div 
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Level Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-900 dark:bg-slate-800 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-sm z-10">
                L{index + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{level.title}</h3>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{level.level}</p>
              </div>
            </div>

            {/* Level Focus */}
            <div className="ml-6 pl-10 border-l-2 border-slate-200/50 dark:border-slate-800/50 pb-6">
              <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-4 rounded-xl border border-white/50 dark:border-slate-800/50 mb-6 text-sm text-slate-700 dark:text-slate-300 shadow-[0_4px_24px_0_rgba(31,38,135,0.02)]">
                <span className="font-semibold text-slate-900 dark:text-white">Skupienie:</span> {level.focus}
              </div>

              {/* Branches */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Vocabulary Tile */}
                {onOpenVocabulary && (
                  <button
                    onClick={() => onOpenVocabulary(level.id)}
                    className="text-left bg-indigo-50/60 dark:bg-indigo-900/20 backdrop-blur-md p-5 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50 hover:bg-indigo-50/90 dark:hover:bg-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-[0_8px_32px_0_rgba(99,102,241,0.1)] transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-200 transition-colors">
                          Baza Słów: {level.level}
                        </h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-indigo-400 dark:text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                    </div>
                    <p className="text-xs text-indigo-700/70 dark:text-indigo-400/70 line-clamp-2 mt-2">
                      Słownictwo dedykowane dla poziomu {level.level}. Od łatwych do trudniejszych słów.
                    </p>
                  </button>
                )}

                {level.branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranch({branch, levelTitle: level.level})}
                    className="text-left bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-white/50 dark:border-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-indigo-300/50 dark:hover:border-indigo-700/50 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {branch.title}
                      </h4>
                      <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                    </div>
                    {branch.when && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2">{branch.when}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Branch Details */}
      {selectedBranch && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50 dark:border-slate-700/50 flex flex-col"
          >
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-start shrink-0">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white pr-8">{selectedBranch.branch.title}</h3>
              <button 
                onClick={() => setSelectedBranch(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto">
              {selectedBranch.branch.when && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Kiedy używamy</h4>
                  <p className="text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50">{selectedBranch.branch.when}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Struktura</h4>
                <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 text-indigo-900 dark:text-indigo-300 whitespace-pre-line font-medium text-sm">
                  {selectedBranch.branch.structure}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Przykłady</h4>
                <ul className="space-y-2">
                  {selectedBranch.branch.examples.map((ex, i) => (
                    <li key={i} className="flex gap-3 items-start bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                      <span className="text-slate-700 dark:text-slate-300">{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50 rounded-b-2xl flex gap-3 shrink-0">
              <button 
                onClick={() => setSelectedBranch(null)}
                className="flex-1 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Zamknij
              </button>
              {onPractice && (
                <button 
                  onClick={() => {
                    onPractice(selectedBranch.branch, selectedBranch.levelTitle);
                    setSelectedBranch(null);
                  }}
                  className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-md"
                >
                  Rozpocznij ćwiczenie
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
