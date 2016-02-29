import {getGame} from 'core/game';

/**
 * @param {GameState} state
 * @return {Object}
 */
export default state => {
  delete state.decorations;

  const trait = {
    decorations: getGame().add.group(),

    /**
     * @return {Phaser.Group}
     */
    getDecorations() {
      return trait.decorations;
    }
  };

  return trait;
};
