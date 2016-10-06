import Item, {TYPE_MISSION_ITEM} from './item';

export default class Wrench extends Item {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'items-1x1-1', 8);

    this.className = 'Wrench';
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
