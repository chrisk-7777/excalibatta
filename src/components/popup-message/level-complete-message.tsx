import { useEffect, useState } from 'react';

import LevelCompletedSvg from './components/level-completed-svg';
import { G } from '../../services/global';

import styles from './popup-message.module.css';
import Levels from '../../levels/levels-map';
import { Level } from '../../services/level';

export default function LevelCompleteMessage() {
  const [isComplete, setIsComplete] = useState(false);

  const handleGoToNextLevel = () => {
    const level = G.game?.currentScene as Level;
    const levelsArray = Object.keys(Levels) as Array<keyof typeof Levels>;
    const currentIndex = levelsArray.findIndex((id) => {
      return id === level.currentLevelId;
    });
    const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];
    level.currentLevelId = nextLevelId;
  };

  // useKeyPress('Enter', () => {
  // handleGoToNextLevel();
  // });

  useEffect(() => {
    const handle = () => {
      setIsComplete(true);
    };

    G.on('Complete', handle);

    return () => {
      G.off('Complete', handle);
    };
  }, []);

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
