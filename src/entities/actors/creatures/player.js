import {getGame} from 'core/game';
import Actor from 'entities/actors/actor';
import isAffectedByGravity from 'entities/traits/is-affected-by-gravity';
import needsOxygen from 'entities/traits/needs-oxygen';
import hasInventory from 'entities/traits/has-inventory';
import canWalk from 'entities/traits/can-walk';
import canJump from 'entities/traits/can-jump';
import canWieldBlaster from 'entities/traits/can-wield-blaster';
import canDebug from 'entities/traits/can-debug';

/**
 * @param {number} x
 * @param {number} y
 * @return {Player}
 */
export default (x, y) => {
  return new Player(getGame(), x, y);
};

export class Player extends Actor {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'creatures-1x2-1', 0);

    Object.assign(this, isAffectedByGravity(this));
    Object.assign(this, needsOxygen(this, {oxygen: 100, maxOxygen: 100}));
    Object.assign(this, hasInventory());
    Object.assign(this, canWalk(this, {speed: 80}));
    Object.assign(this, canJump(this));
    Object.assign(this, canWieldBlaster(this));
    Object.assign(this, canDebug(this));

    this.anchor.setTo(0.5, 1);

    this.decreaseHeightBy(5);

    this.effects.burn = this.game.add.audio('combustion1', 1, false);
  }

  die() {
    if (this.alive) {
      this.kill();
      this.effects.burn.play();
    }
  }
}
