import Phaser from 'phaser';
import GameState from 'states/game-state';
import {TILE_SIZE} from 'core/game';

export default class Preloader extends GameState {
  preload() {
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.load.bitmapFont(
      'press-start-2p',
      require('assets/fonts/bitmap/press-start-2p/press-start-2p.png'),
      require('assets/fonts/bitmap/press-start-2p/press-start-2p.fnt')
    );

    this.load.tilemap('Stage1', require('assets/tilemaps/stage1.json'), null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('terrain-1x1-1', require('assets/spritesheets/terrain-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    this.load.spritesheet('structures-2x2-1', require('assets/spritesheets/structures-2x2-1.png'), TILE_SIZE * 2, TILE_SIZE * 2);
    this.load.spritesheet('creatures-1x2-1', require('assets/spritesheets/creatures-1x2-1.png'), TILE_SIZE, TILE_SIZE * 2);
    this.load.spritesheet('items-1x1-1', require('assets/spritesheets/items-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    this.load.spritesheet('weapons-1x1-1', require('assets/spritesheets/weapons-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    this.load.spritesheet('effects-1x1-1', require('assets/spritesheets/effects-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    this.load.spritesheet('oxygen-meter', require('assets/spritesheets/oxygen-meter.png'), TILE_SIZE * 7, TILE_SIZE);

    this.load.audio('laser1', require('assets/audio/effects/laser1.ogg'));
    this.load.audio('combustion1', require('assets/audio/effects/combustion1.ogg'));
    this.load.audio('explosion1', require('assets/audio/effects/explosion1.ogg'));
    this.load.audio('powerup1', require('assets/audio/effects/powerup1.ogg'));
    this.load.audio('powe1`rup2', require('assets/audio/effects/powerup2.ogg'));
    this.load.audio('step', require('assets/audio/effects/step.ogg'));
    this.load.audio('turn-on1', require('assets/audio/effects/turn-on1.ogg'));
  }

  create() {
    super.create();

    const text = this.game.add.bitmapText(
      this.game.world.centerX,
      this.game.world.centerY - TILE_SIZE * 2,
      'press-start-2p',
      'Loading'.toUpperCase(),
      16
    );

    text.anchor.set(0.5, 0.5);
    text.tint = 0xFFFFFF;

    this.add.tween(text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);

    this.add
      .tween(this.preloadBar)
      .to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true)
      .onComplete.add(this.startGame, this);
  }

  startGame() {
    this.game.state.start('Stage1', true, false);
  }
}
