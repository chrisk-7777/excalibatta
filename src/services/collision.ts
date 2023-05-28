import { Actor, Vector } from 'excalibur';
import { Player } from '../game-objects/player';
import { Level } from './level';
import { FirePickup } from '../game-objects/fire-pickup';
import { WaterPickup } from '../game-objects/water-pickup';
import { IcePickup } from '../game-objects/ice-pickup';
import { GreenKeyPickup } from '../game-objects/green-key-pickup';
import { BlueKeyPickup } from '../game-objects/blue-key-pickup';

export class Collision {
  forBody: Player;
  level: Level;
  placementsAtPosition: Array<Player | FirePickup> = [];
  x: number;
  y: number;

  constructor(forBody: Player, level: Level, position: Vector | null = null) {
    this.forBody = forBody;
    this.level = level;
    this.x = position ? position.x : forBody.pos.x;
    this.y = position ? position.y : forBody.pos.y;
    this.scanPlacementsAtPosition();
  }

  scanPlacementsAtPosition() {
    this.placementsAtPosition = this.level.actors.filter((p) => {
      const isSelf = p.id === this.forBody.id;
      const isType =
        p instanceof Player ||
        p instanceof FirePickup ||
        p instanceof WaterPickup ||
        p instanceof IcePickup ||
        p instanceof BlueKeyPickup ||
        p instanceof GreenKeyPickup;

      return !isSelf && isType && p.pos.x === this.x && p.pos.y === this.y;
    }) as any;
  }

  // withSolidPlacement() {
  //   return this.placementsAtPosition.find((p) => p.isSolidForBody(this.forBody));
  // }

  withPlacementAddsToInventory() {
    if (this.forBody.canCollectItems) {
      return this.placementsAtPosition.find((p) => {
        return p.active && p.addsItemToInventoryOnCollide();
      });
    }
    return null;
  }

  // withCompletesLevel() {
  //   if (this.forBody.canCompleteLevel) {
  //     return this.placementsAtPosition.find((p) => {
  //       return p.completesLevelOnCollide();
  //     });
  //   }
  //   return null;
  // }

  // withLock() {
  //   return this.placementsAtPosition.find((p) => {
  //     return p.canBeUnlocked();
  //   });
  // }

  // withSelfGetsDamaged() {
  //   return this.placementsAtPosition.find((p) => {
  //     return p.damagesBodyOnCollide(this.forBody);
  //   });
  // }

  // withChangesHeroSkin() {
  //   return this.placementsAtPosition.find((p) => {
  //     return p.changesHeroSkinOnCollide();
  //   });
  // }

  // withPlacementMovesBody() {
  //   if (this.forBody.interactsWithGround) {
  //     return this.placementsAtPosition.find((p) => {
  //       return p.autoMovesBodyOnCollide(this.forBody);
  //     });
  //   }
  //   return null;
  // }

  // withIceCorner() {
  //   return this.placementsAtPosition.find((p) => {
  //     return p.type === PLACEMENT_TYPE_ICE && p.corner;
  //   });
  // }

  // withDoorSwitch() {
  //   return this.placementsAtPosition.find((p) => {
  //     return p.switchesDoorsOnCollide(this.forBody);
  //   });
  // }

  // withTeleport() {
  //   return this.placementsAtPosition.find((p) => {
  //     const teleportPos = p.teleportsToPositionOnCollide(this.forBody);
  //     return Boolean(teleportPos);
  //   });
  // }

  // withStealsInventory() {
  //   return this.placementsAtPosition.find((p) => {
  //     return p.stealsInventoryOnCollide(this.forBody);
  //   });
  // }
}
