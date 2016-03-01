/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  delete parent.platforms;

  if (!parent.getComponent('hasPlayer')) {
    throw Error('Component hasPlatforms requires hasPlayer');
  }

  const component = {
    platforms: parent.stage.createLayer('Platforms'),

    /**
     * @return {Phaser.TilemapLayer}
     */
    getPlatforms() {
      return component.platforms;
    },

    update() {
      parent.game.physics.arcade.collide(parent.getComponent('hasPlayer').getPlayer(), component.getPlatforms());
      parent.game.physics.arcade.collide(parent.getComponent('hasItems').getItems(), component.getPlatforms());

      // TODO: Move elsewhere.
      parent.game.physics.arcade.collide(parent.getComponent('hasPlayer').getPlayer().getComponent('canWieldBlaster').getBullets(), component.getPlatforms(), bullet => {
        bullet.kill();
      });
    }
  };

  parent.stage.setCollisionByExclusion([], true, 'Platforms');

  parent._components.hasPlatforms = component;

  return component;
};
