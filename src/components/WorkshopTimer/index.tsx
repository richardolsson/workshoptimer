'use client';

import { FC } from 'react';

import Duration from '../Duration';
import parseTimeStr from '../../utils/parseTimeStr';
import useLocalStorage from '../../hooks/useLocalStorage';
import useTimer from '../../hooks/useTimer';

type WorkshopSpecSection = {
  durationSeconds: number;
  title: string;
};

type WorkshopSpec = {
  sections: WorkshopSpecSection[];
  title: string;
};

type WorkshopTimerProps = {
  spec: WorkshopSpec;
};

const WorkshopTimer: FC<WorkshopTimerProps> = ({ spec }) => {
  const totalDuration = spec.sections.reduce(
    (sum, section) => sum + section.durationSeconds,
    0
  );

  const [rawStartTime, setRawStartTime] = useLocalStorage(
    'workshopStartTime',
    ''
  );

  const { isRunning, start, stop, secondsElapsed, secondsRemaining } =
    useTimer(totalDuration);

  let totalSectionTimes = 0;

  return (
    <div>
      <input
        onChange={(ev) => setRawStartTime(ev.target.value)}
        placeholder="Set start time"
        value={rawStartTime}
      />
      <button
        onClick={() => {
          if (isRunning) {
            stop();
          } else {
            const startTime = parseTimeStr(rawStartTime);
            if (startTime) {
              start(startTime);
            } else {
              const now = new Date();
              setRawStartTime(now.toTimeString().slice(0, 8));
              start(now);
            }
          }
        }}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <h1>
        <Duration seconds={secondsRemaining} />
      </h1>
      <h2>
        {spec.title} (<Duration seconds={totalDuration} />)
      </h2>
      <ul
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        {spec.sections.map((section, index) => {
          const startTime = totalSectionTimes;
          const endTime = startTime + section.durationSeconds;

          const remaining = endTime - secondsElapsed;
          const isPast = secondsElapsed >= endTime;
          const isCurrent =
            secondsElapsed >= startTime && secondsElapsed < endTime;

          // Increment before rendering next section
          totalSectionTimes = endTime;

          return (
            <li
              key={index}
              style={{
                listStyleType: 'none',
                margin: 0,
                opacity: isPast ? 0.5 : 1.0,
                padding: 20,
                position: 'relative',
              }}
            >
              <h3 style={{ margin: 0 }}>
                {section.title} (<Duration seconds={section.durationSeconds} />)
              </h3>
              <div>
                <Duration
                  seconds={
                    isPast ? 0 : isCurrent ? remaining : section.durationSeconds
                  }
                />
              </div>
              <div
                style={{
                  backgroundColor: isCurrent ? 'red' : 'gray',
                  bottom: 0,
                  height: isCurrent
                    ? Math.round(100 * (remaining / section.durationSeconds)) +
                      '%'
                    : isPast
                    ? 0
                    : '100%',
                  left: 0,
                  position: 'absolute',
                  width: '5px',
                }}
              ></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WorkshopTimer;
