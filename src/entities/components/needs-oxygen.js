import {Sprite, Timer} from 'phaser';

import {getGame} from 'core/game';

/**
 * @param {Phaser.Sprite} parent
 * @param {Object} [options]
 * @return {Object}
 */
export default (parent, options = {oxygen: 100, maxOxygen: 100}) => {
  if (!parent instanceof Sprite) {
    throw Error('Parent of needsOxygen must extend Phaser.Sprite');
  }

  const component = Object.assign({}, options, {
    oxygenTimer: getGame().time.create(),

    startOxygenConsumption() {
      component.oxygenTimer.start();
    },

    stopOxygenConsumption() {
      component.oxygenTimer.stop();
    },

    consumeOxygen() {
      if (parent.alive) {
        component.setOxygen(component.getOxygen() - 1);
      }
    },

    /**
     * @return {boolean}
     */
    hasOxygen() {
      return component.getOxygen() > 0;
    },

    /**
     * @param {number} oxygen
     */
    setOxygen(oxygen) {
      const maxOxygen = component.getMaxOxygen();

      if (oxygen <= maxOxygen) {
        component.oxygen = oxygen;
      } else {
        component.oxygen = maxOxygen;
      }
    },

    /**
     * @param {number} increment
     */
    increaseOxygenBy(increment) {
      component.setOxygen(component.getOxygen() + increment);
    },

    /**
     * @return {number}
     */
    getOxygen() {
      return component.oxygen;
    },

    /**
     * @return {number}
     */
    getOxygenAsPercentage() {
      return Math.ceil(component.getOxygen() / component.getMaxOxygen() * 100);
    },

    /**
     * @param {number} maxOxygen
     */
    setMaxOxygen(maxOxygen) {
      component.maxOxygen = maxOxygen;
    },

    /**
     * @return {number}
     */
    getMaxOxygen() {
      return component.maxOxygen;
    }
  });

  component.oxygenTimer.repeat(
    Timer.SECOND * 1,
    Infinity,
    component.consumeOxygen,
    component
  );

  parent._components.needsOxygen = component;

  return component;
};
