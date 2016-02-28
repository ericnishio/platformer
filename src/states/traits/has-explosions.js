/**
 * @param {GameState} state
 * @return {GameState}
 */
export default state => {
  delete state.explosions;

  const trait = {
    initExplosions() {
      state.explosions = state.game.add.group();
      state.explosions.createMultiple(10, 'effects-1x1-1');

      state.explosions.forEach(explosion => {
        explosion.anchor.setTo(0.5, 0.5);
        explosion.animations.add('explode', [4, 3, 2, 4, 3, 3, 2, 2, 0], 4, false);
      }, state);
    }
  };

  trait.initExplosions();

  return trait;
};
