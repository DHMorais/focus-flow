import React from 'react';
import { Task, TimePeriod } from '../../types/task';
import { PeriodSection } from './PeriodSection';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface TodayViewProps {
  tasks: Task[];
  onAddTask: (title: string, period: TimePeriod, subtasks: string[]) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onStartFocusTimer: (taskId: string, taskTitle: string, minutes: number) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onToggleSubtask,
  onDeleteSubtask,
  onAddSubtask,
  onStartFocusTimer,
}) => {
  const morningTasks = tasks.filter((t) => t.period === 'morning');
  const afternoonTasks = tasks.filter((t) => t.period === 'afternoon');
  const nightTasks = tasks.filter((t) => t.period === 'night');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 pb-20">
      {/* Resumo visual do dia */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-teal-200">
              <Sparkles className="w-3 h-3" /> Foco de Hoje
            </span>
            <h2 className="text-xl font-extrabold mt-0.5">
              {completedTasks === totalTasks && totalTasks > 0
                ? 'Dia concluído com sucesso! 🎉'
                : 'Um passo de cada vez.'}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black">{progressPercent}%</span>
            <p className="text-[11px] text-teal-200">{completedTasks} de {totalTasks} feitas</p>
          </div>
        </div>

        {/* Barra de progresso visual */}
        <div className="w-full bg-teal-950/60 rounded-full h-2.5 mt-3 overflow-hidden">
          <div
            className="bg-teal-300 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Períodos do dia */}
      <div className="space-y-6">
        <PeriodSection
          period="morning"
          tasks={morningTasks}
          onAddTask={onAddTask}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
          onAddSubtask={onAddSubtask}
          onStartFocusTimer={onStartFocusTimer}
        />

        <PeriodSection
          period="afternoon"
          tasks={afternoonTasks}
          onAddTask={onAddTask}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
          onAddSubtask={onAddSubtask}
          onStartFocusTimer={onStartFocusTimer}
        />

        <PeriodSection
          period="night"
          tasks={nightTasks}
          onAddTask={onAddTask}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
          onAddSubtask={onAddSubtask}
          onStartFocusTimer={onStartFocusTimer}
        />
      </div>

      {/* Mensagem de acolhimento TDAH */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-center">
        <CheckCircle2 className="w-5 h-5 text-teal-600 mx-auto mb-1" />
        <p className="text-xs text-slate-600 font-medium">
          Lembre-se: Se não conseguir fazer tudo hoje, está tudo bem. Ajustar suas metas faz parte da jornada.
        </p>
      </div>
    </div>
  );
};
