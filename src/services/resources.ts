import { ImageFiltering, ImageSource, Sound } from 'excalibur';

import TileSetFile from '../images/ciabattas-revenge-sprites.png';
import TileSetFileExtruded from '../images/ciabattas-revenge-sprites.extruded.png';

export const Resources = {
  TileSet: new ImageSource(TileSetFile, false, ImageFiltering.Pixel),
  TileSetExtruded: new ImageSource(TileSetFileExtruded, false, ImageFiltering.Pixel),
  SFXCollect: new Sound('/sfx/collect.mp3'),
  SFXWin: new Sound('/sfx/win.mp3'),
  SFXTeleport: new Sound('/sfx/teleport.mp3'),
} as const;

export const TileSetGrid16 = { spriteHeight: 16, spriteWidth: 16, rows: 20, columns: 24 };
export const TileSetGrid32 = { spriteHeight: 32, spriteWidth: 32, rows: 10, columns: 12 };
