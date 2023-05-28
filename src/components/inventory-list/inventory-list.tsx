import { useEffect, useState } from 'react';

import { G } from '../../services/global';
import { Inventory } from '../../services/inventory';
import { TILES } from '../../helpers/tiles';
import * as CONSTS from '../../helpers/consts';
import Sprite from '../sprite/sprite';

import styles from './inventory-list.module.css';

const showInventory = [
  {
    key: CONSTS.PLACEMENT_TYPE_FIRE_PICKUP,
    tile: TILES.FIRE_PICKUP,
  },
  {
    key: CONSTS.PLACEMENT_TYPE_ICE_PICKUP,
    tile: TILES.ICE_PICKUP,
  },
  {
    key: CONSTS.PLACEMENT_TYPE_WATER_PICKUP,
    tile: TILES.WATER_PICKUP,
  },
  {
    key: 'KEY_BLUE',
    tile: TILES.BLUE_KEY,
  },
  {
    key: 'KEY_GREEN',
    tile: TILES.GREEN_KEY,
  },
];

export default function InventoryList() {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [hack, setHack] = useState(0);

  useEffect(() => {
    const handle = (e: any) => {
      console.log('update received', e.inventory);
      setInventory(e.inventory);
      setHack((hack) => hack + 1); // force re-render because we're passing a reference to inventory which isn't reactive. think about better option for that
    };

    G.on('InventoryUpdated', handle);

    return () => {
      G.off('InventoryUpdated', handle);
    };
  }, []);

  if (!inventory) {
    return null;
  }

  console.log(inventory);
  return (
    <div className={styles.inventory}>
      {showInventory
        .filter((i) => inventory.has(i.key))
        .map((i) => (
          <div key={i.key} className={styles.inventoryEntry}>
            <Sprite frameCoord={i.tile} />
          </div>
        ))}
    </div>
  );
}
