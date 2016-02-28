/**
 * @param {GameState} state
 * @return {GameState}
 */
export default state => {
  delete state.hazard;

  const trait = {
    hazard: state.stage.createLayer('Hazard'),

    /**
     * @return {Phaser.TilemapLayer}
     */
    getHazard() {
      return trait.hazard;
    }
  };

  state.stage.setCollisionByExclusion([], true, 'Hazard');

  state.toUpdate = state.toUpdate || [];

  state.toUpdate.push(
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
