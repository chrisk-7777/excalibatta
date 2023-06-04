import { Engine, Vector } from 'excalibur';

import { GameObject } from './game-object';
import { TILES } from '../helpers/tiles';
import { Level } from '../services/level';
import {
  BODY_SKINS,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  FourDirections,
} from '../helpers/consts';

export class ConveyorTile extends GameObject {
  private frames = {
    [DIRECTION_LEFT]: TILES.CONVEYOR_LEFT,
    [DIRECTION_RIGHT]: TILES.CONVEYOR_RIGHT,
    [DIRECTION_UP]: TILES.CONVEYOR_UP,
    [DIRECTION_DOWN]: TILES.CONVEYOR_DOWN,
  };
  private direction: FourDirections;

  constructor(pos: Vector, level: Level, type: string, data: any) {
    super(pos, level, type);

    this.direction = data.direction;
  }

  onInitialize(): void {
    Object.entries(this.frames).map(([direction, tile]) => {
      this.graphics.add(direction, this.generateGraphic(tile));
    });
  }

  autoMovesBodyOnCollide() {
    return this.direction;
  }

  changesHeroSkinOnCollide() {
    return BODY_SKINS.CONVEYOR;
  }

  onPostUpdate() {
    this.graphics.use(this.direction);
  }
}
