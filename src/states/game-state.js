import {State} from 'phaser';
import {PIXEL_SCALE} from 'core/game';
import PixelScaler from 'lib/pixel-scaler';

export default class GameState extends State {
  create() {
    if (!this.game.pixelScalerEnabled) {
      this.game.plugins.add(PixelScaler, PIXEL_SCALE);
      this.game.pixelScalerEnabled = true;
    }
  }
}
