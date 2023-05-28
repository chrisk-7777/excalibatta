import { useEffect, useState } from 'react';

import { CELL_SIZE } from '../../helpers/consts';
import { G } from '../../services/global';
import { TILES } from '../../helpers/tiles';
import PixelNumber from '../pixel-number/pixel-number';
import Sprite from '../sprite/sprite';

import styles from './clock-count.module.css';

export default function ClockCount() {
  const [secondsRemaining, setSecondsRemaining] = useState<number | string>('-');

  useEffect(() => {
    const handle = (e: any) => {
      setSecondsRemaining(e.secondsRemaining);
    };

    G.on('CLOCK_TICK', handle);

    return () => {
      G.off('CLOCK_TICK', handle);
    };
  }, []);

  return (
    <div className={styles.clockCount}>
      <Sprite frameCoord={TILES.CLOCK} size={CELL_SIZE} />
      {secondsRemaining !== null && <PixelNumber number={String(secondsRemaining)} />}
    </div>
  );
}
