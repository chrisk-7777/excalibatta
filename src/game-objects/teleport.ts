import { GameObject } from './game-object';
import { BODY_SKINS, Skin } from '../helpers/consts';
import { TILES } from '../helpers/tiles';

export class Teleport extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.TELEPORT1));
  }

  changesHeroSkinOnCollide(): Skin {
    return BODY_SKINS.TELEPORT;
  }

  teleportsToPositionOnCollide(body: GameObject): false | { x: number; y: number } {
    if (body.interactsWithGround) {
      // Get all teleports
      const allTeleports = this.level.actors.filter((p) => {
        return p instanceof Teleport;
      }) as Array<Teleport>;

      // Find the next teleport
      if (allTeleports.length > 1) {
        const myIndex = allTeleports.findIndex((p) => p.id === this.id);
        const next = allTeleports[myIndex + 1] ?? allTeleports[0];
        return {
          x: next.tile.x,
          y: next.tile.y,
        };
      }
    }
    return false;
  }
}
