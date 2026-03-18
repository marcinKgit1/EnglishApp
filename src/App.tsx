import { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { SkillTree } from './components/SkillTree';
import { Vocabulary } from './components/Vocabulary';
import { Practice } from './components/Practice';
import { TopicPractice } from './components/TopicPractice';
import { CheatSheet } from './components/CheatSheet';
import { Word } from './data/vocabulary';
import { Branch } from './data/learningPath';
import { BookOpen, TreeDeciduous, Info, GraduationCap, Moon, Sun } from 'lucide-react';

type View = 'welcome' | 'tree' | 'vocabulary' | 'practice' | 'topic-practice' | 'cheatsheet';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedLevelTitle, setSelectedLevelTitle] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [vocabularyLevel, setVocabularyLevel] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSelectWord = (word: Word) => {
    setSelectedWord(word);
    setCurrentView('practice');
  };

  const handlePracticeBranch = (branch: Branch, levelTitle: string) => {
    setSelectedBranch(branch);
    setSelectedLevelTitle(levelTitle);
    setCurrentView('topic-practice');
  };

  const handleOpenVocabularyForLevel = (levelId: string) => {
    setVocabularyLevel(levelId);
    setCurrentView('vocabulary');
  };

  const handleOpenVocabulary = () => {
    setVocabularyLevel(null);
    setCurrentView('vocabulary');
  };

  const renderView = () => {
    switch (currentView) {
      case 'welcome':
        return <Welcome onStart={() => setCurrentView('tree')} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
      case 'tree':
        return <SkillTree onPractice={handlePracticeBranch} onOpenVocabulary={handleOpenVocabularyForLevel} />;
      case 'topic-practice':
        if (!selectedBranch) return <SkillTree onPractice={handlePracticeBranch} onOpenVocabulary={handleOpenVocabularyForLevel} />;
        return <TopicPractice branch={selectedBranch} levelTitle={selectedLevelTitle} onBack={() => setCurrentView('tree')} />;
      case 'vocabulary':
        return <Vocabulary onSelectWord={handleSelectWord} initialLevelId={vocabularyLevel} />;
      case 'practice':
        if (!selectedWord) return <Vocabulary onSelectWord={handleSelectWord} initialLevelId={vocabularyLevel} />;
        return <Practice word={selectedWord} onBack={() => setCurrentView('vocabulary')} />;
      case 'cheatsheet':
        return <CheatSheet />;
      default:
        return <Welcome onStart={() => setCurrentView('tree')} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/50 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-200 relative overflow-hidden">
      
      {/* Animated Background Orbs for Glassmorphism */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-400/20 dark:bg-indigo-900/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-400/20 dark:bg-emerald-900/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-purple-400/20 dark:bg-purple-900/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
      </div>

      {/* Navigation Bar */}
      {currentView !== 'welcome' && (
        <nav className="sticky top-0 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-white/50 dark:border-slate-800/50 shadow-sm transition-colors duration-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('welcome')}>
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden sm:block">EnglishTree</span>
              </div>
              
              <div className="flex space-x-1 sm:space-x-4 items-center">
                <button
                  onClick={() => setCurrentView('tree')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    currentView === 'tree' || currentView === 'topic-practice'
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <TreeDeciduous className="w-4 h-4" />
                  <span className="hidden sm:inline">Drzewo Umiejętności</span>
                </button>
                
                <button
                  onClick={handleOpenVocabulary}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    currentView === 'vocabulary' || currentView === 'practice'
                      ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Baza Słów</span>
                </button>

                <button
                  onClick={() => setCurrentView('cheatsheet')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    currentView === 'cheatsheet' 
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  <span className="hidden sm:inline">Ściąga</span>
                </button>

                <div className="w-px h-6 bg-slate-200/50 dark:bg-slate-800/50 mx-1"></div>

                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
                  title="Przełącz tryb ciemny"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-200 relative z-10">
        {renderView()}
      </main>
    </div>
  );
}
