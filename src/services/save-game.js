import Lockr from 'lockr';

const STORAGE = 'platformer.save';

/**
 * @param {Phaser.Game} game
 * @param {Player}
 */
export function saveGame(game, player) {
  const snapshot = createSnapshot(game, player);
  const json = serialize(snapshot);

  Lockr.set(STORAGE, json);

  console.log('Game saved:', snapshot, json);
}

export function loadGame() {
  const json = Lockr.get(STORAGE);
  const snapshot = deserialize(json);

  // TODO: Create game from parsed snapshot.

  console.log('Game loaded:', snapshot, json);
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

/**
 * @param {Object} snapshot
 * @return {string}
 */
export function serialize(snapshot) {
  return JSON.stringify(snapshot);
}

/**
 * @param {string} json
 * @return {Object}
 */
export function deserialize(json) {
  return JSON.parse(json);
}
