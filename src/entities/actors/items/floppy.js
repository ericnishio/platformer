import Item, {TYPE_MISSION_ITEM} from './item';
import {getGame} from 'core/game';

/**
 * @param {number} x
 * @param {number} y
 * @param {Object} [params]
 * @return {PowerCell}
 */
export default (x, y, params = {}) => {
  const floppy = new Floppy(getGame(), x, y);

  if (params.id) {
    floppy.id = params.id;
  }

  return floppy;
};

export class Floppy extends Item {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'items-1x1-1', 5);

    this.name = 'Floppy';
    this.itemType = TYPE_MISSION_ITEM;
    this.body.allowGravity = false;

    this.effects.pickup = this.game.add.audio('powerup2', 1, false);
  }

  /**
   * @inheritdoc
   */
  handleCollision(actor) {
    super.handleCollision(actor);

    if (actor.getComponent('hasInventory')) {
      this.kill();
      actor.getComponent('hasInventory').addToInventory(this);
      this.effects.pickup.play();
    }
  }
}
