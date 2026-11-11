import { useState, useEffect, useCallback } from 'react';
import { Task, TimePeriod, Subtask } from '../types/task';
import { storageService } from '../services/storage';
import { getTodayDateString } from '../utils/dateUtils';
import { generateId } from '../utils/id';
import { audioService } from '../services/audio';

const INITIAL_DEMO_TASKS: Task[] = [
  {
    id: 'demo-1',
    title: '🌅 Beber um copo de água e respirar fundo',
    period: 'morning',
    date: getTodayDateString(),
    completed: false,
    subtasks: [],
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'demo-2',
    title: '🎯 Escolher a tarefa mais importante da manhã',
    period: 'morning',
    date: getTodayDateString(),
    completed: false,
    subtasks: [
      { id: 'sub-1', title: 'Abrir a lista de tarefas sem pressa', completed: true, createdAt: Date.now() - 3000000 },
      { id: 'sub-2', title: 'Dividir em 2 ou 3 passos simples', completed: false, createdAt: Date.now() - 2000000 },
    ],
    createdAt: Date.now() - 3000000,
  },
  {
    id: 'demo-3',
    title: '☕ Pausa consciente à tarde',
    period: 'afternoon',
    date: getTodayDateString(),
    completed: false,
    subtasks: [],
    createdAt: Date.now() - 1000000,
  }
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [triggerConfetti, setTriggerConfetti] = useState<boolean>(false);

  // Carregar tarefas do storage
  useEffect(() => {
    const loaded = storageService.getTasks();
    if (loaded.length === 0) {
      storageService.saveTasks(INITIAL_DEMO_TASKS);
      setTasks(INITIAL_DEMO_TASKS);
    } else {
      setTasks(loaded);
    }
  }, []);

  // Salvar no storage
  const updateTasksState = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    storageService.saveTasks(newTasks);
  }, []);

  // Filtrar apenas tarefas de hoje
  const todayDate = getTodayDateString();
  const todayTasks = tasks.filter((t) => t.date === todayDate);

  const addTask = useCallback((title: string, period: TimePeriod, subtaskTitles: string[] = []) => {
    if (!title.trim()) return;

    const newSubtasks: Subtask[] = subtaskTitles
      .filter((st) => st.trim().length > 0)
      .map((st) => ({
        id: generateId(),
        title: st.trim(),
        completed: false,
        createdAt: Date.now(),
      }));

    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      period,
      date: todayDate,
      completed: false,
      subtasks: newSubtasks,
      createdAt: Date.now(),
    };

    updateTasksState([newTask, ...tasks]);
  }, [tasks, todayDate, updateTasksState]);

  const toggleTaskCompletion = useCallback((id: string) => {
    let wasCompletedNow = false;

    const updated = tasks.map((task) => {
      if (task.id === id) {
        const nextStatus = !task.completed;
        if (nextStatus) {
          wasCompletedNow = true;
        }
        return {
          ...task,
          completed: nextStatus,
          completedAt: nextStatus ? Date.now() : undefined,
          // Se concluir a tarefa principal, podemos marcar subtarefas
          subtasks: nextStatus
            ? task.subtasks.map((st) => ({ ...st, completed: true }))
            : task.subtasks,
        };
      }
      return task;
    });

    if (wasCompletedNow) {
      audioService.playCompletionSound();
      setTriggerConfetti(true);
      setTimeout(() => setTriggerConfetti(false), 1200);
    }

    updateTasksState(updated);
  }, [tasks, updateTasksState]);

  const addSubtask = useCallback((taskId: string, subtaskTitle: string) => {
    if (!subtaskTitle.trim()) return;

    const updated = tasks.map((task) => {
      if (task.id === taskId) {
        const newSubtask: Subtask = {
          id: generateId(),
          title: subtaskTitle.trim(),
          completed: false,
          createdAt: Date.now(),
        };
        return {
          ...task,
          subtasks: [...task.subtasks, newSubtask],
        };
      }
      return task;
    });

    updateTasksState(updated);
  }, [tasks, updateTasksState]);

  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    let allCompletedNow = false;

    const updated = tasks.map((task) => {
      if (task.id === taskId) {
        const nextSubtasks = task.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        const allDone = nextSubtasks.length > 0 && nextSubtasks.every((st) => st.completed);
        if (allDone && !task.completed) {
          allCompletedNow = true;
        }
        return {
          ...task,
          subtasks: nextSubtasks,
          completed: allDone ? true : task.completed,
        };
      }
      return task;
    });

    if (allCompletedNow) {
      audioService.playCompletionSound();
      setTriggerConfetti(true);
      setTimeout(() => setTriggerConfetti(false), 1200);
    }

    updateTasksState(updated);
  }, [tasks, updateTasksState]);

  const deleteTask = useCallback((id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    updateTasksState(updated);
  }, [tasks, updateTasksState]);

  const deleteSubtask = useCallback((taskId: string, subtaskId: string) => {
    const updated = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.filter((st) => st.id !== subtaskId),
        };
      }
      return task;
    });
    updateTasksState(updated);
  }, [tasks, updateTasksState]);

  return {
    todayTasks,
    addTask,
    toggleTaskCompletion,
    addSubtask,
    toggleSubtask,
    deleteTask,
    deleteSubtask,
    triggerConfetti,
  };
}
