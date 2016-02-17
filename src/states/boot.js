import GameState from 'states/game-state';

export default class Boot extends GameState {
  preload() {
    this.load.image('preloadBar', require('assets/spritesheets/preloader.png'));
  }

  create() {
    super.create();

    this.game.state.start('Preloader', true, false);
  }
}
