import { useEffect, useState } from 'react';

type UseTimerOptions = {
  timeScale?: number;
};

type UseTimerReturn = {
  isRunning: boolean;
  secondsElapsed: number;
  secondsRemaining: number;
  start: (startTime?: Date) => void;
  stop: () => void;
};

export default function useTimer(
  duration: number,
  opts?: UseTimerOptions
): UseTimerReturn {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const timeScale = opts?.timeScale || 1;

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        if (now < startTime) {
          return;
        }
        const msElapsed = (now.getTime() - startTime.getTime()) * timeScale;
        if (msElapsed > duration * 1000) {
          setElapsed(duration);
          clearInterval(interval);
        } else {
          setElapsed(msElapsed / 1000);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  return {
    isRunning: !!startTime,
    secondsElapsed: Math.round(elapsed),
    secondsRemaining: duration - Math.round(elapsed),
    start: (startTime = new Date()) => {
      setElapsed(0);
      setStartTime(startTime);
    },
    stop: () => setStartTime(null),
  };
}
