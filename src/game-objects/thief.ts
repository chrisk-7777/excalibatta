import { TILES } from '../helpers/tiles';
import { BODY_SKINS, PLACEMENT_TYPE_HERO } from '../helpers/consts';
import { GameObject } from './game-object';

export class Thief extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.THIEF));
  }

  stealsInventoryOnCollide(body: GameObject) {
    return body.type === PLACEMENT_TYPE_HERO;
  }

  changesHeroSkinOnCollide() {
    return BODY_SKINS.SCARED;
  }
}
