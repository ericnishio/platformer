import {Point} from 'phaser';

import {TILE_SIZE, getGame} from 'core/game';

/**
 * @param {number} widthInTiles
 * @param {number} heightInTiles
 * @return {Phaser.Group}
 */
export default (widthInTiles, heightInTiles) => {
  const spritesheet = 'menus-1x1-1';
  const game = getGame();
  const group = game.add.group();

  for (let x = 0; x < widthInTiles; x++) {
    for (let y = 0; y < heightInTiles; y++) {
      if (x === 0 && y === 0) {
        // top left corner
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, spritesheet, 9));
      } else if (x !== 0 && x !== widthInTiles - 1 && y === 0) {
        // top straight
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, spritesheet, 10));
      } else if (x === widthInTiles - 1 && y === 0) {
        // top right corner
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, spritesheet, 11));
      } else if (x === 0 && y > 0 && y !== heightInTiles - 1) {
        // left straight
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, spritesheet, 17));
      } else if (x === widthInTiles - 1 && y !== 0 && y !== heightInTiles - 1) {
        // right straight
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, spritesheet, 19));
      } else if (x === 0 && y === heightInTiles - 1) {
        // bottom left corner
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, spritesheet, 25));
      } else if (y === heightInTiles - 1 && x > 0 && x < widthInTiles - 1) {
        // bottom straight
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, spritesheet, 26));
      } else if (x === widthInTiles - 1 && y === heightInTiles - 1) {
        // bottom right corner
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, spritesheet, 27));
      } else {
        // blank
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, spritesheet, 18));
      }
    }
  }

  group.fixedToCamera = true;

  group.cameraOffset = new Point(
    game.width / 2 - widthInTiles * TILE_SIZE / 2,
    game.height / 2 - heightInTiles * TILE_SIZE / 2
  );

  return group;
};
