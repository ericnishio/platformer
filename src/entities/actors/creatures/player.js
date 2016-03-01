import {getGame} from 'core/game';
import Actor from 'entities/actors/actor';
import isAffectedByGravity from 'entities/components/is-affected-by-gravity';
import needsOxygen from 'entities/components/needs-oxygen';
import hasInventory from 'entities/components/has-inventory';
import canWalk from 'entities/components/can-walk';
import canJump from 'entities/components/can-jump';
import canWieldBlaster from 'entities/components/can-wield-blaster';
import canInteract from 'entities/components/can-interact';
import canDebug from 'entities/components/can-debug';

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

    this.addComponent(isAffectedByGravity);
    this.addComponent(needsOxygen, {oxygen: 100, maxOxygen: 100});
    this.addComponent(hasInventory);
    this.addComponent(canWalk, {speed: 80});
    this.addComponent(canJump);
    this.addComponent(canWieldBlaster);
    this.addComponent(canInteract);
    this.addComponent(canDebug);

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

  update() {
    this.getComponent('canInteract').update();
  }
}
