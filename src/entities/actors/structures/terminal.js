import Structure from './structure';
import {getGame} from 'core/game';
import SpeechBubble from 'ui/speech-bubble';

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
    this.isInteracting = false;

    this.animations.add('scrollText');
  }

  update() {
    this.animations.play('scrollText', 4, true);
  }

  interact() {
    if (!this.lastOverlap || this.game.time.now > this.lastOverlap) {
      SpeechBubble([
        `Good morning,\nElenor. Doesn't\nearth look\ndashing today?`,
        `Why don't you\ngo out for a\nwalk and get\nsome fresh air?`,
        'Haha!'
      ]);
    }

    this.lastOverlap = this.game.time.now + 100;
  }
}
