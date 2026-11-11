import React from 'react';
import { Play, Pause, X, RotateCcw, Flame } from 'lucide-react';
import { FocusTimerState } from '../../types/timer';
import { formatTimeRemaining } from '../../utils/dateUtils';

interface FocusTimerModalProps {
  timerState: FocusTimerState;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onStartCustom: (minutes: number) => void;
}

export const FocusTimerModal: React.FC<FocusTimerModalProps> = ({
  timerState,
  onPause,
  onResume,
  onStop,
  onStartCustom,
}) => {
  if (!timerState.isActive) return null;

  const progressPercent = Math.max(
    0,
    Math.min(100, ((timerState.totalSeconds - timerState.secondsLeft) / timerState.totalSeconds) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onStop}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-xl transition"
          aria-label="Fechar temporizador"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-6 my-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-300 border border-teal-800/60 rounded-full text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-teal-400" />
            Modo Hiperfoco
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-100 max-w-xs mx-auto line-clamp-2">
              {timerState.taskTitle || 'Sessão de Foco'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Desligue as distrações. Concentre-se apenas nesta tarefa.
            </p>
          </div>

          {/* Relógio em destaque */}
          <div className="relative py-4 flex flex-col items-center justify-center">
            <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-teal-400">
              {formatTimeRemaining(timerState.secondsLeft)}
            </div>

            {/* Barra de Progresso do Timer */}
            <div className="w-full bg-slate-800 rounded-full h-3 mt-6 overflow-hidden border border-slate-700/50">
              <div
                className="bg-teal-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Controles do Timer */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {timerState.isPaused ? (
              <button
                onClick={onResume}
                className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-2xl shadow-lg shadow-teal-500/20 transition active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                Continuar
              </button>
            ) : (
              <button
                onClick={onPause}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-sm rounded-2xl transition active:scale-95"
              >
                <Pause className="w-4 h-4 fill-current" />
                Pausar
              </button>
            )}

            <button
              onClick={onStop}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl transition"
              title="Reiniciar/Encerrar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Atalhos Rápidos */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs">
            <span className="text-slate-500">Alterar tempo:</span>
            <button
              onClick={() => onStartCustom(15)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
            >
              15m
            </button>
            <button
              onClick={() => onStartCustom(25)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
            >
              25m
            </button>
            <button
              onClick={() => onStartCustom(5)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
            >
              5m (Pausa)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
