/**
 * @param {GameState} state
 * @return {Object}
 */
export default state => {
  delete state.items;

  const trait = {
    items: state.game.add.group(),

    /**
     * @return {Phaser.Group}
     */
    getItems() {
      return trait.items;
    }
  };

  state.addToUpdate(
    () => {
      trait.getItems().forEachAlive(item => {
        state.game.physics.arcade.collide(item, state.getPlatforms());

        state.game.physics.arcade.collide(item, state.getPlayer(), () => {
          item.handleCollision(state.getPlayer());
        });
      });
    }
  );

  return trait;
};
