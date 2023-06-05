import { GameEvent } from 'excalibur';
import { useEffect } from 'react';

import { game } from '../services/game';

export function useGameEvent<T>(key: string, callback: (event: GameEvent<T>) => void) {
  useEffect(() => {
    game.on(key, callback);

    return () => {
      game.off(key, callback);
    };
  }, [key, callback]);
}
