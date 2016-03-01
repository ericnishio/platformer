/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  delete parent.explosions;

  const component = {
    initExplosions() {
      component.explosions = parent.game.add.group();
      component.explosions.createMultiple(10, 'effects-1x1-1');

      component.explosions.forEach(explosion => {
        explosion.anchor.setTo(0.5, 0.5);
        explosion.animations.add('explode', [4, 3, 2, 4, 3, 3, 2, 2, 0], 4, false);
      }, parent);
    }
  };

  component.initExplosions();

  parent._components.hasExplosions = component;

  return component;
};
