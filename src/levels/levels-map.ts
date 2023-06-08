import { LevelTheme } from '../helpers/consts';
import { Demo_Level_1 } from './demo-level-1';
import { Demo_Level_2 } from './demo-level-2';
import { Level_1_1 } from './level-1-1';
import { Level_1_2 } from './level-1-2';
import { Level_1_3 } from './level-1-3';
import { Level_1_4 } from './level-1-4';
import { Level_2_1 } from './level-2-1';
import { Level_2_2 } from './level-2-2';
import { Level_2_3 } from './level-2-3';
import { Level_2_4 } from './level-2-4';

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
    [key: string]: unknown;
  }>;
};

export const levelsMap = {
  Level_1_1: Level_1_1,
  Level_1_2: Level_1_2,
  Level_1_3: Level_1_3,
  Level_1_4: Level_1_4,
  Level_2_1: Level_2_1,
  Level_2_2: Level_2_2,
  Level_2_3: Level_2_3,
  Level_2_4: Level_2_4,
  DemoLevel1: Demo_Level_1,
  DemoLevel2: Demo_Level_2,
} as const;

export const Levels: Array<LevelKey> = [
  'Level_1_1',
  'Level_1_2',
  'Level_1_3',
  'Level_1_4',
  'Level_2_1',
  'Level_2_2',
  'Level_2_3',
  'Level_2_4',
  'DemoLevel1',
  // 'DemoLevel2',
];
