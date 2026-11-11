import { Task } from '../types/task';
import { BrainDumpItem } from '../types/braindump';

const TASKS_KEY = 'focusflow_tasks_v1';
const BRAINDUMP_KEY = 'focusflow_braindump_v1';

export const storageService = {
  getTasks(): Task[] {
    try {
      const data = localStorage.getItem(TASKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Erro ao ler tarefas do LocalStorage', e);
      return [];
    }
  },

  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Erro ao salvar tarefas no LocalStorage', e);
    }
  },

  getBrainDumpItems(): BrainDumpItem[] {
    try {
      const data = localStorage.getItem(BRAINDUMP_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Erro ao ler Descarga Mental do LocalStorage', e);
      return [];
    }
  },

  saveBrainDumpItems(items: BrainDumpItem[]): void {
    try {
      localStorage.setItem(BRAINDUMP_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Erro ao salvar Descarga Mental no LocalStorage', e);
    }
  }
};
