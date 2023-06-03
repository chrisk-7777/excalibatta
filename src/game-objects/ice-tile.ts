import { BODY_SKINS, FourDirections, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_ICE_PICKUP } from '../helpers/consts';
import { GameObject } from './game-object';
import { TILES } from '../helpers/tiles';
import { Player } from './player';
import { GroundEnemy } from './ground-enemy';

export class IceTile extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.ICE));
  }

  isSolidForBody(body: GameObject): boolean {
    return body.turnsAroundAtWater ?? false;
  }

  changesHeroSkinOnCollide() {
    if (this.level.inventory.has(PLACEMENT_TYPE_ICE_PICKUP)) {
      return BODY_SKINS.ICE;
    }

    return BODY_SKINS.SCARED;
  }

  autoMovesBodyOnCollide(body: GroundEnemy | Player): false | FourDirections {
    if (body.type === PLACEMENT_TYPE_HERO && this.level.inventory.has(PLACEMENT_TYPE_ICE_PICKUP)) {
      return false;
    }

    // const possibleRedirects = iceTileCornerRedirection[this.corner];
    // if (possibleRedirects) {
    //   return possibleRedirects[body.movingPixelDirection];:8
    // }

    return body.mover.movingPixelDirection;
  }
}
