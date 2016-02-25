import {Camera, Keyboard, Gamepad} from 'phaser';

import OxygenMeter from 'ui/oxygen-meter';
import Player from 'entities/actors/creatures/player';

export default (state, options) => {
  const trait = Object.assign({}, state, {
    /**
     * @param {number} x
     * @param {number} y
     */
    createPlayer(x, y) {
      trait.player = Player(x, y);
      trait.oxygenMeter = OxygenMeter(trait.getPlayer());
      trait.game.camera.follow(trait.player, Camera.FOLLOW_LOCKON);
    },

    /**
     * @return {Player}
     */
    getPlayer() {
      return trait.player;
    },

    handleInput() {
      trait.getPlayer().body.velocity.x = 0;

      if (state.game.input.keyboard.isDown(Keyboard.LEFT) || state.pad1.isDown(Gamepad.XBOX360_DPAD_LEFT) || state.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
        trait.getPlayer().walkLeft();
      }

      if (state.game.input.keyboard.isDown(Keyboard.RIGHT) || state.pad1.isDown(Gamepad.XBOX360_DPAD_RIGHT) || state.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
        trait.getPlayer().walkRight();
      }

      if (trait.getPlayer().canJump() && (state.game.input.keyboard.isDown(Keyboard.UP) || state.game.input.keyboard.isDown(Keyboard.S) || state.pad1.isDown(Gamepad.XBOX360_X))) {
        trait.getPlayer().jump();
      }

      if (state.game.input.keyboard.isDown(Keyboard.SPACEBAR) || state.game.input.keyboard.isDown(Keyboard.D) || state.pad1.isDown(Gamepad.XBOX360_Y)) {
        trait.getPlayer().fire();
      }
    }
  });

  trait.pad1 = state.game.input.gamepad.pad1;
  trait.game.input.gamepad.start();

  if (options.x && options.y) {
    trait.createPlayer(options.x, options.y);
  }

  return trait;
};
