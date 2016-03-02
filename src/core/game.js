import {AUTO, Game} from 'phaser';

import Boot from 'states/boot';

export const TILE_SIZE = 16;
export const PIXEL_SCALE = 2;

let _game;

/**
 * @return {Phaser.Game}
 */
export default function createGame() {
  _game = new Game(
    400,
    225,
    AUTO,
    'phaser',
    null,
    false,
    false
  );

  _game.state.add('Boot', Boot, false);
  _game.state.start('Boot');

  return _game;
}

/**
 * @return {Phaser.Game}
 */
export function getGame() {
  return _game;
}

/**
 * @param {string} id
 * @param {Stage} stageClass
 */
export function startStage(stageId, stageClass) {
  const params = {stageId, stageClass};

  getGame().state.start('Preloader', true, false, params);
}

/**
 * @param {number} tile
 * @return {number}
 */
export function getTilePosition(tile) {
  return TILE_SIZE * tile;
}
