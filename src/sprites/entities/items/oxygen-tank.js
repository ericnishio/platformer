import Item from './item';
import Player from 'sprites/entities/creatures/player';

export default class OxygenTank extends Item {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'items-1x1-1', 0);

    this.name = 'Oxygen Tank';
    this.itemType = Item.ITEM_TYPE_POWERUP;

    this.effects.pickup = this.game.add.audio('powerup1', 1, false);
  }

  /**
   * @inheritdoc
   */
  handleCollision(entity) {
    super.handleCollision(entity);

    if (entity instanceof Player) {
      this.kill();
      this.effects.pickup.play();
      entity.increaseOxygenBy(50);
    }
  }
}
