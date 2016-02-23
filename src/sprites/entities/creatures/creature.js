import {LEFT, RIGHT} from 'phaser';

import Entity from 'sprites/entities/entity';

export default class Creature extends Entity {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   * @param {string} spritesheet
   * @param {number} tileIndex
   */
  constructor(game, x, y, spritesheet, tileIndex) {
    super(game, x, y, spritesheet, tileIndex);

    this.inventory = [];
    this.facingX = RIGHT;
    this.speed = 50;

    this.body.collideWorldBounds = true;
    this.body.gravity.y = 280;
  }

  /**
   * Sets the creature's speed.
   * @param {number} speed
   */
  setSpeed(speed) {
    this.speed = speed;
  }

  /**
   * Returns the creature's speed.
   * @return {number}
   */
  getSpeed() {
    return this.speed;
  }

  /**
   * Sets this.facingX to Phaser.RIGHT.
   */
  faceRight() {
    this.facingX = RIGHT;
  }

  /**
   * Sets this.facingX to Phaser.LEFT.
   */
  faceLeft() {
    this.facingX = LEFT;
  }

  /**
   * Checks if the creature is facing right.
   * @return {boolean}
   */
  isFacingRight() {
    return this.facingX === RIGHT;
  }

  /**
   * Checks if the creature is facing left.
   * @return {boolean}
   */
  isFacingLeft() {
    return this.facingX === LEFT;
  }

  /**
   * Checks if the creature carries an item.
   * @param {Item} item
   * @return {boolean}
   */
  hasItem(item) {
    return this.hasItemByName(item.name);
  }

  /**
   * Checks if the creature carries an item by item type.
   * @param {string} itemType
   * @return {boolean}
   */
  hasItemByType(itemType) {
    let hasIt = false;

    this.inventory.forEach((itemInInventory) => {
      if (itemInInventory.getItemType() === itemType) {
        hasIt = true;
      }
    });

    return hasIt;
  }

  /**
   * Checks if the creature carries an item.
   * @param {string} itemName
   * @return {boolean}
   */
  hasItemByName(itemName) {
    let hasIt = false;

    this.inventory.forEach((itemInInventory) => {
      if (itemInInventory.name === itemName) {
        hasIt = true;
      }
    });

    return hasIt;
  }

  /**
   * Returns the inventory count for the given item type.
   * @param {Item} item
   * @return {number}
   */
  getItemCountInInventory(item) {
    let count = 0;

    this.inventory.forEach((itemInInventory) => {
      if (item.name === itemInInventory.name) {
        count += 1;
      }
    });

    return count;
  }

  /**
   * Adds an item to the inventory.
   * @param {Item} item
   */
  addToInventory(item) {
    if (this.canAddToInventory(item)) {
      this.inventory.push(item);
    }
  }

  /**
   * Checks if an item can be added to the inventory.
   * @param {Item} item
   * @return {boolean}
   */
  canAddToInventory(item) {
    return this.getItemCountInInventory(item) < item.getMaxInInventory();
  }
}
