import { GameObject } from './game-object';
import { TILES } from '../helpers/tiles';
import { Flour } from './flour';

export class Goal extends GameObject {
  get isDisabled(): boolean {
    const nonCollectedFlour = this.level.actors.find((p) => {
      return p instanceof Flour && p.active;
    });

    return nonCollectedFlour !== undefined;
  }

  completesLevelOnCollide(): boolean {
    return !this.isDisabled;
  }

  onInitialize(): void {
    this.graphics.add('disabled', this.generateGraphic(TILES.GOAL_DISABLED));
    this.graphics.add('enabled', this.generateGraphic(TILES.GOAL_ENABLED));
  }

  onPostUpdate(): void {
    this.graphics.show(this.isDisabled ? 'disabled' : 'enabled');
  }
}
