import { CELL_SIZE } from '../../helpers/consts';
import Sprite from '../sprite/sprite';
import { TILES } from '../../helpers/tiles';
import PixelNumber from '../pixel-number/pixel-number';

import styles from './flour-count.module.css';
import { G } from '../../services/global';
import { useEffect, useState } from 'react';
import { Flour } from '../../game-objects/flour';

export default function FlourCount() {
  const [count, setCount] = useState('0');

  useEffect(() => {
    const handle = () => {
      const count = G.game?.currentScene.actors.filter((p) => {
        return p instanceof Flour && p.graphics.visible;
      });

      setCount((count ?? []).length.toString());
    };

    G.on('InventoryUpdated', handle);
    return () => G.off('InventoryUpdated', handle);
  }, []);

  return (
    <div className={styles.flourCount}>
      <Sprite frameCoord={TILES.FLOUR} size={CELL_SIZE} />
      <PixelNumber number={count} />
    </div>
  );
}
