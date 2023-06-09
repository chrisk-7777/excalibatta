import { Loader, vec } from 'excalibur';

import { Resources } from './resources';
import { SKIP_LOADER } from '../helpers/consts';

class GameLoader extends Loader {
  draw() {
    /* draw nothing */
  }
}

export const loader = SKIP_LOADER ? new GameLoader() : new Loader();
loader.logo =
  'data:image/png;base64,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';
loader.logoWidth = 144;
loader.logoHeight = 144;
loader.logoPosition = vec(768 / 2 - 144 / 2, 140);

Object.entries(Resources).map(([, resource]) => {
  loader.addResource(resource);
});
