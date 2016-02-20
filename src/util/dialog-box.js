import {Point} from 'phaser';

import {TILE_SIZE} from 'core/game';

const TYPE_SPEED = 150;

/**
 * @param {string} message
 * @param {Game} game
 * @return {string}
 */
export function animateMessage(message, game) {
  const generator = messageGenerator(message);

  const text = game.add.bitmapText(
    100,
    200,
    'press-start-2p',
    '',
    16
  );

  text.tint = 0xFFFFFF;

  const timeEvent = game.time.events.loop(TYPE_SPEED, () => {
    const next = generator.next();

    if (next.done) {
      timeEvent.timer.destroy();
    }

    if (next.value) {
      text.setText(next.value.join(''));
    }
  }, game);
}

/**
 * @param {string} message
 * @return {Generator}
 */
function* messageGenerator(message) {
  const characters = message.split('');
  const nextCharacters = [];

  for (const character of characters) {
    nextCharacters.push(character);

    yield nextCharacters;
  }
}

/**
 * @param {number} widthInTiles
 * @param {number} heightInTiles
 * @param {Phaser.Game} game
 * @return {Phaser.Group}
 */
export function createDialogGroup(widthInTiles, heightInTiles, game) {
  const group = game.add.group();

  for (let x = 0; x < widthInTiles; x++) {
    for (let y = 0; y < heightInTiles; y++) {
      if (x === 0 && y === 0) {
        // top left corner
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, 'menus-1x1-1', 9));
      } else if (x !== 0 && x !== widthInTiles - 1 && y === 0) {
        // top straight
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, 'menus-1x1-1', 10));
      } else if (x === widthInTiles - 1 && y === 0) {
        // top right corner
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, 'menus-1x1-1', 11));
      } else if (x === 0 && y > 0 && y !== heightInTiles - 1) {
        // left straight
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, 'menus-1x1-1', 17));
      } else if (x === widthInTiles - 1 && y !== 0 && y !== heightInTiles - 1) {
        // right straight
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, 'menus-1x1-1', 19));
      } else if (x === 0 && y === heightInTiles - 1) {
        // bottom left corner
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, 'menus-1x1-1', 25));
      } else if (y === heightInTiles - 1 && x > 0 && x < widthInTiles - 1) {
        // bottom straight
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, 'menus-1x1-1', 26));
      } else if (x === widthInTiles - 1 && y === heightInTiles - 1) {
        // bottom right corner
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, 'menus-1x1-1', 27));
      } else {
        // blank
        group.add(game.add.sprite(TILE_SIZE * x, TILE_SIZE * y, 'menus-1x1-1', 18));
      }
    }
  }

  group.fixedToCamera = true;

  group.cameraOffset = new Point(
    game.width / 2 - widthInTiles * TILE_SIZE / 2,
    game.height / 2 - heightInTiles * TILE_SIZE / 2
  );

  return group;
}
