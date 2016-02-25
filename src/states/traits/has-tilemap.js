import {TILE_SIZE, getGame} from 'core/game';

/**
 * @param {GameState} state
 * @param {Object} options
 * @return {GameState}
 */
export default (state, options) => {
  const game = getGame();
  const trait = Object.assign({}, state, {});
  const tilesets = options.tilesets || [];

  trait.stage = game.add.tilemap(options.tilemap, TILE_SIZE, TILE_SIZE);

  tilesets.forEach(tileset => {
    trait.stage.addTilesetImage(tileset);
  });

  return trait;
};
