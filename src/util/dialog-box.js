import Phaser, {Point} from 'phaser';

import {TILE_SIZE} from 'core/game';

/**
 * @param {Array} messages
 * @param {Phaser.Game} game
 * @return {Phaser.Group}
 */
export function createMessageDialog(messages, game) {
  const dialogGroup = createDialogGroup(15, 8, game);

  dialogGroup.add(animateMessages(messages, dialogGroup, game));

  return dialogGroup;
}

/**
 * @param {number} widthInTiles
 * @param {number} heightInTiles
 * @param {Phaser.Game} game
 * @return {Phaser.Group}
 */
function createDialogGroup(widthInTiles, heightInTiles, game) {
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

  return group;
}

/**
 * @param {string[]} messages
 * @param {Phaser.Group} dialogGroup
 * @param {Phaser.Game} game
 * @return {Phaser.BitmapText}
 */
function animateMessages(messages, dialogGroup, game) {
  let currentMessageIndex = 0;

  const bmpText = game.add.bitmapText(TILE_SIZE, TILE_SIZE, 'press-start-2p', '', 10);

  bmpText.maxWidth = 12 * TILE_SIZE;

  animateSet(messages[currentMessageIndex]);

  /**
   * @param {string} message
   */
  function animateSet(message) {
    const words = message.split('');

    let currentIndex = 0;
    let text = '';

    game.time.events.repeat(120, message.length, updateText, this);

    currentMessageIndex += 1;

    function updateText() {
      let word = words[currentIndex];

      currentIndex++;

      text += word;

      bmpText.text = text;

      if (text.length === words.length && currentMessageIndex === messages.length) {
        game.input.keyboard
          .addKey(Phaser.Keyboard.ENTER)
          .onDown.add(() => {
            dialogGroup.destroy();
            game.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
          }, this);
      }

      if (text.length === words.length && currentMessageIndex < messages.length) {
        let canContinue = false;

        game.input.keyboard
          .addKey(Phaser.Keyboard.ENTER)
          .onDown.add(() => {
            canContinue = true;
          }, this);

        const timer = game.time.create(false);

        timer.loop(100, () => {
          if (canContinue) {
            animateSet(messages[currentMessageIndex]);

            game.input.keyboard.removeKey(Phaser.Keyboard.ENTER);

            timer.destroy();
          }
        }, this);

        timer.start();
      }
    }
  }

  return bmpText;
}
