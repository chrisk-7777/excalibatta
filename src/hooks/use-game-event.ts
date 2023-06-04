import { useEffect } from 'react';

import { G } from '../services/global';

export function useGameEvent(key: string, callback: (args: any) => void) {
  useEffect(() => {
    G.on(key, callback);

    return () => {
      G.off(key, callback);
    };
  }, [key, callback]);
}
