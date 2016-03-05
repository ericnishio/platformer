import {Easing} from 'phaser';

import {getGame} from 'core/game';

const cache = {};

/**
 * @param {string} [color]
 * @param {number} [duration]
 */
export function transitionFromColor(color = '#000000', duration = 300) {
  const sprite = createOverlay(color);

  sprite.alpha = 1;

  getGame().add.tween(sprite).to({alpha: 0}, duration, Easing.Linear.None, true);
}

/**
 * @param {string} [color]
 * @param {number} [duration]
 */
export function transitionToColor(color = '#000000', duration = 300) {
  const sprite = createOverlay(color);

  sprite.alpha = 0;

  getGame().add.tween(sprite).to({alpha: 1}, duration, Easing.Linear.None, true);
}

/**
 * @param {string} color
 * @return {Phaser.Sprite}
 */
function createOverlay(color) {
  if (!cache[color]) {
    const game = getGame();
    const bitmapData = game.add.bitmapData(game.width, game.height);

    bitmapData.ctx.beginPath();
    bitmapData.ctx.rect(0, 0, game.width, game.height);
    bitmapData.ctx.fillStyle = color;
    bitmapData.ctx.fill();

    const sprite = game.add.sprite(0, 0, bitmapData);

    sprite.fixedToCamera = true;

    cache[color] = sprite;
  }

  return cache[color];
}
