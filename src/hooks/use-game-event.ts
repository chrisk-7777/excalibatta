import { GameEvent } from 'excalibur';
import { useEffect } from 'react';

import { Game } from '../services/game';

export function useGameEvent<T>(key: string, callback: (event: GameEvent<T>) => void) {
  useEffect(() => {
    Game.getInstance().on(key, callback);

    return () => {
      Game.getInstance().off(key, callback);
    };
  }, [key, callback]);
}
