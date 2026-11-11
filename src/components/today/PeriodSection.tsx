import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task, TimePeriod, PERIOD_LABELS } from '../../types/task';
import { TaskCard } from './TaskCard';
import { QuickTaskInput } from './QuickTaskInput';

interface PeriodSectionProps {
  period: TimePeriod;
  tasks: Task[];
  onAddTask: (title: string, period: TimePeriod, subtasks: string[]) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onStartFocusTimer: (taskId: string, taskTitle: string, minutes: number) => void;
}

export const PeriodSection: React.FC<PeriodSectionProps> = ({
  period,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onToggleSubtask,
  onDeleteSubtask,
  onAddSubtask,
  onStartFocusTimer,
}) => {
  const [showInput, setShowInput] = useState(false);
  const info = PERIOD_LABELS[period];

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <section className="space-y-3">
      {/* Cabeçalho da Seção de Período */}
      <div className={`p-3.5 rounded-2xl border ${info.color} flex items-center justify-between`}>
        <div className="flex items-center gap-2.5">
          <span className="text-xl" role="img" aria-label={info.title}>
            {info.icon}
          </span>
          <div>
            <h2 className="text-base font-bold tracking-tight">{info.title}</h2>
            <p className="text-xs opacity-80 font-medium">{info.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {tasks.length > 0 && (
            <span className="text-xs font-semibold bg-white/70 px-2.5 py-1 rounded-full text-slate-800 shadow-sm">
              {completedCount}/{tasks.length}
            </span>
          )}
          <button
            onClick={() => setShowInput(!showInput)}
            className="p-1.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl shadow-sm transition"
            title="Adicionar tarefa neste período"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Form de Input Rápido */}
      {showInput && (
        <QuickTaskInput
          period={period}
          onAddTask={(title, p, subtasks) => {
            onAddTask(title, p, subtasks);
            setShowInput(false);
          }}
        />
      )}

      {/* Lista de Tarefas do Período */}
      {tasks.length === 0 && !showInput ? (
        <div className="text-center py-4 px-3 bg-white/50 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-xs text-slate-500 font-medium">Nenhuma tarefa para o período da {info.title.toLowerCase()}.</p>
          <button
            onClick={() => setShowInput(true)}
            className="mt-1.5 text-xs text-teal-700 font-bold hover:underline"
          >
            + Adicionar uma tarefa simples
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onToggleSubtask={onToggleSubtask}
              onDeleteSubtask={onDeleteSubtask}
              onAddSubtask={onAddSubtask}
              onStartFocusTimer={onStartFocusTimer}
            />
          ))}
        </div>
      )}
    </section>
  );
};
