/**
 * @param {GameState} state
 * @return {Object}
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

  state.addToUpdate(
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
