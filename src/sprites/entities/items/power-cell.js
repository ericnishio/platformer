import Item from './item';
import {getGame} from 'core/game';

/**
 * @param {number} x
 * @param {number} y
 * @return {PowerCell}
 */
export default (x, y) => {
  return new PowerCell(getGame(), x, y);
};

export class PowerCell extends Item {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'items-1x1-1', 2);

    this.name = 'Power Cell';
    this.itemType = Item.ITEM_TYPE_MISSION_ITEM;

    this.effects.pickup = this.game.add.audio('powerup2', 1, false);
  }

  /**
   * @inheritdoc
   */
  handleCollision(entity) {
    super.handleCollision(entity);

    if (entity.inventory) {
      this.kill();
      entity.addToInventory(this);
      this.effects.pickup.play();
    }
  }
}
