import { CELL_SIZE } from '../../helpers/consts';

import spritesheet from '../../images/ciabattas-revenge-sprites.png';

interface SpriteProps {
  frameCoord: readonly [number, number];
  size?: number;
}

export function Sprite(props: SpriteProps) {
  const { frameCoord, size = CELL_SIZE } = props;

  //Draw a graphic to the canvas tag
  const tileSheetX = frameCoord[0] * CELL_SIZE;
  const tileSheetY = frameCoord[1] * CELL_SIZE;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${spritesheet}`,
        backgroundPosition: `-${tileSheetX}px -${tileSheetY}px`,
      }}
    />
  );
}
