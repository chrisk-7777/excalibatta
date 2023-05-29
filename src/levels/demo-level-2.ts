import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
} from "../helpers/consts";

const level = {
  theme: LEVEL_THEMES.YELLOW,
  tilesWidth: 8,
  tilesHeight: 5,
  placements: [
    { x: 1, y: 1, type: PLACEMENT_TYPE_HERO },
    { x: 7, y: 5, type: PLACEMENT_TYPE_GOAL },
    { x: 4, y: 4, type: PLACEMENT_TYPE_WALL },
    { x: 3, y: 2, type: PLACEMENT_TYPE_FLOUR },
    { x: 6, y: 4, type: PLACEMENT_TYPE_FLOUR },
  ],
};

export default level;
