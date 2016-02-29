import {TILE_SIZE} from 'core/game';

/**
 * @param {GameState} state
 * @param {Object} options
 * @return {Object}
 */
export default (state, options) => {
  const trait = {};
  const tilesets = options.tilesets || [];

  trait.stage = state.game.add.tilemap(options.tilemap, TILE_SIZE, TILE_SIZE);

  tilesets.forEach(tileset => {
    trait.stage.addTilesetImage(tileset);
  });

  return trait;
};
