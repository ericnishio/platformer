import {Physics} from 'phaser';

import {getGame} from 'core/game';

/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  delete parent.obstacles;

  if (!parent.getComponent('hasPlayer')) {
    throw Error('Component hasObstacles requires hasPlayer');
  }

  if (!parent.getComponent('hasExplosions')) {
    throw Error('Component hasObstacles requires hasExplosions');
  }

  if (!parent.getComponent('hasItems')) {
    throw Error('Component hasObstacles requires hasItems');
  }

  if (!parent.getComponent('hasPlatforms')) {
    throw Error('Component hasObstacles requires hasPlatforms');
  }

  const game = getGame();

  const component = {
    initObstacles() {
      component.obstacles = game.add.group();
      component.obstacles.enableBody = true;
      component.obstacles.physicsBodyType = Physics.ARCADE;
    },

    /**
     * @return {Phaser.Group}
     */
    getObstacles() {
      return component.obstacles;
    },

    /**
     * @param {Object} actorClass
     * @param {number} x
     * @param {number} y
     */
    addObstacle(actorClass, x, y) {
      component.obstacles.add(new actorClass(game, x, y));
    },

    update() {
      parent.game.physics.arcade.collide(component.getObstacles(), parent.getComponent('hasItems').getItems());
      parent.game.physics.arcade.collide(component.getObstacles(), parent.getComponent('hasPlayer').getPlayer());
      parent.game.physics.arcade.collide(component.getObstacles(), parent.getComponent('hasPlatforms').getPlatforms());

      parent.game.physics.arcade.overlap(component.getObstacles(), parent.getComponent('hasPlayer').getPlayer().getComponent('canWieldBlaster').getBullets(), (obstacle, bullet) => {
        obstacle.kill();
        obstacle.effects.destroy.play();
        bullet.kill();

        const explosion = parent.getComponent('hasExplosions').explosions.getFirstExists(false);

        explosion.reset(obstacle.body.x + 8, obstacle.body.y + 8); // TODO: Fix X and Y.
        explosion.play('explode', 30, false, true);
      });
    }
  };

  component.initObstacles();

  parent._components.hasObstacles = component;

  return component;
};
