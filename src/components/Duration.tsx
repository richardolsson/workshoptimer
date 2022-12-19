import { FC } from 'react';

type DurationProps = {
  seconds: number;
};

const Duration: FC<DurationProps> = ({ seconds }) => {
  const displayHours = Math.floor(seconds / 3600);
  const displayMinutes = Math.floor(seconds / 60) % 60;
  const displaySeconds = seconds % 60;

  const strSeconds = displaySeconds.toString().padStart(2, '0');
  const strMinutes = displayHours
    ? displayMinutes.toString().padStart(2, '0')
    : displayMinutes.toString();
  const strHours = displayHours ? displayHours.toString() : null;

  return (
    <span style={{ display: 'inline-flex', gap: '0.2em' }}>
      {strHours && <span>{displayHours}h</span>}
      <span>{strMinutes}m</span>
      <span>{strSeconds}s</span>
    </span>
  );
};

export default Duration;
