import React from 'react';
import ReactDOM from 'react-dom/client';
import { DisplayMode, Engine } from 'excalibur';
// import { DevTool } from '@excaliburjs/dev-tools';

import { CELL_SIZE } from './helpers/consts';
import { G } from './services/global';
import { loader } from './services/quick-loader';
import DeathMessage from './components/popup-message/death-message';
import LevelCompleteMessage from './components/popup-message/level-complete-message';
import TopHud from './components/top-hud/top-hud';
import { LevelManager } from './services/level-manager';

import './index.css';

G.game = new Engine({
  displayMode: DisplayMode.FitContainer,
  width: CELL_SIZE * 16,
  height: CELL_SIZE * 9,
  antialiasing: false,
  suppressConsoleBootMessage: true,
  suppressPlayButton: true,
  canvasElementId: 'game',
});
G.game.showDebug(false);
// new DevTool(G.game);

G.game.snapToPixel = true;

G.levelManager = new LevelManager(G.game);

G.game.start(loader);
G.levelManager.start();

ReactDOM.createRoot(document.getElementById('ui') as HTMLElement).render(
  <React.StrictMode>
    <TopHud />
    <LevelCompleteMessage />
    <DeathMessage />
  </React.StrictMode>
);
