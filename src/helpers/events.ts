import { GameEvent as ExGameEvent } from 'excalibur';

export const GAME_EVENTS = {
  CLOCK_TICK: 'ClockTick',
  DEATH: 'Death',
  INVENTORY_UPDATED: 'InventoryUpdated',
  COMPLETE: 'Complete',
} as const;

export type GameEventPayload<T> = ExGameEvent<T>;
export type ClockTickPayload = { secondsRemaining: number };

export type GameEvent = (typeof GAME_EVENTS)[keyof typeof GAME_EVENTS];
