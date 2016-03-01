import {getGame} from 'core/game';

/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  delete parent.decorations;

  const component = {
    decorations: getGame().add.group(),

    /**
     * @return {Phaser.Group}
     */
    getDecorations() {
      return component.decorations;
    }
  };

  parent._components.hasDecorations = component;

  return component;
};
