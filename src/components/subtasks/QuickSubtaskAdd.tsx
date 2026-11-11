import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface QuickSubtaskAddProps {
  onAdd: (subtaskTitle: string) => void;
}

export const QuickSubtaskAdd: React.FC<QuickSubtaskAddProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="+ Adicionar micro-passo rápido..."
        className="flex-1 bg-slate-100 focus:bg-white text-xs border border-transparent focus:border-teal-400 rounded-lg px-3 py-1.5 outline-none transition text-slate-700 placeholder:text-slate-400"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="p-1.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-lg transition"
        title="Adicionar micro-passo"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </form>
  );
};
