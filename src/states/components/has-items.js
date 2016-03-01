/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  delete parent.items;

  const hasPlatforms = parent.getComponent('hasPlatforms');
  const hasPlayer = parent.getComponent('hasPlayer');

  if (!hasPlatforms) {
    throw Error('Component hasItems requires hasPlatforms');
  }

  if (!hasPlayer) {
    throw Error('Component hasItems requires hasPlayer');
  }

  const component = {
    items: parent.game.add.group(),

    /**
     * @return {Phaser.Group}
     */
    getItems() {
      return component.items;
    },

    update() {
      const player = hasPlayer.getPlayer();

      component.getItems().forEachAlive(item => {
        parent.game.physics.arcade.collide(item, hasPlatforms.getPlatforms());

        parent.game.physics.arcade.collide(item, player, () => {
          item.handleCollision(player);
        });
      });
    }
  };

  parent._components.hasItems = component;

  return component;
};
