import { useState } from 'react';
import LevelCompletedSvg from './components/level-completed-svg';
import styles from './popup-message.module.css';

export default function LevelCompleteMessage() {
  const [isComplete, setIsComplete] = useState(false);

  const handleGoToNextLevel = () => {
    // const levelsArray = Object.keys(LevelsMap);
    // const currentIndex = levelsArray.findIndex((id) => {
    //   return id === currentId;
    // });
    // const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];
    // setCurrentId(nextLevelId);
  };

  // useKeyPress('Enter', () => {
  // handleGoToNextLevel();
  // });

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
