import { G } from '../services/global';

export type InventoryItems = Record<string, boolean>;

export class Inventory {
  items: InventoryItems;

  constructor() {
    this.items = {};
  }

  add(key: string) {
    this.items[key] = true;
    G.emit('InventoryUpdated', { inventory: { ...this.items } });
  }

  clear() {
    this.items = {};
    G.emit('InventoryUpdated', { inventory: { ...this.items } });
  }
}
