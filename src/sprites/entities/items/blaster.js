import Item from './item';
import Player from 'sprites/entities/creatures/player';

export default class Blaster extends Item {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'items-1x1-1', 1);

    this.power = 3;
    this.name = 'Blaster';
    this.itemType = Item.ITEM_TYPE_FIREARM;

    this.effects.pickup = this.game.add.audio('powerup2', 1, false);
  }

  /**
   * @inheritdoc
   */
  handleCollision(entity) {
    super.handleCollision(entity);

    if (entity instanceof Player) {
      this.effects.pickup.play();
      entity.addToInventory(this);
      this.kill();
    }
  }
}
