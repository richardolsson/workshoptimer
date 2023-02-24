'use client';

import { FC } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import WorkshopTimer, { WorkshopSpec } from '../components/WorkshopTimer';

const SPECS: WorkshopSpec[] = [
  {
    sections: [
      {
        bullets: [
          'Summary of previous work (1min)',
          'PF intro: Explain all the aspects and facts (10 min)',
          'Goal: Strategic-level understanding and decisions (1 min)',
        ],
        durationSeconds: 12 * 60,
        title: '1. Intro',
      },
      {
        durationSeconds: 2 * 60,
        title: '2. SAILBOAT: INTRO',
      },
      {
        durationSeconds: 2 * 60,
        title: '2.1. Sailboat: Wind brainstorm',
      },
      {
        bullets: ['Share 3 notes maximum'],
        durationSeconds: 2 * 60,
        title: '2.2. Sailboat: Wind share',
      },
      {
        durationSeconds: 1 * 60,
        title: '2.3. Sailboat: Current brainstorm',
      },
      {
        bullets: ['Share 3 notes maximum'],
        durationSeconds: 2 * 60,
        title: '2.4. Sailboat: Current share',
      },
      {
        durationSeconds: 5 * 60,
        title: '2.5. Sailboat: Discuss',
      },
      {
        durationSeconds: 3 * 60,
        title: '3. PF VOTING: INTRO',
      },
      {
        bullets: ['Important: Only vote for CONTEXT facts now'],
        durationSeconds: 1 * 60,
        title: '3.1. PF Voting: Context intro',
      },
      {
        bullets: ['9 positives', '6 negatives'],
        durationSeconds: 6 * 60,
        title: '3.2. PF Voting: Context voting',
      },
      {
        durationSeconds: 1 * 60,
        title: '3.3. PF Voting: Product intro',
      },
      {
        bullets: ['6 positives', '3 negatives'],
        durationSeconds: 5 * 60,
        title: '3.4. PF Voting: Product voting',
      },
      {
        durationSeconds: 5 * 60,
        title: '4. BREAK',
      },
      {
        durationSeconds: 40 * 60,
        title: '5. DISCUSSION',
      },
      {
        durationSeconds: 3 * 60,
        title: '6. CHECKOUT',
      },
    ],
    title: 'PF voting',
  },
  {
    sections: [
      {
        bullets: [
          'Look at PF from yesterday',
          'Explain end goal: Roadmap',
          'Explain goal of today: Prioritized list of features to be estimated by devs',
        ],
        durationSeconds: 10 * 60,
        title: '1. Intro',
      },
      {
        durationSeconds: 3 * 60,
        title: '2.1 Brainstorm features',
      },
      {
        durationSeconds: 3 * 60,
        title: '2.2 Share features',
      },
      {
        durationSeconds: 3 * 60,
        title: '2.3 Cluster features',
      },
      {
        durationSeconds: 4 * 60,
        title: '3.1 Brainstorm context',
      },
      {
        durationSeconds: 3 * 60,
        title: '2.2 Share context facts',
      },
      {
        bullets: ['What facts relate to what features?'],
        durationSeconds: 25 * 60,
        title: '2.3 Discuss',
      },
      {
        durationSeconds: 2 * 60,
        title: '3.1 Prioritization: Intro',
      },
      {
        bullets: ['3 votes per person'],
        durationSeconds: 2 * 60,
        title: '3.2 Prioritization: Dot voting',
      },
      {
        durationSeconds: 5 * 60,
        title: 'BREAK',
      },
    ],
    title: 'Roadmap kick-off',
  },
  {
    sections: [
      {
        durationSeconds: 3 * 60,
        title: 'INTRO',
      },
      {
        durationSeconds: 1 * 60,
        title: 'Who is the user? Brainstorm',
      },
      {
        durationSeconds: 3 * 60,
        title: 'Who is the user? Share',
      },
      {
        durationSeconds: 2 * 60,
        title: 'What do they want to achieve? Brainstorm',
      },
      {
        durationSeconds: 4 * 60,
        title: 'What do they want to achieve? Share',
      },
      {
        durationSeconds: 2 * 60,
        title: 'How are they achieving it today? Brainstorm',
      },
      {
        durationSeconds: 4 * 60,
        title: 'How are they achieving it today? Share',
      },
      {
        durationSeconds: 2 * 60,
        title: 'What problems do they run into? Brainstorm',
      },
      {
        durationSeconds: 4 * 60,
        title: 'What problems do they run into? Share',
      },
      {
        durationSeconds: 20 * 60,
        title: 'Reflection',
      },
    ],
    title: 'High-level feature definition',
  },
];

const StartPage: FC = () => {
  const [specIdx, setSpecIdx] = useLocalStorage('specIdx', -1);
  const spec = SPECS[specIdx];

  return (
    <div>
      <h1>Workshop timer</h1>
      <div style={{ marginBottom: 40 }}>
        <select
          onChange={(ev) => setSpecIdx(parseInt(ev.target.value))}
          value={specIdx}
        >
          {SPECS.map((spec, index) => (
            <option key={index} value={index}>
              {spec.title}
            </option>
          ))}
        </select>
      </div>
      {spec && <WorkshopTimer spec={spec} />}
    </div>
  );
};

export default StartPage;
