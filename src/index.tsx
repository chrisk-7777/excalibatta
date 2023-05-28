import React from 'react';
import ReactDOM from 'react-dom/client';
import { DisplayMode, Engine, Loader } from 'excalibur';

import { G } from './services/global';
import { Level } from './services/level';
import { Resources } from './services/resources';
import DeathMessage from './components/popup-message/death-message';
import LevelCompleteMessage from './components/popup-message/level-complete-message';
import TopHud from './components/top-hud/top-hud';

import './index.css';

import { DevTool } from '@excaliburjs/dev-tools';

G.game = new Engine({
  displayMode: DisplayMode.FitContainer,
  width: 16 * 16,
  height: 16 * 9,
  antialiasing: false,
  suppressConsoleBootMessage: true,
  suppressPlayButton: true,
  canvasElementId: 'game',
});
const d = new DevTool(G.game);

const level = new Level();

G.game.add('first-level', level);
G.game.goToScene('first-level');

class QuickLoader extends Loader {
  showPlayButton() {
    return new Promise<void>((resolve) => resolve());
  }

  draw() {
    // draw nothing!
  }
}

const loader = new QuickLoader();

for (const resourceKey in Resources) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const resource = Resources[resourceKey];
  loader.addResource(resource);
}

G.game.start(loader);

ReactDOM.createRoot(document.getElementById('ui') as HTMLElement).render(
  <React.StrictMode>
    <TopHud />
    <LevelCompleteMessage />
    <DeathMessage />
  </React.StrictMode>
);
