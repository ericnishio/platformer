import Actor from 'entities/actors/actor';

export const TYPE_POWERUP = 'POWERUP';
export const TYPE_FIREARM = 'FIREARM';
export const TYPE_MISSION_ITEM = 'MISSION_ITEM';

export default class Item extends Actor {
  /**
  * @param {Phaser.Game} game
  * @param {number} x
  * @param {number} y
  * @param {string} spritesheet
  * @param {number} tileIndex
   */
  constructor(game, x, y, spritesheet, tileIndex) {
    super(game, x, y, spritesheet, tileIndex);

    this.maxInInventory = Infinity;

    this.anchor.setTo(0, 0.5);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 280;
  }

  /**
   * Returns the item type.
   */
  getItemType() {
    return this.itemType;
  }

  /**
   * Returns the maximum number of instances of this item that can be carried in a creature's inventory.
   * @return {number}
   */
  getMaxInInventory() {
    return this.maxInInventory;
  }
}
