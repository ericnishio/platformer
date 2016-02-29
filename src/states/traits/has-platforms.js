/**
 * @param {GameState} state
 * @return {Object}
 */
export default state => {
  delete state.platforms;

  const trait = {
    platforms: state.stage.createLayer('Platforms'),

    /**
     * @return {Phaser.TilemapLayer}
     */
    getPlatforms() {
      return trait.platforms;
    }
  };

  state.stage.setCollisionByExclusion([], true, 'Platforms');

  state.addToUpdate(
    state.game.physics.arcade.collide.bind(state.game.physics.arcade, state.getPlayer(), trait.getPlatforms()),
    state.game.physics.arcade.collide.bind(state.game.physics.arcade, state.getItems(), trait.getPlatforms()),

    // TODO: Move elsewhere.
    state.game.physics.arcade.collide.bind(state.game.physics.arcade, state.getPlayer().getBullets(), trait.getPlatforms(), bullet => {
      bullet.kill();
    })
  );

  return trait;
};
