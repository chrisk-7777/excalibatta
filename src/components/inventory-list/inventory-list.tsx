import { useState } from 'react';

import { game } from '../../services/game';
import { TILES } from '../../helpers/tiles';
import { useGameEvent } from '../../hooks/use-game-event';
import { Sprite } from '../sprite/sprite';
import {
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_ICE_PICKUP,
  PLACEMENT_TYPE_WATER_PICKUP,
} from '../../helpers/consts';

import styles from './inventory-list.module.css';

const showInventory = [
  {
    key: PLACEMENT_TYPE_FIRE_PICKUP,
    tile: TILES.FIRE_PICKUP,
  },
  {
    key: PLACEMENT_TYPE_ICE_PICKUP,
    tile: TILES.ICE_PICKUP,
  },
  {
    key: PLACEMENT_TYPE_WATER_PICKUP,
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

  useGameEvent('InventoryUpdated', () => {
    const inventory = game.currentLevel.inventory;
    setFilteredInventory(showInventory.filter((i) => inventory.has(i.key)));
  });

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
