import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Subtask } from '../../types/task';
import { QuickSubtaskAdd } from './QuickSubtaskAdd';

interface SubtaskListProps {
  taskId: string;
  subtasks: Subtask[];
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
}

export const SubtaskList: React.FC<SubtaskListProps> = ({
  taskId,
  subtasks,
  onToggleSubtask,
  onDeleteSubtask,
  onAddSubtask,
}) => {
  return (
    <div className="mt-3 pl-2 sm:pl-3 border-l-2 border-slate-200 space-y-1.5">
      {subtasks.map((st) => (
        <div
          key={st.id}
          className="group flex items-center justify-between gap-2 text-xs py-1 px-1.5 rounded-md hover:bg-slate-50 transition"
        >
          <button
            onClick={() => onToggleSubtask(taskId, st.id)}
            className="flex items-center gap-2 text-left flex-1"
          >
            <div
              className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                st.completed
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-slate-300 group-hover:border-slate-400 bg-white'
              }`}
            >
              {st.completed && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span
              className={`${
                st.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'
              }`}
            >
              {st.title}
            </span>
          </button>

          <button
            onClick={() => onDeleteSubtask(taskId, st.id)}
            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded transition"
            title="Excluir micro-passo"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}

      <QuickSubtaskAdd onAdd={(title) => onAddSubtask(taskId, title)} />
    </div>
  );
};
