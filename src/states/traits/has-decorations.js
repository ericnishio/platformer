import {getGame} from 'core/game';

export default state => {
  delete state.decorations;

  const trait = Object.assign({}, state, {
    decorations: getGame().add.group(),

    /**
     * @return {Phaser.Group}
     */
    getDecorations() {
      return trait.decorations;
    }
  });

  return trait;
};
