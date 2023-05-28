import { Resources } from './resources';

export const SFX = {
  COLLECT: 'SFXCollect',
  WIN: 'SFXWin',
  TELEPORT: 'SFXTeleport',
} as const;

type Keys = keyof typeof SFX;
type Values = (typeof SFX)[Keys];

export class Sounds {
  playSfx(key: Values) {
    // Play it with current volume setting
    // howl.volume(this.sfxVolume);
    Resources[key].play();
  }
}

const soundsManager = new Sounds();

export default soundsManager;
