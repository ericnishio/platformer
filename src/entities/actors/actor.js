import {Sprite, Physics} from 'phaser';

import hasComponents from 'core/has-components';

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

    Object.assign(this, hasComponents);

    this.effects = {};
    this.smoothed = false;
    this.anchor.setTo(0.5, 1);

    game.physics.enable(this, Physics.ARCADE);
    game.add.existing(this);
  }

  /**
   * @return {string}
   */
  getName() {
    return this.name;
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
