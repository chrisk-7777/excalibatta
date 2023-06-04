import { LevelTheme } from '../helpers/consts';
import DemoLevel1 from './demo-level-1';
import DemoLevel2 from './demo-level-2';

export type LevelKey = keyof typeof levelsMap;

export type LevelData = {
  theme: LevelTheme;
  timeAvailable: number;
  tilesWidth: number;
  tilesHeight: number;
  placements: Array<{
    x: number;
    y: number;
    type: string;
    data?: unknown;
  }>;
};

export const levelsMap = {
  DemoLevel1: DemoLevel1,
  DemoLevel2: DemoLevel2,
} as const;

export const Levels: Array<LevelKey> = ['DemoLevel1', 'DemoLevel2'];
