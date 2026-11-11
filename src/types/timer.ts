export type TimerMode = 'pomodoro15' | 'pomodoro25' | 'shortBreak';

export interface FocusTimerState {
  isActive: boolean;
  isPaused: boolean;
  secondsLeft: number;
  totalSeconds: number;
  taskId: string | null;
  taskTitle: string | null;
}
