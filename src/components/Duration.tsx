import { FC } from 'react';

type DurationProps = {
  seconds: number;
};

const Duration: FC<DurationProps> = ({ seconds }) => {
  const displayHours = Math.floor(seconds / 3600);
  const displayMinutes = Math.floor(seconds / 60) % 60;
  const displaySeconds = seconds % 60;

  return (
    <span style={{ display: 'inline-flex', gap: '0.2em' }}>
      <span>{displayHours.toString().padStart(2, '0')}h</span>
      <span>{displayMinutes.toString().padStart(2, '0')}m</span>
      <span>{displaySeconds.toString().padStart(2, '0')}s</span>
    </span>
  );
};

export default Duration;
