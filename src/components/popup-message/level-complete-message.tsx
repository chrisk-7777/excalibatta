import { useState } from 'react';

import { Game } from '../../services/game';
import { useGameEvent } from '../../hooks/use-game-event';
import { useKeyPress } from '../../hooks/use-key-press';
import LevelCompletedSvg from './components/level-completed-svg';

import styles from './popup-message.module.css';

export function LevelCompleteMessage() {
  const [isComplete, setIsComplete] = useState(false);

  const handleGoToNextLevel = () => {
    if (!isComplete) {
      return;
    }

    Game.getInstance().levelManager.nextLevel();
    setIsComplete(false);
  };

  useKeyPress('Enter', () => {
    handleGoToNextLevel();
  });

  useGameEvent('Complete', () => {
    setIsComplete(true);
  });

  if (!isComplete) {
    return null;
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.popupContainer}>
        <button className={styles.quietButton} onClick={handleGoToNextLevel}>
          <LevelCompletedSvg />
        </button>
      </div>
    </div>
  );
}
