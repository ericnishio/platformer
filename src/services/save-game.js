/**
 * @param {Phaser.Game} game
 * @param {Player}
 * @return {string}
 */
export function saveGame(game, player) {
  const snapshot = serialize(game, player);

  console.log(snapshot);

  // TODO: Store snapshot.

  return snapshot;
}

export function loadGame() {
  // TODO: Load and parse saved snapshot.
  // TODO: Create game from parsed snapshot.
}

/**
 * @param {Phaser.Game} game
 * @param {Player}
 * @return {string}
 */
function serialize(game, player) {
  const snapshot = createSnapshot(game, player);

  return JSON.stringify(snapshot);
}

/**
 * @param {Phaser.Game} game
 * @param {Player}
 * @return {Object}
 */
function createSnapshot(game, player) {
  return {
    player: player.createSnapshot()
  };
}
