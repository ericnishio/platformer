import {Easing} from 'phaser';

import GameState from 'states/game-state';
import Stage1 from 'states/stages/stage-1';
import {TILE_SIZE} from 'core/game';

export default class Preloader extends GameState {
  init(params) {
    this.stageId = params.id || 'Stage1';
    this.stageClass = params.class || Stage1;

    this.game.state.add(params.id, params.class, false);
  }

  preload() {
    this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.stageClass.toPreload(this);
  }

  create() {
    super.create();

    const text = this.game.add.bitmapText(
      this.game.width / 2,
      (this.game.height / 2) - TILE_SIZE * 2,
      'press-start-2p',
      'Loading'.toUpperCase(),
      16
    );

    text.anchor.set(0.5, 0.5);
    text.tint = 0xFFFFFF;

    this.add.tween(text).to({alpha: 0}, 1000, Easing.Linear.None, true);

    this.add
      .tween(this.preloadBar)
      .to({alpha: 0}, 1000, Easing.Linear.None, true)
      .onComplete.add(this.startGame, this);
  }

  startGame() {
    this.game.state.start(this.stageId, true, false);
  }
}
