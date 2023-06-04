import { useState } from 'react';

import { CELL_SIZE } from '../../helpers/consts';
import { Flour } from '../../game-objects/flour';
import { G } from '../../services/global';
import { TILES } from '../../helpers/tiles';
import { useGameEvent } from '../../hooks/use-game-event';
import PixelNumber from '../pixel-number/pixel-number';
import Sprite from '../sprite/sprite';

import styles from './flour-count.module.css';

export default function FlourCount() {
  const [count, setCount] = useState('0');

  useGameEvent('InventoryUpdated', () => {
    const count = G.game?.currentScene.actors.filter((p) => {
      return p instanceof Flour && p.graphics.visible;
    });

    setCount((count ?? []).length.toString());
  });

  return (
    <div className={styles.flourCount}>
      <Sprite frameCoord={TILES.FLOUR} size={CELL_SIZE} />
      <PixelNumber number={count} />
    </div>
  );
}
