import Structure from './structure';
import {getGame} from 'core/game';

/**
 * @param {number} x
 * @param {number} y
 * @return {Antenna}
 */
export default (x, y) => {
  return new Antenna(getGame(), x, y);
};

export class Antenna extends Structure {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'structures-2x2-1', 0);

    this.activated = false;
    this.name = 'Antenna';
    this.anchor.setTo(0, 0);
    this.body.immovable = true;

    this.effects.activate = this.game.add.audio('turn-on1', 1, false);
    this.animations.add('activate', [1, 2, 3, 4, 5], 12, false);
  }

  /**
   * Activates the antenna.
   * @param {Creature} actor
   */
  activate(actor) {
    if (!this.isActivated()) {
      if (actor.getComponent('hasInventory').hasItemByName('Power Cell')) {
        this.effects.activate.play();
        this.animations.play('activate');
        this.activated = true;
      } else {
        console.log('You need a power cell to activate the antenna.');
      }
    }
  }

  /**
   * Checks if the antenna has been activated.
   * @return {boolean}
   */
  isActivated() {
    return this.activated;
  }
}
