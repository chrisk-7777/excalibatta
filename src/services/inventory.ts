import { game } from './game';

export type InventoryItems = Map<string, boolean>;

export class Inventory {
  items: InventoryItems;

  constructor() {
    this.items = new Map();
  }

  has(key: string): boolean {
    return Boolean(this.items.has(key));
  }

  add(key: string): void {
    this.items.set(key, true);
    game.emit('InventoryUpdated', {});
  }

  clear(): void {
    this.items = new Map();
    game.emit('InventoryUpdated', {});
  }
}
