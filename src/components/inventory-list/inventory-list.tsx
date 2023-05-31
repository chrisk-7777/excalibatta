import { useEffect, useState } from 'react';

import { G } from '../../services/global';
import { Level } from '../../services/level';
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
  const [filteredInventory, setFilteredInventory] = useState<typeof showInventory>([]);

  useEffect(() => {
    const handle = () => {
      // TODO Nasty ref
      const inventory = (G.game?.currentScene as Level).inventory;
      setFilteredInventory(showInventory.filter((i) => inventory.has(i.key)));
    };

    G.on('InventoryUpdated', handle);
    return () => G.off('InventoryUpdated', handle);
  }, []);

  if (!filteredInventory) {
    return null;
  }

  return (
    <div className={styles.inventory}>
      {filteredInventory.map((i) => (
        <div key={i.key} className={styles.inventoryEntry}>
          <Sprite frameCoord={i.tile} />
        </div>
      ))}
    </div>
  );
}
