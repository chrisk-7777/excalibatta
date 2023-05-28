import { CELL_SIZE, PLACEMENT_TYPE_FLOUR } from '../../helpers/consts';
import Sprite from '../sprite/sprite';
import { TILES } from '../../helpers/tiles';
import PixelNumber from '../pixel-number/pixel-number';

import styles from './flour-count.module.css';

export default function FlourCount() {
  const count = '0';
  // level.placements.filter((p) => {
  //   return p.type === PLACEMENT_TYPE_FLOUR && !p.hasBeenCollected;
  // }).length;

  return (
    <div className={styles.flourCount}>
      <Sprite frameCoord={TILES.FLOUR} size={CELL_SIZE} />
      <PixelNumber number={count} />
    </div>
  );
}
