const TYPE_SPEED = 150;

/**
 * @param {string} message
 * @param {Game} game
 * @return {string}
 */
export default (message, game) => {
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
};

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
