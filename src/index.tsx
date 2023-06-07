import React from 'react';
import ReactDOM from 'react-dom/client';

import { Game } from './services/game';
import { DeathMessage } from './components/popup-message/death-message';
import { LevelCompleteMessage } from './components/popup-message/level-complete-message';
import { loader } from './services/game-loader';
import { TopHud } from './components/top-hud/top-hud';

import './index.css';

(async () => {
  await Game.getInstance().start(loader);
  Game.getInstance().levelManager.start();
})();

ReactDOM.createRoot(document.getElementById('ui') as HTMLElement).render(
  <React.StrictMode>
    <TopHud />
    <LevelCompleteMessage />
    <DeathMessage />
  </React.StrictMode>
);
