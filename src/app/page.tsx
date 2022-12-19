import { FC } from 'react';

import WorkshopTimer from '../components/WorkshopTimer';

const StartPage: FC = () => {
  return (
    <div>
      <h1>Workshop timer</h1>
      <WorkshopTimer
        spec={{
          sections: [
            {
              durationSeconds: 90,
              title: 'Foo',
            },
            {
              durationSeconds: 120,
              title: 'Bar',
            },
          ],
          title: 'My workshop',
        }}
      />
    </div>
  );
};

export default StartPage;
