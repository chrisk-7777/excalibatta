import { Actor, Camera, CameraStrategy, Vector } from 'excalibur';
import { lerp } from '../helpers/lerp';

export class LerpStrategy implements CameraStrategy<Actor> {
  constructor(public target: Actor) {}
  public action = (target: Actor, cam: Camera) => {
    const center = target.center;
    const currentFocus = cam.getFocus();

    const nextX = Math.round(lerp(currentFocus.x, center.x, 0.1));
    const nextY = Math.round(lerp(currentFocus.y, center.y, 0.1));

    return new Vector(nextX, nextY);
  };
}
