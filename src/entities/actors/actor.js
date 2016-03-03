import {Sprite, Physics} from 'phaser';

import hasComponents from 'core/has-components';
import {getGame} from 'core/game';
import {camelToKebab} from 'services/util';

/**
 * @param {string} subdirectory
 * @param {string} className
 * @param {Object} options
 * @return {Item}
 */
export function createActor(subdirectory, className, x, y, options) {
  const itemModule = require(`./${subdirectory}/${camelToKebab(className)}`);
  const item = new itemModule.default(getGame(), x, y);

  return Object.assign(item, options);
}

export default class Actor extends Sprite {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   * @param {string} spritesheet
   * @param {number} tileIndex
   */
  constructor(game, x, y, spritesheet, tileIndex) {
    super(game, x, y, spritesheet, tileIndex);

    Object.assign(this, hasComponents(this));

    this.effects = {};
    this.smoothed = false;
    this.anchor.setTo(0.5, 1);

    game.physics.enable(this, Physics.ARCADE);
    game.add.existing(this);
  }

  /**
   * @return {string}
   */
  getClassName() {
    return this.className;
  }

  /**
   * Decreases the sprite's height by the given number of pixels.
   * @param {number} pixels
   */
  decreaseHeightBy(pixels) {
    this.body.setSize(this.width, this.height - pixels);
  }

  /**
   * Decreases the sprite's width by the given number of pixels.
   * @param {number} pixels
   */
  decreaseWidthBy(pixels) {
    this.body.setSize(this.width - pixels, this.height);
  }

  /**
   * Handles a collision with another actor.
   * @param {Actor} actor
   */
  handleCollision() {}
}
