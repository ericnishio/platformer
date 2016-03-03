import Actor, {createActor} from 'entities/actors/actor';

/**
 * @param {string} className
 * @param {number} x
 * @param {number} y
 * @param {Object} [options]
 * @return {Item}
 */
export function createStructure(className, x, y, options = {}) {
  return createActor('structures', className, x, y, options);
}

export default class Structure extends Actor {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   * @param {string} spritesheet
   * @param {number} tileIndex
   */
  constructor(game, x, y, spritesheet, tileIndex) {
    super(game, x, y, spritesheet, tileIndex);

    this.anchor.setTo(0, 0.5);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 280;
  }
}
