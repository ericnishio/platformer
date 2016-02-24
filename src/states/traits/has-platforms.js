export default state => {
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

  return trait;
};
