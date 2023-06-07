import { useEffect } from 'react';

import { Game } from '../services/game';
import { GameEvent, GameEventPayload } from '../helpers/events';

export function useGameEvent<T = never>(key: GameEvent, callback: (event: GameEventPayload<T>) => void): void {
  useEffect(() => {
    Game.getInstance().on(key, callback);

    return () => {
      Game.getInstance().off(key, callback);
    };
  }, [key, callback]);
}
