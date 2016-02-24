export default state => {
  delete state.items;

  const trait = Object.assign({}, state, {
    items: state.game.add.group(),

    /**
     * @return {Phaser.Group}
     */
    getItems() {
      return trait.items;
    }
  });

  trait.toUpdate = trait.toUpdate || [];

  trait.toUpdate.push(
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
