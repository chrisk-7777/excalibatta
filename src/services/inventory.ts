import { G } from '../services/global';

export class Inventory {
  inventoryMap: Map<string, boolean>;

  constructor() {
    this.inventoryMap = new Map();
  }

  has(key: string) {
    return Boolean(this.inventoryMap.has(key));
  }

  add(key: string) {
    if (!key) {
      console.warn('WARNING! Trying to add falsy key to Inventory', key);
      return;
    }

    this.inventoryMap.set(key, true);
    console.log(key, this.inventoryMap);

    G.emit('InventoryUpdated', { inventory: this });
  }

  clear() {
    this.inventoryMap = new Map();
  }
}
