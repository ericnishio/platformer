/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  delete parent.hazard;

  if (!parent.getComponent('hasPlayer')) {
    throw Error('Component hasHazard requires hasPlayer');
  }

  if (!parent.getComponent('canDie')) {
    throw Error('Component hasHazard requires canDie');
  }

  const component = {
    hazard: parent.stage.createLayer('Hazard'),

    /**
     * @return {Phaser.TilemapLayer}
     */
    getHazard() {
      return component.hazard;
    },

    update() {
      const player = parent.getComponent('hasPlayer').getPlayer();

      parent.game.physics.arcade.collide(
        player,
        component.getHazard(),
        parent.getComponent('canDie').die.bind(player),
        null,
        player
      );
    }
  };

  parent.stage.setCollisionByExclusion([], true, 'Hazard');

  parent._components.hasHazard = component;

  return component;
};
