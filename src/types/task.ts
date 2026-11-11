export type TimePeriod = 'morning' | 'afternoon' | 'night';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export interface Task {
  id: string;
  title: string;
  period: TimePeriod;
  date: string; // Formato YYYY-MM-DD
  completed: boolean;
  completedAt?: number;
  subtasks: Subtask[];
  focusMinutesPlanned?: number;
  focusSecondsSpent?: number;
  notes?: string;
  createdAt: number;
}

export const PERIOD_LABELS: Record<TimePeriod, { title: string; icon: string; description: string; color: string }> = {
  morning: {
    title: 'Manhã',
    icon: '🌅',
    description: 'Comece o dia leve com o mais importante',
    color: 'bg-amber-50/80 border-amber-200/60 text-amber-900',
  },
  afternoon: {
    title: 'Tarde',
    icon: '☀️',
    description: 'Mantenha o ritmo sem sobrecarregar',
    color: 'bg-teal-50/80 border-teal-200/60 text-teal-900',
  },
  night: {
    title: 'Noite',
    icon: '🌙',
    description: 'Feche o dia com tranquilidade',
    color: 'bg-indigo-50/80 border-indigo-200/60 text-indigo-900',
  },
};
