import Phaser from 'phaser';

const PixelScaler = function(game, parent) {
  Phaser.Plugin.call(this, game, parent);
};

PixelScaler.prototype = Object.create(Phaser.Plugin.prototype);

PixelScaler.prototype.init = function(scale) {
  this.scale = scale;

  this.originalWidth = this.game.width;
  this.originalHeight = this.game.height;

  this.scaledWidth = this.originalWidth * this.scale;
  this.scaledHeight = this.originalHeight * this.scale;

  // create a new scaled canvas to draw to
  this.scaledCanvas = Phaser.Canvas.create(this.game.parent, this.scaledWidth, this.scaledHeight);
  this.context = this.scaledCanvas.getContext('2d');

  Phaser.Canvas.addToDOM(this.scaledCanvas, this.game.parent);
  Phaser.Canvas.setSmoothingEnabled(this.context, false);

  this.originalCanvas = this.game.canvas;

  this.originalCanvas.style.display = 'none';
};

PixelScaler.prototype.postRender = function() {
  this.context.drawImage(
    this.originalCanvas,
    0, 0,
    this.originalWidth,
    this.originalHeight,
    0, 0,
    this.scaledWidth,
    this.scaledHeight
  );
};

export default PixelScaler;
