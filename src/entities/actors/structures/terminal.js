import Structure from './structure';
import {getGame} from 'core/game';

/**
 * @param {number} x
 * @param {number} y
 * @return {Terminal}
 */
export default (x, y) => {
  return new Terminal(getGame(), x, y);
};

export class Terminal extends Structure {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'terminal-facing-right', 0);

    this.name = 'Terminal';
    this.anchor.setTo(0, 0);
    this.body.allowGravity = false;
    this.body.immovable = true;

    this.animations.add('scrollText');
  }

  update() {
    this.animations.play('scrollText', 4, true);
  }
}
