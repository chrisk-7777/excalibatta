import { GameEvent, Random, Engine } from 'excalibur';
import { LevelManager } from './level-manager';

type GlobalType = {
  game: Engine | null;
  levelManager: LevelManager;
  r: Random;
  getGame: () => Engine;
  emit: (eventName: string, eventObject?: any) => void;
  on: (eventName: string, handler: (event: GameEvent<any>) => void) => void;
  off: (eventName: string, handler?: (event: GameEvent<any>) => void) => void;
};

export const Global: GlobalType = {
  game: null,
  levelManager: null!,
  getGame: () => {
    if (!Global.game) {
      throw 'damn';
    }
    return Global.game;
  },
  emit: (eventName, eventObject = {}) => {
    Global.getGame().emit(eventName, eventObject);
  },
  on: (eventName, handler) => {
    Global.getGame().on(eventName, handler);
  },
  off: (eventName, handler) => {
    Global.getGame().off(eventName, handler);
  },
  r: new Random(),
};

export const G = Global;
