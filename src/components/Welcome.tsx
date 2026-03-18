import { motion } from 'motion/react';
import { BookOpen, TreeDeciduous, BookA, Info, Moon, Sun } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Welcome({ onStart, isDarkMode, toggleDarkMode }: WelcomeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto text-center space-y-8 py-12 relative"
    >
      <div className="absolute top-0 right-0 -mt-8 -mr-4 sm:-mr-0">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Przełącz tryb ciemny"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Opanuj Angielski Krok po Kroku
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Jasna ścieżka nauki, szybkie efekty i zero zgadywania. Od Solidnych Fundamentów po Pełne Mistrzostwo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 transition-colors">
            <BookA className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Szybka Gratyfikacja</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Uczysz się tylko tego, co naprawdę przydatne. Opanuj 1000 najważniejszych słów i od razu zacznij budować poprawne zdania.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4 transition-colors">
            <TreeDeciduous className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Ułożona Ścieżka</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Koniec z chaosem. Nasze Drzewo Umiejętności poprowadzi Cię za rękę przez wszystkie czasy i struktury gramatyczne.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-6 rounded-2xl text-left flex gap-4 items-start transition-colors">
        <Info className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-amber-900 dark:text-amber-400 mb-1">Uniwersalna Zasada (Cheat Sheet)</h3>
          <p className="text-amber-800 dark:text-amber-300/80 text-sm">
            Niezależnie od poziomu trudności, angielski opiera się na matematycznej zasadzie operatorów (czasowników posiłkowych). W każdym czasie jest jeden "Szef", który bierze na siebie ciężar przeczenia i pytania.
          </p>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="bg-slate-900 dark:bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors shadow-md"
      >
        Rozpocznij Naukę
      </button>
    </motion.div>
  );
}
