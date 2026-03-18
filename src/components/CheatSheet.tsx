import { cheatSheet } from '../data/learningPath';
import { Info } from 'lucide-react';

export function CheatSheet() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center shadow-sm">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Uniwersalna Zasada (Cheat Sheet)</h2>
          <p className="text-slate-600 dark:text-slate-400">Niezależnie od poziomu trudności, angielski opiera się na matematycznej zasadzie operatorów.</p>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] border border-white/50 dark:border-slate-700/50 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md">
                <th className="p-4 font-semibold text-slate-900 dark:text-white">Grupa Czasów</th>
                <th className="p-4 font-semibold text-slate-900 dark:text-white">"Szef" (Operator)</th>
                <th className="p-4 font-semibold text-slate-900 dark:text-white">Pytanie (Inwersja)</th>
                <th className="p-4 font-semibold text-slate-900 dark:text-white">Przeczenie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50">
              {cheatSheet.map((item, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-4 font-medium text-slate-900 dark:text-slate-200">{item.group}</td>
                  <td className="p-4">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm bg-indigo-50/80 dark:bg-indigo-900/30 rounded-md inline-block px-2 py-1 backdrop-blur-sm border border-indigo-100/50 dark:border-indigo-800/50">
                      {item.operator}
                    </span>
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{item.question}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{item.negative}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/50 dark:border-slate-800/50 shadow-[0_4px_24px_0_rgba(31,38,135,0.02)] transition-colors">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Jak tego używać?</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          W każdym czasie jest jeden "Szef" (czasownik posiłkowy), który bierze na siebie ciężar przeczenia i pytania. 
          Jeśli znasz operatora dla danego czasu, zawsze wiesz jak zadać pytanie (przestawiając go przed osobę) i jak zaprzeczyć (dodając do niego "not").
        </p>
      </div>
    </div>
  );
}
