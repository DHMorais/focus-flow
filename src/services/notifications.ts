export const notificationService = {
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }
    if (Notification.permission === 'granted') {
      return true;
    }
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  },

  sendFocusCompleteNotification(taskTitle?: string) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = '🧠 Sessão de Foco Concluída!';
      const body = taskTitle
        ? `Parabéns! Você dedicou tempo de qualidade para: "${taskTitle}". Faça uma pausa curta!`
        : 'Sua sessão de foco terminou com sucesso. Respire fundo e faça um intervalo!';

      new Notification(title, {
        body,
        icon: '/pwa-192x192.png',
        badge: '/favicon.svg',
        tag: 'focus-timer-complete',
      });
    }
  }
};
