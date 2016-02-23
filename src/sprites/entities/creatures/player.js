import Phaser from 'phaser';

import Entity from 'sprites/entities/entity';
import isAffectedByGravity from 'sprites/traits/is-affected-by-gravity';
import needsOxygen from 'sprites/traits/needs-oxygen';
import hasInventory from 'sprites/traits/has-inventory';
import canWalk from 'sprites/traits/can-walk';
import canJump from 'sprites/traits/can-jump';
import canWieldBlaster from 'sprites/traits/can-wield-blaster';

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
      isAffectedByGravity(this),
      needsOxygen(this, {oxygen: 100, maxOxygen: 100}),
      hasInventory(this),
      canWalk(this, {speed: 80}),
      canJump(this),
      canWieldBlaster(this)
    );

    game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON);

    this.anchor.setTo(0.5, 1);
    this.decreaseHeightBy(5);

    this.effects.burn = this.game.add.audio('combustion1', 1, false);
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
