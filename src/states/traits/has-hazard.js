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

  return trait;
};
