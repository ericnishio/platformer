import {getGame, getTileCoordinate} from 'core/game';
import Entity from 'sprites/entities/entity';
import isAffectedByGravity from 'sprites/traits/is-affected-by-gravity';
import needsOxygen from 'sprites/traits/needs-oxygen';
import hasInventory from 'sprites/traits/has-inventory';
import canWalk from 'sprites/traits/can-walk';
import canJump from 'sprites/traits/can-jump';
import canWieldBlaster from 'sprites/traits/can-wield-blaster';
import Blaster from 'sprites/entities/items/blaster';

/**
 * @param {number} x
 * @param {number} y
 * @return {Player}
 */
export default (x, y) => {
  return new Player(getGame(), x, y);
};

export class Player extends Entity {
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

    this.anchor.setTo(0.5, 1);
    this.decreaseHeightBy(5);

    this.effects.burn = this.game.add.audio('combustion1', 1, false);

    window.idkfa = () => {
      const blaster = Blaster(this.x, this.y);
      this.addToInventory(blaster);
      blaster.kill();
      console.log('Come get some!');
    };

    window.goto = (gotoX, gotoY) => {
      this.x = getTileCoordinate(gotoX);
      this.y = getTileCoordinate(gotoY);
    };
  }

  die() {
    if (this.alive) {
      this.kill();
      this.effects.burn.play();
    }
  }
}
