import { Loader } from 'excalibur';

import { Resources } from './resources';

class QuickLoader extends Loader {
  // showPlayButton() {
  //   return new Promise<void>((resolve) => resolve());
  // }
  // draw() {
  //   // draw nothing!
  // }
}

export const loader = new QuickLoader();

for (const resourceKey in Resources) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const resource = Resources[resourceKey];
  loader.addResource(resource);
}
