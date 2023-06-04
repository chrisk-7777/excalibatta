import { useState } from 'react';

import LevelCompletedSvg from './components/level-completed-svg';
import { G } from '../../services/global';

import styles from './popup-message.module.css';
import { useKeyPress } from '../../hooks/use-key-press';
import { useGameEvent } from '../../hooks/use-game-event';

export default function LevelCompleteMessage() {
  const [isComplete, setIsComplete] = useState(false);

  const handleGoToNextLevel = () => {
    if (!isComplete) {
      return;
    }

    G.levelManager.nextLevel();
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
