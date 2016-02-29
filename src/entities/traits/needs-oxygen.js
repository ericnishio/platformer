import {Timer} from 'phaser';

import {getGame} from 'core/game';

/**
 * @param {Phaser.Sprite} sprite
 * @param {Object} [options]
 * @return {Object}
 */
export default (sprite, options = {oxygen: 100, maxOxygen: 100}) => {
  const trait = Object.assign({}, options, {
    oxygenTimer: getGame().time.create(),

    startOxygenConsumption() {
      trait.oxygenTimer.start();
    },

    stopOxygenConsumption() {
      trait.oxygenTimer.stop();
    },

    consumeOxygen() {
      if (sprite.alive) {
        trait.setOxygen(trait.getOxygen() - 1);
      }
    },

    /**
     * @return {boolean}
     */
    hasOxygen() {
      return trait.getOxygen() > 0;
    },

    /**
     * @param {number} oxygen
     */
    setOxygen(oxygen) {
      const maxOxygen = trait.getMaxOxygen();

      if (oxygen <= maxOxygen) {
        trait.oxygen = oxygen;
      } else {
        trait.oxygen = maxOxygen;
      }
    },

    /**
     * @param {number} increment
     */
    increaseOxygenBy(increment) {
      trait.setOxygen(trait.getOxygen() + increment);
    },

    /**
     * @return {number}
     */
    getOxygen() {
      return trait.oxygen;
    },

    /**
     * @return {number}
     */
    getOxygenAsPercentage() {
      return Math.ceil(trait.getOxygen() / trait.getMaxOxygen() * 100);
    },

    /**
     * @param {number} maxOxygen
     */
    setMaxOxygen(maxOxygen) {
      trait.maxOxygen = maxOxygen;
    },

    /**
     * @return {number}
     */
    getMaxOxygen() {
      return trait.maxOxygen;
    }
  });

  trait.oxygenTimer.repeat(
    Timer.SECOND * 1,
    Infinity,
    trait.consumeOxygen,
    trait
  );

  return trait;
};
