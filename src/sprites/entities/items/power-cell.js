import Item from './item';
import Player from 'sprites/entities/creatures/player';

export default class PowerCell extends Item {
  /**
   * @param {Game} game
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

    if (entity instanceof Player) {
      this.kill();
      entity.addToInventory(this);
      this.effects.pickup.play();
    }
  }
}
