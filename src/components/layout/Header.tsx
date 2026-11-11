import React, { useState, useEffect } from 'react';
import { Brain, Wifi, WifiOff, Sparkles, Bell, BellRing } from 'lucide-react';
import { formatFormattedTodayDate } from '../../utils/dateUtils';
import { notificationService } from '../../services/notifications';

export const Header: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [permission, setPermission] = useState<string>(notificationService.getPermissionState());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleToggleNotification = async () => {
    const granted = await notificationService.requestPermission();
    setPermission(granted ? 'granted' : 'denied');
    if (granted) {
      notificationService.sendTaskCompleteNotification('Notificações ativadas com sucesso!');
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/80 px-4 py-3 sm:px-6">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-sm shadow-teal-700/20">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
              FocusFlow
              <span className="inline-flex items-center text-[10px] uppercase tracking-wider font-semibold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5 mr-0.5 inline" />
                TDAH Friendly
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {formatFormattedTodayDate()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {notificationService.isSupported() && (
            <button
              onClick={handleToggleNotification}
              className={`p-2 rounded-xl transition border text-xs flex items-center gap-1 ${
                permission === 'granted'
                  ? 'bg-teal-50 border-teal-200 text-teal-700'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
              }`}
              title={
                permission === 'granted'
                  ? 'Notificações ativadas'
                  : 'Clique para ativar notificações sonoras e visuais'
              }
            >
              {permission === 'granted' ? (
                <BellRing className="w-4 h-4 text-teal-600" />
              ) : (
                <Bell className="w-4 h-4" />
              )}
            </button>
          )}

          {!isOnline ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
              <WifiOff className="w-3.5 h-3.5" />
              Offline
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 rounded-full">
              <Wifi className="w-3.5 h-3.5" />
              Salvo
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

