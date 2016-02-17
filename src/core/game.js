import Phaser, {Game} from 'phaser';

import Boot from 'states/boot';
import Preloader from 'states/preloader';
import StageClear from 'states/stage-clear';
import Stage1 from 'stages/1';

export const TILE_SIZE = 16;
export const PIXEL_SCALE = 2;

let _store;

/**
 * @param {Object} store
 * @return {Game}
 */
export default function createGame(store) {
  _store = store;

  const _game = new Game(
    427,
    240,
    Phaser.AUTO,
    'phaser',
    null,
    false,
    false
  );

  _game.state.add('Boot', Boot, false);
  _game.state.add('Preloader', Preloader, false);
  _game.state.add('StageClear', StageClear, false);
  _game.state.add('Stage1', Stage1, false);

  _game.state.start('Boot');

  return _game;
}

/**
 * @param {number} tile
 * @return {number}
 */
export function getTileCoordinate(tile) {
  return TILE_SIZE * tile;
}

/**
 * @return {Function}
 */
export function dispatch() {
  return getStore().dispatch;
}

/**
 * @return {Object}
 */
export function getState() {
  return getStore().getState();
}

/**
 * @return {Object}
 */
function getStore() {
  return _store;
}
