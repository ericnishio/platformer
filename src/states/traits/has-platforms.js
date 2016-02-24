export default (state) => {
  delete state.platforms;

  const trait = Object.assign({}, state, {
    platforms: state.stage.createLayer('Platforms'),

    /**
     * @return {Phaser.TilemapLayer}
     */
    getPlatforms() {
      return this.platforms;
    }
  });

  state.stage.setCollisionByExclusion([], true, 'Platforms');

  trait.toUpdate = trait.toUpdate || [];

  trait.toUpdate.push(
    state.game.physics.arcade.collide.bind(state.game.physics.arcade, state.getPlayer(), trait.getPlatforms()),
    state.game.physics.arcade.collide.bind(state.game.physics.arcade, state.getItems(), trait.getPlatforms()),

    // TODO: Move elsewhere.
    state.game.physics.arcade.collide.bind(state.game.physics.arcade, state.getPlayer().getBullets(), trait.getPlatforms(), bullet => {
      bullet.kill();
    })
  );

  return trait;
};
