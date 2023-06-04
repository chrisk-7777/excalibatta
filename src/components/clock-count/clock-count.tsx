import { useState } from 'react';

import { CELL_SIZE } from '../../helpers/consts';
import { TILES } from '../../helpers/tiles';
import PixelNumber from '../pixel-number/pixel-number';
import Sprite from '../sprite/sprite';

import styles from './clock-count.module.css';
import { useGameEvent } from '../../hooks/use-game-event';

export default function ClockCount() {
  const [secondsRemaining, setSecondsRemaining] = useState<number | string>('-');

  useGameEvent('ClockTick', (e: any) => {
    setSecondsRemaining(e.secondsRemaining);
  });

  return (
    <div className={styles.clockCount}>
      <Sprite frameCoord={TILES.CLOCK} size={CELL_SIZE} />
      {secondsRemaining !== null && <PixelNumber number={String(secondsRemaining)} />}
    </div>
  );
}
