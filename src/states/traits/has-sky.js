/**
 * @param {GameState} state
 * @return {GameState}
 */
export default state => {
  delete state.sky;

  const trait = {
    sky: state.stage.createLayer('Sky')
  };

  trait.sky.resizeWorld();

  return trait;
};
