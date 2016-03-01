import {Camera} from 'phaser';

import OxygenMeter from 'ui/oxygen-meter';
import Player from 'entities/actors/creatures/player';

/**
 * @param {GameState} parent
 * @param {Object} [options]
 * @return {Object}
 */
export default (parent, options = {}) => {
  const component = {
    /**
     * @param {number} x
     * @param {number} y
     */
    createPlayer(x, y) {
      component.player = Player(x, y);
      component.oxygenMeter = OxygenMeter(component.getPlayer());
      parent.game.camera.follow(component.player, Camera.FOLLOW_LOCKON);
    },

    /**
     * @return {Player}
     */
    getPlayer() {
      return component.player;
    }
  };

  if (options.x && options.y) {
    component.createPlayer(options.x, options.y);

    if (options.facing) {
      component.player.facingX = options.facing;
      component.player.getComponent('canWalk').walkLeft();
    }
  }

  parent._components.hasPlayer = component;

  return component;
};
