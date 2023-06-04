import { Vector } from 'excalibur';

import { GameObject } from './game-object';
import { GroundEnemy } from './ground-enemy';
import { Level } from '../services/level';
import { Player } from './player';
import { TILES } from '../helpers/tiles';
import {
  BODY_SKINS,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  FourDirections,
  ICE_CORNERS,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_ICE_PICKUP,
} from '../helpers/consts';

export class IceTile extends GameObject {
  private frames = {
    [ICE_CORNERS.TOP_LEFT]: TILES.ICE_TOP_LEFT,
    [ICE_CORNERS.TOP_RIGHT]: TILES.ICE_TOP_RIGHT,
    [ICE_CORNERS.BOTTOM_LEFT]: TILES.ICE_BOTTOM_LEFT,
    [ICE_CORNERS.BOTTOM_RIGHT]: TILES.ICE_BOTTOM_RIGHT,
  };
  private iceTileCornerBlockedMoves: Record<keyof typeof ICE_CORNERS, { [key in FourDirections]?: boolean }> = {
    TOP_LEFT: {
      [DIRECTION_UP]: true,
      [DIRECTION_LEFT]: true,
    },
    TOP_RIGHT: {
      [DIRECTION_UP]: true,
      [DIRECTION_RIGHT]: true,
    },
    BOTTOM_LEFT: {
      [DIRECTION_DOWN]: true,
      [DIRECTION_LEFT]: true,
    },
    BOTTOM_RIGHT: {
      [DIRECTION_DOWN]: true,
      [DIRECTION_RIGHT]: true,
    },
  };
  private iceTileCornerRedirection = {
    TOP_LEFT: {
      [DIRECTION_UP]: DIRECTION_RIGHT,
      [DIRECTION_LEFT]: DIRECTION_DOWN,
    },
    TOP_RIGHT: {
      [DIRECTION_UP]: DIRECTION_LEFT,
      [DIRECTION_RIGHT]: DIRECTION_DOWN,
    },
    BOTTOM_LEFT: {
      [DIRECTION_LEFT]: DIRECTION_UP,
      [DIRECTION_DOWN]: DIRECTION_RIGHT,
    },
    BOTTOM_RIGHT: {
      [DIRECTION_RIGHT]: DIRECTION_UP,
      [DIRECTION_DOWN]: DIRECTION_LEFT,
    },
  };
  public corner: keyof typeof ICE_CORNERS | null;

  constructor(pos: Vector, level: Level, type: string, data: any) {
    super(pos, level, type);

    this.corner = data.corner ?? null;
  }

  onInitialize(): void {
    this.graphics.add('flat', this.generateGraphic(TILES.ICE));
    Object.entries(this.frames).map(([direction, tile]) => {
      this.graphics.add(direction, this.generateGraphic(tile));
    });
  }

  isSolidForBody(body: GameObject) {
    const bodyIsBelow = this.tile.y < body.tile.y;
    if (bodyIsBelow && this.corner?.includes('BOTTOM')) {
      return true;
    }
    const bodyIsAbove = this.tile.y > body.tile.y;
    if (bodyIsAbove && this.corner?.includes('TOP')) {
      return true;
    }
    const bodyIsToLeft = this.tile.x > body.tile.x;
    if (bodyIsToLeft && this.corner?.includes('LEFT')) {
      return true;
    }
    const bodyIsToRight = this.tile.x < body.tile.x;
    if (bodyIsToRight && this.corner?.includes('RIGHT')) {
      return true;
    }

    return false;
  }

  blocksMovementDirection(direction: FourDirections): boolean {
    if (this.corner) {
      return this.iceTileCornerBlockedMoves[this.corner][direction] ?? false;
    }
    return false;
  }

  autoMovesBodyOnCollide(body: GroundEnemy | Player): false | FourDirections {
    if (body.type === PLACEMENT_TYPE_HERO && this.level.inventory.has(PLACEMENT_TYPE_ICE_PICKUP)) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore type fixes
    const possibleRedirects = this.iceTileCornerRedirection[this.corner];
    if (possibleRedirects) {
      return possibleRedirects[body.mover.movingPixelDirection];
    }

    return body.mover.movingPixelDirection;
  }

  changesHeroSkinOnCollide() {
    if (this.level.inventory.has(PLACEMENT_TYPE_ICE_PICKUP)) {
      return BODY_SKINS.ICE;
    }

    return BODY_SKINS.SCARED;
  }

  onPostUpdate(): void {
    this.graphics.use(this.corner === null ? 'flat' : this.corner);
  }
}
