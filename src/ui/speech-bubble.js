import {Keyboard} from 'phaser';

import {TILE_SIZE, getGame} from 'core/game';
import Box from 'ui/box';
import {wordwrap} from 'services/util';

/**
 * @param {string[]} messages
 * @param {function} [callback]
 * @return {Phaser.Group}
 */
export default (messages, callback = () => {}) => {
  const container = Box(15, 8);
  const wrappedMessages = wrapMessages(messages);

  container.add(animateMessages(wrappedMessages, container, callback));

  return container;
};

/**
 * @param {string[]} messages
 * @return {string[]}
 */
function wrapMessages(messages) {
  return messages.map(message => wordwrap(message));
}

/**
 * @param {string[]} messages
 * @param {Phaser.Group} container
 * @param {function} callback
 * @return {Phaser.BitmapText}
 */
function animateMessages(messages, container, callback) {
  const game = getGame();

  let currentMessageIndex = 0;

  const bitmapText = game.add.bitmapText(TILE_SIZE, TILE_SIZE, 'press-start-2p', '', 10);

  bitmapText.maxWidth = 12 * TILE_SIZE;

  animateMessage(messages[currentMessageIndex]);

  /**
   * @param {string} message
   */
  function animateMessage(message) {
    const characters = message.split('');
    const charactersToRender = [];
    const repeat = game.time.events.repeat(120, message.length, updateText, this);

    let currentCharacterIndex = 0;

    currentMessageIndex += 1;

    function updateText() {
      const timer = game.time.create(false);
      const character = characters[currentCharacterIndex];

      game.input.keyboard
        .addKey(Keyboard.ENTER)
        .onDown.add(() => {
          repeat.delay = 0;
          game.input.keyboard.removeKey(Keyboard.ENTER);
        }, this);

      currentCharacterIndex += 1;

      charactersToRender.push(character);

      bitmapText.text = charactersToRender.join('');

      if (charactersToRender.length === characters.length && currentMessageIndex === messages.length) {
        game.input.keyboard
          .addKey(Keyboard.ENTER)
          .onDown.add(() => {
            container.destroy();
            game.input.keyboard.removeKey(Keyboard.ENTER);
          }, this);

        callback();
      }

      if (charactersToRender.length === characters.length && currentMessageIndex < messages.length) {
        let hasRequestedNextPage = false;

        game.input.keyboard
          .addKey(Keyboard.ENTER)
          .onDown.add(() => {
            hasRequestedNextPage = true;
          }, this);

        timer.loop(100, () => {
          if (hasRequestedNextPage) {
            animateMessage(messages[currentMessageIndex]);

            game.input.keyboard.removeKey(Keyboard.ENTER);

            timer.destroy();
          }
        }, this);

        bitmapText.text = bitmapText.text + '\n\n(...)';

        timer.start();
      }
    }
  }

  return bitmapText;
}
