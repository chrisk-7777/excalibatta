import { Vector } from 'excalibur';

import { GameObject } from '../game-objects/game-object';
import { Level } from './level';
import { PLACEMENT_TYPE_GROUND_ENEMY, PLACEMENT_TYPE_HERO } from '../helpers/consts';

export class Collision {
  forBody: GameObject;
  level: Level;
  placementsAtPosition: Array<GameObject> = [];
  x: number;
  y: number;

  constructor(forBody: GameObject, level: Level, position: Vector | null = null) {
    this.forBody = forBody;
    this.level = level;
    this.x = position ? position.x : forBody.tile.x;
    this.y = position ? position.y : forBody.tile.y;
    this.scanPlacementsAtPosition();
  }

  scanPlacementsAtPosition() {
    this.placementsAtPosition = this.level.actors.filter((p) => {
      const isSelf = p.id === this.forBody.id;
      const isType = p instanceof GameObject;

      return !isSelf && isType && p.tile.x === this.x && p.tile.y === this.y;
    }) as Array<GameObject>;
  }

  withSolidPlacement() {
    return this.placementsAtPosition.find((p) => p.isSolidForBody(this.forBody));
  }

  withPlacementAddsToInventory() {
    if (this.forBody.canCollectItems) {
      return this.placementsAtPosition.find((p) => {
        return p.graphics.visible && p.addsItemToInventoryOnCollide();
      });
    }
    return null;
  }

  withCompletesLevel() {
    if (this.forBody.canCompleteLevel) {
      return this.placementsAtPosition.find((p) => {
        return p.completesLevelOnCollide();
      });
    }
    return null;
  }

  withLock() {
    return this.placementsAtPosition.find((p) => {
      return p.canBeUnlocked();
    });
  }

  withSelfGetsDamaged() {
    return this.placementsAtPosition.find((p) => {
      return p.damagesBodyOnCollide(this.forBody);
    });
  }

  withChangesHeroSkin() {
    return this.placementsAtPosition.find((p) => {
      return p.changesHeroSkinOnCollide();
    });
  }

  withPlacementMovesBody(): GameObject | null {
    if (this.forBody.interactsWithGround) {
      return (
        this.placementsAtPosition.find((p) => {
          if (this.forBody.type !== PLACEMENT_TYPE_HERO && this.forBody.type !== PLACEMENT_TYPE_GROUND_ENEMY) {
            return false;
          }
          return p.autoMovesBodyOnCollide(this.forBody);
        }) ?? null
      );
    }
    return null;
  }

  // withIceCorner() {
  //   return this.placementsAtPosition.find((p) => {
  //     return p.type === PLACEMENT_TYPE_ICE && p.corner;
  //   });
  // }

  withDoorSwitch() {
    return this.placementsAtPosition.find((p) => {
      return p.switchesDoorsOnCollide(this.forBody);
    });
  }

  withTeleport() {
    return this.placementsAtPosition.find((p) => {
      const teleportPos = p.teleportsToPositionOnCollide(this.forBody);
      return Boolean(teleportPos);
    });
  }

  withStealsInventory() {
    return this.placementsAtPosition.find((p) => {
      return p.stealsInventoryOnCollide(this.forBody);
    });
  }
}
