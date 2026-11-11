import React, { useState } from 'react';
import { Check, Timer, Trash2, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { Task } from '../../types/task';
import { SubtaskList } from '../subtasks/SubtaskList';

interface TaskCardProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onStartFocusTimer: (taskId: string, taskTitle: string, minutes: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleTask,
  onDeleteTask,
  onToggleSubtask,
  onDeleteSubtask,
  onAddSubtask,
  onStartFocusTimer,
}) => {
  const [expanded, setExpanded] = useState(true);

  const completedSubtasks = task.subtasks.filter((st) => st.completed).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <div
      className={`group relative bg-white border rounded-2xl p-3.5 transition-all duration-200 shadow-sm hover:shadow-md ${
        task.completed
          ? 'bg-slate-50/80 border-slate-200/60 opacity-80'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Checkbox principal grande e legível */}
        <button
          onClick={() => onToggleTask(task.id)}
          className="flex items-start gap-3 text-left flex-1 min-w-0"
        >
          <div
            className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
              task.completed
                ? 'bg-emerald-600 border-emerald-600 text-white scale-105'
                : 'border-slate-300 group-hover:border-teal-500 bg-white'
            }`}
          >
            {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-sm sm:text-base font-semibold leading-snug break-words ${
                task.completed ? 'line-through text-slate-400' : 'text-slate-800'
              }`}
            >
              {task.title}
            </h3>

            {totalSubtasks > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {completedSubtasks} de {totalSubtasks} micro-passos
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-teal-700">
                  {Math.round((completedSubtasks / totalSubtasks) * 100)}%
                </span>
              </div>
            )}
          </div>
        </button>

        {/* Botões de Ação do Card */}
        <div className="flex items-center gap-1">
          {!task.completed && (
            <button
              onClick={() => onStartFocusTimer(task.id, task.title, 15)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/80 font-semibold text-xs rounded-xl transition"
              title="Iniciar foco de 15 min para esta tarefa"
            >
              <Timer className="w-3.5 h-3.5 text-teal-600" />
              <span>15m</span>
            </button>
          )}

          <button
            onClick={() => onDeleteTask(task.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition opacity-60 group-hover:opacity-100"
            title="Excluir tarefa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Seção de Subtarefas */}
      <div className="mt-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {task.subtasks.length > 0 ? 'Micro-passos' : '+ Adicionar micro-passo'}
          </button>
        </div>

        {expanded && (
          <SubtaskList
            taskId={task.id}
            subtasks={task.subtasks}
            onToggleSubtask={onToggleSubtask}
            onDeleteSubtask={onDeleteSubtask}
            onAddSubtask={onAddSubtask}
          />
        )}
      </div>
    </div>
  );
};
