import {Keyboard} from 'phaser';

import {TILE_SIZE, getGame} from 'core/game';
import box from 'ui/box';

/**
 * @param {Array} messages
 * @return {Phaser.Group}
 */
export default function speechBubble(messages) {
  const container = box(15, 8);

  container.add(animateMessages(messages, container));

  return container;
}

/**
 * @param {string[]} messages
 * @param {Phaser.Group} container
 * @return {Phaser.BitmapText}
 */
function animateMessages(messages, container) {
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

    let currentCharacterIndex = 0;

    game.time.events.repeat(120, message.length, updateText, this);

    currentMessageIndex += 1;

    function updateText() {
      const timer = game.time.create(false);
      const character = characters[currentCharacterIndex];

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

        timer.start();
      }
    }
  }

  return bitmapText;
}
