import { useState } from 'react';
import { Header } from './components/layout/Header';
import { InstallPwaBanner } from './components/layout/InstallPwaBanner';
import { TabNavigation } from './components/layout/TabNavigation';
import { TodayView } from './components/today/TodayView';
import { BrainDumpView } from './components/braindump/BrainDumpView';
import { FocusTimerModal } from './components/timer/FocusTimerModal';
import { ConfettiFeedback } from './components/ui/ConfettiFeedback';

import { useTasks } from './hooks/useTasks';
import { useBrainDump } from './hooks/useBrainDump';
import { useFocusTimer } from './hooks/useFocusTimer';

export function App() {
  const [activeTab, setActiveTab] = useState<'today' | 'braindump'>('today');

  const {
    todayTasks,
    addTask,
    toggleTaskCompletion,
    addSubtask,
    toggleSubtask,
    deleteTask,
    deleteSubtask,
    triggerConfetti,
  } = useTasks();

  const {
    items: brainDumpItems,
    addBrainDumpItem,
    deleteBrainDumpItem,
    markProcessed,
  } = useBrainDump();

  const {
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  } = useFocusTimer();

  const handleStartFocusTimer = (taskId: string, taskTitle: string, minutes: number) => {
    startTimer(minutes, taskId, taskTitle);
  };

  const handleConvertToTaskFromBrainDump = (content: string, period: Parameters<typeof addTask>[1]) => {
    addTask(content, period);
  };

  const unorganizedBrainDumpCount = brainDumpItems.filter((i) => !i.processed).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Header />
      <InstallPwaBanner />

      <main className="flex-1 max-w-xl w-full mx-auto px-4 sm:px-6 py-2">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          brainDumpCount={unorganizedBrainDumpCount}
        />

        {activeTab === 'today' ? (
          <TodayView
            tasks={todayTasks}
            onAddTask={addTask}
            onToggleTask={toggleTaskCompletion}
            onDeleteTask={deleteTask}
            onToggleSubtask={toggleSubtask}
            onDeleteSubtask={deleteSubtask}
            onAddSubtask={addSubtask}
            onStartFocusTimer={handleStartFocusTimer}
          />
        ) : (
          <BrainDumpView
            items={brainDumpItems}
            onAddItem={addBrainDumpItem}
            onDeleteItem={deleteBrainDumpItem}
            onConvertToTask={handleConvertToTaskFromBrainDump}
            onMarkProcessed={markProcessed}
          />
        )}
      </main>

      <FocusTimerModal
        timerState={timerState}
        onPause={pauseTimer}
        onResume={resumeTimer}
        onStop={stopTimer}
        onStartCustom={(mins) => startTimer(mins, timerState.taskId || undefined, timerState.taskTitle || undefined)}
      />

      <ConfettiFeedback trigger={triggerConfetti} />
    </div>
  );
}

export default App;
