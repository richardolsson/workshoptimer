'use client';

import { FC } from 'react';
import useTimer from '../../useTimer';

import Duration from '../Duration';

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

  const { isRunning, start, stop, secondsElapsed, secondsRemaining } =
    useTimer(totalDuration);

  let totalSectionTimes = 0;

  return (
    <div>
      <button onClick={() => (isRunning ? stop() : start())}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <h1>
        <Duration seconds={secondsRemaining} />
      </h1>
      <h2>
        {spec.title} (<Duration seconds={totalDuration} />)
      </h2>
      <ul>
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
                margin: 0,
                opacity: isPast ? 0.5 : 1.0,
              }}
            >
              <h3 style={{ margin: 0 }}>
                {section.title}
                (<Duration seconds={section.durationSeconds} />)
                <p>
                  <Duration
                    seconds={
                      isPast
                        ? 0
                        : isCurrent
                        ? remaining
                        : section.durationSeconds
                    }
                  />
                </p>
              </h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WorkshopTimer;
