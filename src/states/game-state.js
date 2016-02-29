import {State} from 'phaser';
import PixelScaler from 'lib/pixel-scaler';

import {PIXEL_SCALE} from 'core/game';
import toUpdate from 'core/to-update';

export default class GameState extends State {
  constructor() {
    super();

    Object.assign(this, toUpdate());
  }

  create() {
    if (!this.game.pixelScalerEnabled) {
      this.game.plugins.add(PixelScaler, PIXEL_SCALE);
      this.game.pixelScalerEnabled = true;
    }
  }

  update() {
    this.runToUpdate();
  }
}
