import { useEffect, useState } from 'react';

import { G } from '../../services/global';
import { Inventory, InventoryItems } from '../../services/inventory';
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
  const [inventory, setInventory] = useState<InventoryItems>({});

  useEffect(() => {
    const handle = (e: any) => {
      setInventory(e.inventory);
    };

    G.on('InventoryUpdated', handle);
    return () => G.off('InventoryUpdated', handle);
  }, []);

  if (!inventory) {
    return null;
  }

  return (
    <div className={styles.inventory}>
      {showInventory
        .filter((i) => inventory[i.key])
        .map((i) => (
          <div key={i.key} className={styles.inventoryEntry}>
            <Sprite frameCoord={i.tile} />
          </div>
        ))}
    </div>
  );
}
