export default state => {
  delete state.hazard;

  const trait = Object.assign({}, state, {
    hazard: state.stage.createLayer('Hazard'),

    /**
     * @return {Phaser.TilemapLayer}
     */
    getHazard() {
      return this.hazard;
    }
  });

  trait.stage.setCollisionByExclusion([], true, 'Hazard');

  trait.toUpdate = trait.toUpdate || [];

  trait.toUpdate.push(
    state.game.physics.arcade.collide.bind(
      state.game.physics.arcade,
      state.getPlayer(),
      trait.getHazard(),
      state.die.bind(state),
      null,
      state.getPlayer()
    )
  );

  return trait;
};
