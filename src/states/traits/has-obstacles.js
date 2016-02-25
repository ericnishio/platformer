import {Physics} from 'phaser';

import {getGame} from 'core/game';

/**
 * @param {GameState} state
 * @return {GameState}
 */
export default state => {
  delete state.obstacles;

  const game = getGame();

  const trait = Object.assign({}, state, {
    initObstacles() {
      trait.obstacles = game.add.group();
      trait.obstacles.enableBody = true;
      trait.obstacles.physicsBodyType = Physics.ARCADE;
    },

    /**
     * @return {Phaser.Group}
     */
    getObstacles() {
      return trait.obstacles;
    },

    /**
     * @param {Object} actorClass
     * @param {number} x
     * @param {number} y
     */
    addObstacle(actorClass, x, y) {
      trait.obstacles.add(new actorClass(game, x, y));
    }
  });

  trait.initObstacles();

  trait.toUpdate = trait.toUpdate || [];

  trait.toUpdate.push(
    state.game.physics.arcade.collide.bind(state.game.physics.arcade, trait.getObstacles(), state.getItems()),
    state.game.physics.arcade.collide.bind(state.game.physics.arcade, trait.getObstacles(), state.getPlayer()),
    state.game.physics.arcade.collide.bind(state.game.physics.arcade, trait.getObstacles(), state.getPlatforms()),
    () => {
      state.game.physics.arcade.overlap(trait.getObstacles(), state.getPlayer().getBullets(), (obstacle, bullet) => {
        obstacle.kill();
        obstacle.effects.destroy.play();
        bullet.kill();

        const explosion = state.explosions.getFirstExists(false);

        explosion.reset(obstacle.body.x + 8, obstacle.body.y + 8); // TODO: Fix X and Y.
        explosion.play('explode', 30, false, true);
      });
    }
  );

  return trait;
};
