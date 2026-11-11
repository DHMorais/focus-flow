import React from 'react';
import { Sun, Lightbulb } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'today' | 'braindump';
  onTabChange: (tab: 'today' | 'braindump') => void;
  brainDumpCount: number;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  brainDumpCount,
}) => {
  return (
    <div className="flex p-1 bg-slate-200/80 rounded-2xl max-w-xl mx-auto my-4 shadow-inner">
      <button
        onClick={() => onTabChange('today')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
          activeTab === 'today'
            ? 'bg-white text-teal-900 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <Sun className="w-4 h-4 text-amber-500" />
        Modo Hoje
      </button>

      <button
        onClick={() => onTabChange('braindump')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 relative ${
          activeTab === 'braindump'
            ? 'bg-white text-teal-900 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <Lightbulb className="w-4 h-4 text-teal-600" />
        Descarga Mental
        {brainDumpCount > 0 && (
          <span className="ml-1 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {brainDumpCount}
          </span>
        )}
      </button>
    </div>
  );
};
