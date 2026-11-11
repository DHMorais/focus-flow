// Sintentizador de som relaxante usando a Web Audio API nativa
// Sem necessidade de arquivos mp3 externos, roda 100% offline
class AudioService {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Toca um acorde sutil e gratificante ao concluir uma tarefa (Estímulo de Dopamina)
  playCompletionSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Notas suaves: C5, E5, G5 (Tríade Maior em Bell/Marimba)
      const frequencies = [523.25, 659.25, 783.99];

      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.01, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.18, now + index * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.6);
      });
    } catch (e) {
      console.warn('Áudio não suportado ou bloqueado', e);
    }
  }

  // Toca um suave carrilhão duplo quando o timer de foco finaliza
  playTimerCompleteSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const notes = [440, 554.37, 659.25, 880];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.01, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.8);
      });
    } catch (e) {
      console.warn('Áudio não suportado ou bloqueado', e);
    }
  }
}

export const audioService = new AudioService();
