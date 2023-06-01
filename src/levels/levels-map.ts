import DemoLevel1 from './demo-level-1';
import DemoLevel2 from './demo-level-2';

const Levels = {
  DemoLevel1: DemoLevel1,
  DemoLevel2: DemoLevel2,
} as const;

export type LevelsMap = (typeof Levels)[keyof typeof Levels];

export default Levels;
