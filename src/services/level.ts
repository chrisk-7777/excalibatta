import { Scene, vec } from 'excalibur';

import { Inventory } from '../services/inventory';
import { Clock } from '../services/clock';
import { Player } from '../game-objects/player';
import { FirePickup } from '../game-objects/fire-pickup';
import { WaterPickup } from '../game-objects/water-pickup';
import { IcePickup } from '../game-objects/ice-pickup';
import { BlueKeyPickup } from '../game-objects/blue-key-pickup';
import { GreenKeyPickup } from '../game-objects/green-key-pickup';

export class Level extends Scene {
  inventory: Inventory;
  deathOutcome: string | null = null;
  clock: Clock;

  constructor() {
    super();

    this.inventory = new Inventory();
    this.clock = new Clock(77, this);
  }

  onInitialize(): void {
    this.add(new FirePickup(vec(16 * 1, 16 * 4), this));
    this.add(new WaterPickup(vec(16 * 3, 16 * 4), this));
    this.add(new IcePickup(vec(16 * 5, 16 * 4), this));
    this.add(new GreenKeyPickup(vec(16 * 7, 16 * 4), this));
    this.add(new BlueKeyPickup(vec(16 * 9, 16 * 4), this));
    this.add(new Player(vec(16 * 1, 16 * 1), this));
  }

  setDeathOutcome(causeOfDeath: string) {
    this.deathOutcome = causeOfDeath;
    // this.gameLoop.stop();
  }

  onPostUpdate(): void {
    this.clock.tick();
  }
}
