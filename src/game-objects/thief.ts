import { BODY_SKINS, PLACEMENT_TYPE_HERO, Skin } from '../helpers/consts';
import { GameObject } from './game-object';
import { TILES } from '../helpers/tiles';

export class Thief extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.THIEF));
  }

  stealsInventoryOnCollide(body: GameObject): boolean {
    return body.type === PLACEMENT_TYPE_HERO;
  }

  changesHeroSkinOnCollide(): Skin {
    return BODY_SKINS.SCARED;
  }
}
