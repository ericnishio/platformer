import Phaser from 'phaser';

import Entity from 'sprites/entities/entity';
import needsOxygen from 'sprites/traits/needs-oxygen';
import hasInventory from 'sprites/traits/has-inventory';
import canWalk from 'sprites/traits/can-walk';
import canJump from 'sprites/traits/can-jump';
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

    Object.assign(
      this,
      needsOxygen(this, {oxygen: 100, maxOxygen: 100}),
      hasInventory(this),
      canWalk(this, {speed: 80}),
      canJump(this),
      isAffectedByGravity(this)
    );

    game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON);

    this.registerGamepad();

    this.anchor.setTo(0.5, 1);
    this.decreaseHeightBy(5);

    this.effects.burn = this.game.add.audio('combustion1', 1, false);
    this.effects.shoot = this.game.add.audio('laser1', 1, false);

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
   * @return {Phaser.Group}
   */
  getBullets() {
    return this.bullets;
  }

  registerGamepad() {
    this.pad1 = this.game.input.gamepad.pad1;
    this.game.input.gamepad.start();
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
