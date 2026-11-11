import { useState, useEffect, useCallback, useRef } from 'react';
import { FocusTimerState } from '../types/timer';
import { audioService } from '../services/audio';
import { notificationService } from '../services/notifications';

export function useFocusTimer() {
  const [timerState, setTimerState] = useState<FocusTimerState>({
    isActive: false,
    isPaused: false,
    secondsLeft: 15 * 60,
    totalSeconds: 15 * 60,
    taskId: null,
    taskTitle: null,
  });

  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback((minutes: number, taskId?: string, taskTitle?: string) => {
    const totalSecs = minutes * 60;
    setTimerState({
      isActive: true,
      isPaused: false,
      secondsLeft: totalSecs,
      totalSeconds: totalSecs,
      taskId: taskId || null,
      taskTitle: taskTitle || null,
    });
    // Request notification permission when user starts timer
    notificationService.requestPermission();
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isPaused: true }));
  }, []);

  const resumeTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState({
      isActive: false,
      isPaused: false,
      secondsLeft: 15 * 60,
      totalSeconds: 15 * 60,
      taskId: null,
      taskTitle: null,
    });
  }, []);

  useEffect(() => {
    if (timerState.isActive && !timerState.isPaused) {
      intervalRef.current = window.setInterval(() => {
        setTimerState((prev) => {
          if (prev.secondsLeft <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            // Recompensa e aviso sonoro/visual
            audioService.playTimerCompleteSound();
            notificationService.sendFocusCompleteNotification(prev.taskTitle || undefined);

            return {
              ...prev,
              secondsLeft: 0,
              isActive: false,
              isPaused: false,
            };
          }
          return {
            ...prev,
            secondsLeft: prev.secondsLeft - 1,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isActive, timerState.isPaused]);

  return {
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  };
}
