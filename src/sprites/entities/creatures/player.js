import Phaser from 'phaser';

import Entity from 'sprites/entities/entity';
import hasInventory from 'sprites/traits/has-inventory';
import canWalk from 'sprites/traits/can-walk';
import isAffectedByGravity from 'sprites/traits/is-affected-by-gravity';
import Item from 'sprites/entities/items/item';

export default class Player extends Entity {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'creatures-1x2-1', 0);

    Object.assign(this, hasInventory(this), canWalk(this), isAffectedByGravity(this));

    game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON);

    this.registerGamepad();

    this.setSpeed(80);

    const animationFrameRate = 5;

    this.anchor.setTo(0.5, 1);
    this.decreaseHeightBy(5);

    this.animations.add('walkRight', [1, 2, 0], animationFrameRate, false);
    this.animations.add('walkLeft', [9, 10, 8], animationFrameRate, false);

    this.animations.add('jumpLeft', [8], animationFrameRate, false); // TODO: Replace animation.
    this.animations.add('jumpRight', [0], animationFrameRate, false); // TODO: Replace animation.

    this.effects.step = this.game.add.audio('step', 1, false);
    this.effects.burn = this.game.add.audio('combustion1', 1, false);
    this.effects.shoot = this.game.add.audio('laser1', 1, false);

    this.setMaxOxygen(100);
    this.setOxygen(100);

    this.oxygenTimer = this.game.time.events.repeat(Phaser.Timer.SECOND * 1, Infinity, this.consumeOxygen, this);

    this.initBullets();
  }

  initBullets() {
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'weapons-1x1-1', 3);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bulletTime = this.game.time.now;
  }

  /**
   * Returns the bullet group.
   * @return {Phaser.Group}
   */
  getBullets() {
    return this.bullets;
  }

  registerGamepad() {
    this.pad1 = this.game.input.gamepad.pad1;
    this.game.input.gamepad.start();
  }

  startOxygenConsumption() {
    this.oxygenTimer.timer.start();
  }

  stopOxygenConsumption() {
    this.oxygenTimer.timer.stop();
  }

  consumeOxygen() {
    if (this.alive) {
      this.setOxygen(this.getOxygen() - 1);
    }
  }

  /**
   * @return {boolean}
   */
  hasOxygen() {
    return this.getOxygen() > 0;
  }

  /**
   * Sets the amount of oxygen in the player's tank.
   * @param {number} oxygen
   */
  setOxygen(oxygen) {
    const maxOxygen = this.getMaxOxygen();

    if (oxygen <= maxOxygen) {
      this.oxygen = oxygen;
    } else {
      this.oxygen = maxOxygen;
    }
  }

  /**
   * Increases the player's oxygen level by the given amount.
   * @param {number} increment
   */
  increaseOxygenBy(increment) {
    this.setOxygen(this.getOxygen() + increment);
  }

  /**
   * Returns the amount of oxygen in the player's tank.
   * @return {number}
   */
  getOxygen() {
    return this.oxygen;
  }

  /**
   * Returns the player's oxygen level as a percentage.
   * @return {number}
   */
  getOxygenAsPercentage() {
    return Math.ceil(this.getOxygen() / this.getMaxOxygen() * 100);
  }

  /**
   * Sets the player's oxygen tank capacity.
   * @param {number} maxOxygen
   */
  setMaxOxygen(maxOxygen) {
    this.maxOxygen = maxOxygen;
  }

  /**
   * Returns the player's oxygen tank capacity.
   * @return {number}
   */
  getMaxOxygen() {
    return this.maxOxygen;
  }

  update() {
    this.body.velocity.x = 0;

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
      this.walkLeft();
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
      this.walkRight();
    }

    if (this.canJump() && (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.S) || this.pad1.isDown(Phaser.Gamepad.XBOX360_X))) {
      this.jump();
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.game.input.keyboard.isDown(Phaser.Keyboard.D) || this.pad1.isDown(Phaser.Gamepad.XBOX360_Y)) {
      this.fire();
    }
  }

  /**
   * @return {boolean}
   */
  canJump() {
    return this.body.onFloor() || this.body.touching.down;
  }

  jump() {
    this.body.velocity.y = -(this.getSpeed() * 1.8);

    if (this.isFacingLeft()) {
      this.animations.play('jumpLeft');
    } else {
      this.animations.play('jumpRight');
    }

    this.effects.step.play();
  }

  fire() {
    if (this.hasItemByType(Item.ITEM_TYPE_FIREARM) && this.game.time.now > this.bulletTime) {
      const bullet = this.bullets.getFirstDead();

      bullet.body.setSize(this.width - 3, this.height - 7);

      if (bullet) {
        bullet.reset(this.getBulletOffsetX(), this.getBulletOffsetY());
        bullet.body.velocity.x = this.getBulletVelocity(420);
        this.bulletTime = this.game.time.now + 200;
      }

      this.effects.shoot.play();
    }
  }

  /**
   * Returns the X offset of bullet origin.
   * @return {number}
   */
  getBulletOffsetX() {
    return this.isFacingRight() ? this.x + 10 : this.x - 10;
  }

  /**
   * Returns the Y offset of bullet origin.
   * @return {number}
   */
  getBulletOffsetY() {
    return this.y - 6;
  }

  /**
   * Returns a firing velocity based on which way the player is facing.
   * @param {number} speed
   * @return {number}
   */
  getBulletVelocity(speed) {
    return this.isFacingRight() ? speed : -speed;
  }

  die() {
    if (this.alive) {
      this.kill();
      this.effects.burn.play();

      this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
        this.game.state.start('Stage1', true, false);
      });
    }
  }
}
