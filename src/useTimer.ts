import { useEffect, useState } from 'react';

type UseTimerReturn = {
  isRunning: boolean;
  secondsElapsed: number;
  secondsRemaining: number;
  start: () => void;
  stop: () => void;
};

export default function useTimer(duration: number): UseTimerReturn {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const msElapsed = now.getTime() - startTime.getTime();
        if (msElapsed > duration * 1000) {
          setElapsed(duration);
          clearInterval(interval);
        } else {
          setElapsed(msElapsed / 1000);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  return {
    isRunning: !!startTime,
    secondsElapsed: Math.round(elapsed),
    secondsRemaining: duration - Math.round(elapsed),
    start: () => {
      setElapsed(0);
      setStartTime(new Date());
    },
    stop: () => setStartTime(null),
  };
}
