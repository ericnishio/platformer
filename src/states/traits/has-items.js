export default state => {
  delete state.items;

  return Object.assign({}, state, {
    items: state.game.add.group(),

    /**
     * @return {Phaser.Group}
     */
    getItems() {
      return this.items;
    }
  });
};
