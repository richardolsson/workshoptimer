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

  const { isRunning, start, stop, secondsRemaining } = useTimer(totalDuration);

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
          return (
            <li
              key={index}
              style={{
                margin: 0,
              }}
            >
              <h3 style={{ margin: 0 }}>{section.title}</h3>
              <Duration seconds={section.durationSeconds} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WorkshopTimer;
