import { FC } from 'react';

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

  return (
    <div>
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
