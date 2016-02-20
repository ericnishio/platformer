import GameState from 'states/game-state';

export default class Boot extends GameState {
  preload() {
  }

  create() {
    super.create();

    this.game.state.start('Preloader', true, false);
  }
}
