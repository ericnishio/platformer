/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  delete parent.sky;

  const component = {
    sky: parent.stage.createLayer('Sky')
  };

  component.sky.resizeWorld();

  parent._components.hasSky = component;

  return component;
};
