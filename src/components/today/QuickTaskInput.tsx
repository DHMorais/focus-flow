import React, { useState } from 'react';
import { Plus, ListPlus, ChevronDown, ChevronUp } from 'lucide-react';
import { TimePeriod } from '../../types/task';

interface QuickTaskInputProps {
  period: TimePeriod;
  onAddTask: (title: string, period: TimePeriod, subtasks: string[]) => void;
}

export const QuickTaskInput: React.FC<QuickTaskInputProps> = ({ period, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [showSubtaskBuilder, setShowSubtaskBuilder] = useState(false);
  const [subtasks, setSubtasks] = useState<string[]>(['']);

  const handleSubtaskChange = (index: number, value: string) => {
    const updated = [...subtasks];
    updated[index] = value;
    setSubtasks(updated);
  };

  const addSubtaskField = () => {
    setSubtasks([...subtasks, '']);
  };

  const removeSubtaskField = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const validSubtasks = subtasks.filter((s) => s.trim().length > 0);
    onAddTask(title.trim(), period, validSubtasks);

    setTitle('');
    setSubtasks(['']);
    setShowSubtaskBuilder(false);
  };

  return (
    <div className="mt-3 bg-white border border-slate-200/90 rounded-2xl p-3 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="O que precisa ser feito?"
            className="flex-1 bg-slate-50 focus:bg-white text-sm border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 outline-none transition text-slate-800 placeholder:text-slate-400 font-medium"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:opacity-40 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setShowSubtaskBuilder(!showSubtaskBuilder)}
            className="flex items-center gap-1.5 text-xs text-teal-700 font-medium hover:text-teal-900 transition"
          >
            <ListPlus className="w-3.5 h-3.5" />
            {showSubtaskBuilder ? 'Ocultar micro-passos iniciais' : '+ Dividir em micro-passos'}
            {showSubtaskBuilder ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {showSubtaskBuilder && (
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="text-[11px] text-slate-500">
              💡 Divida em passos bem pequenos para evitar a sensação de sobrecarga:
            </p>
            {subtasks.map((st, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 w-4">{idx + 1}.</span>
                <input
                  type="text"
                  value={st}
                  onChange={(e) => handleSubtaskChange(idx, e.target.value)}
                  placeholder={`Micro-passo ${idx + 1}`}
                  className="flex-1 bg-slate-50 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-teal-400"
                />
                {subtasks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubtaskField(idx)}
                    className="text-xs text-slate-400 hover:text-rose-500 px-1"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addSubtaskField}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg transition"
            >
              + Mais um micro-passo
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
