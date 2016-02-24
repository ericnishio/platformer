import {Physics} from 'phaser';

import {getGame} from 'core/game';

export default state => {
  const game = getGame();

  const trait = Object.assign({}, state, {
    initObstacles() {
      state.obstacles = game.add.group();
      state.obstacles.enableBody = true;
      state.obstacles.physicsBodyType = Physics.ARCADE;
    },

    /**
     * @return {Phaser.Group}
     */
    getObstacles() {
      return state.obstacles;
    },

    /**
     * @param {Object} entityClass
     * @param {number} x
     * @param {number} y
     */
    addObstacle(entityClass, x, y) {
      state.obstacles.add(new entityClass(game, x, y));
    }
  });

  trait.initObstacles();

  return trait;
};
