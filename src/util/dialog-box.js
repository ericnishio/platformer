import {Point} from 'phaser';

import {TILE_SIZE} from 'core/game';

const TYPE_SPEED = 150;

/**
 * @param {Array} messages
 * @param {Game} game
 * @return {string}
 */
export function animateMessages(messages, game) {
  const texts = [];

  messages.forEach(message => {
    const generator = messageGenerator(message);
    const index = messages.indexOf(message);
    const xTileOffset = TILE_SIZE;
    const yTileOffset = (index + 1) * TILE_SIZE;

    const text = game.add.bitmapText(xTileOffset, yTileOffset, 'press-start-2p', '', 8);

    text.tint = 0xFFFFFF;

    const timer = game.time.create(false);

    timer.start();

    const timeEvent = timer.loop(TYPE_SPEED, () => {
      const next = generator.next();

      if (next.done) {
        timeEvent.timer.destroy();
        timer.destroy();
      }

      if (next.value) {
        text.setText(next.value.join(''));
      }
    }, game);

    texts.push(text);
  });

  return texts;
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
  const spritesheet = 'menus-1x1-1';
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

  const messages = animateMessages([
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'abcdefghijklmnopqrstuvwxyz',
    'a,as.df,.asd,f.asd,f.ads,f'
  ], game);

  messages.forEach(message => {
    group.add(message);
  });

  return group;
}
