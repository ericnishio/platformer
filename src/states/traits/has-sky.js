export default state => {
  delete state.sky;

  const trait = Object.assign({}, state, {
    sky: state.stage.createLayer('Sky')
  });

  trait.sky.resizeWorld();

  return trait;
};
