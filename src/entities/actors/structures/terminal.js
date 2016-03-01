import Structure from './structure';
import {getGame} from 'core/game';
import SpeechBubble from 'ui/speech-bubble';
import {nextMessages} from 'services/dialogue';

/**
 * @param {number} x
 * @param {number} y
 * @param {Object} params
 * @return {Terminal}
 */
export default (x, y, params = {}) => {
  const terminal = new Terminal(getGame(), x, y);

  if (params.id) {
    terminal.id = params.id;
  }

  return terminal;
};

export class Terminal extends Structure {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'terminal-facing-left', 0);

    this.name = 'Terminal';
    this.anchor.setTo(0, 0);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.isInteracting = false;

    this.animations.add('scrollText');
    this.animations.play('scrollText', 4, true);
  }

  /**
   * @param {Player} player
   * @param {GameState} stage
   */
  interact(player, stage) {
    if (!this.lastOverlap || this.game.time.now > this.lastOverlap) {
      const messages = nextMessages(this.id, stage);

      SpeechBubble(messages);
    }

    this.lastOverlap = this.game.time.now + 100;
  }

  /**
   * @inheritdoc
   */
  handleCollision(actor) {
    super.handleCollision(actor);
  }
}
