import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiFeedbackProps {
  trigger: boolean;
}

export const ConfettiFeedback: React.FC<ConfettiFeedbackProps> = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      // Dispara confetti sutil com cores calmantes
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#0d9488', '#2dd4bf', '#818cf8', '#f59e0b'],
        disableForReducedMotion: true,
      });
    }
  }, [trigger]);

  return null;
};
