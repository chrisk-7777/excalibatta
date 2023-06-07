import { useState } from 'react';

import { TILES } from '../../helpers/tiles';
import { Game } from '../../services/game';
import { useGameEvent } from '../../hooks/use-game-event';
import { useKeyPress } from '../../hooks/use-key-press';
import { Sprite } from '../sprite/sprite';
import {
  DEATH_TYPE_CLOCK,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_FLYING_ENEMY,
  PLACEMENT_TYPE_ROAMING_ENEMY,
  PLACEMENT_TYPE_WATER,
  PLACEMENT_TYPE_CIABATTA,
  CELL_SIZE,
} from '../../helpers/consts';

import LevelFailedSvg from './components/level-failed-svg';
import styles from './popup-message.module.css';

const showDeathType = (deathType: string | null) => {
  switch (deathType) {
    case PLACEMENT_TYPE_FIRE:
      return <Sprite size={CELL_SIZE} frameCoord={TILES.FIRE1} />;
    case PLACEMENT_TYPE_WATER:
      return <Sprite size={CELL_SIZE} frameCoord={TILES.WATER1} />;
    case DEATH_TYPE_CLOCK:
      return <Sprite size={CELL_SIZE} frameCoord={TILES.CLOCK} />;
    case PLACEMENT_TYPE_GROUND_ENEMY:
      return (
        <div className={styles.spriteSmall}>
          <Sprite frameCoord={TILES.ENEMY_RIGHT} size={32} />
        </div>
      );
    case PLACEMENT_TYPE_ROAMING_ENEMY:
      return (
        <div className={styles.spriteSmall}>
          <Sprite frameCoord={TILES.ENEMY_ROAMING} size={32} />
        </div>
      );
    case PLACEMENT_TYPE_FLYING_ENEMY:
      return (
        <div className={styles.spriteSmall}>
          <Sprite frameCoord={TILES.ENEMY_FLYING_RIGHT} size={32} />
        </div>
      );
    case PLACEMENT_TYPE_CIABATTA:
      return (
        <div className={styles.spriteLarge}>
          <Sprite frameCoord={TILES.CIABATTA_RIGHT} size={48} />
        </div>
      );
    default:
      return null;
  }
};

export function DeathMessage() {
  const [deathOutcome, setDeathOutcome] = useState<string | null>(null);
  const handleRestartLevel = () => {
    if (deathOutcome === null) {
      return;
    }

    // A bit icky. ditto with timer, needs a reset event ?
    setDeathOutcome(null);
    Game.getInstance().levelManager.resetCurrent();
  };

  useKeyPress('Enter', () => {
    handleRestartLevel();
  });

  useGameEvent('Death', () => {
    setDeathOutcome(Game.getInstance().currentLevel.deathOutcome);
  });

  if (deathOutcome === null) {
    return null;
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.popupContainer}>
        <button onClick={handleRestartLevel} className={styles.quietButton}>
          <LevelFailedSvg />
          <div className={styles.deathTypeContainer}>{showDeathType(deathOutcome)}</div>
        </button>
      </div>
    </div>
  );
}
