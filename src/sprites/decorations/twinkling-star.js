import Decoration from './decoration';
import {generateNumberBetween} from 'util/random';

export default class TwinklingStar extends Decoration {
  /**
   * @param {Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'terrain-1x1-1', 25);

    let twinkleFrameRates = [1.1, 1.3, 1.5, 1.7, 2, 2.2, 2.4];
    let twinkleFrameRate = twinkleFrameRates[generateNumberBetween(0, twinkleFrameRates.length - 1)];

    this.animations.add('twinkle', [26, 25], twinkleFrameRate, true);
    this.animations.play('twinkle');
  }
}
