import {TILE_SIZE, getGame} from 'core/game';

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
