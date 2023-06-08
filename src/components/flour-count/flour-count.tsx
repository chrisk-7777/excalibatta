import { useState } from 'react';

import { CELL_SIZE } from '../../helpers/consts';
import { Flour } from '../../game-objects/flour';
import { Game } from '../../services/game';
import { GAME_EVENTS } from '../../helpers/events';
import { PixelNumber } from '../pixel-number/pixel-number';
import { Sprite } from '../sprite/sprite';
import { TILES } from '../../helpers/tiles';
import { useGameEvent } from '../../hooks/use-game-event';

import styles from './flour-count.module.css';

export default function FlourCount() {
  const [count, setCount] = useState('0');

  const handleUpdate = () => {
    const count = Game.getInstance().currentLevel.gameObjects.filter((p) => {
      return p instanceof Flour && p.graphics.visible;
    });

    setCount((count ?? []).length.toString());
  };

  useGameEvent(GAME_EVENTS.LEVEL_START, handleUpdate);
  useGameEvent(GAME_EVENTS.INVENTORY_UPDATED, handleUpdate);

  return (
    <div className={styles.flourCount}>
      <Sprite frameCoord={TILES.FLOUR} size={CELL_SIZE} />
      <PixelNumber number={count} />
    </div>
  );
}
