import {Camera, Keyboard, Gamepad} from 'phaser';

import OxygenMeter from 'ui/oxygen-meter';
import Player from 'sprites/entities/creatures/player';

export default state => {
  const trait = Object.assign({}, state, {
    /**
     * @param {number} x
     * @param {number} y
     */
    createPlayer(x, y) {
      this.player = Player(x, y);
      this.oxygenMeter = OxygenMeter(this.getPlayer());
      this.game.camera.follow(this.player, Camera.FOLLOW_LOCKON);
    },

    /**
     * @return {Player}
     */
    getPlayer() {
      return this.player;
    },

    handleInput() {
      this.getPlayer().body.velocity.x = 0;

      if (this.game.input.keyboard.isDown(Keyboard.LEFT) || this.pad1.isDown(Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
        this.getPlayer().walkLeft();
      }

      if (this.game.input.keyboard.isDown(Keyboard.RIGHT) || this.pad1.isDown(Gamepad.XBOX360_DPAD_RIGHT) || this.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
        this.getPlayer().walkRight();
      }

      if (this.getPlayer().canJump() && (this.game.input.keyboard.isDown(Keyboard.UP) || this.game.input.keyboard.isDown(Keyboard.S) || this.pad1.isDown(Gamepad.XBOX360_X))) {
        this.getPlayer().jump();
      }

      if (this.game.input.keyboard.isDown(Keyboard.SPACEBAR) || this.game.input.keyboard.isDown(Keyboard.D) || this.pad1.isDown(Gamepad.XBOX360_Y)) {
        this.getPlayer().fire();
      }
    }
  });

  trait.pad1 = state.game.input.gamepad.pad1;
  trait.game.input.gamepad.start();

  return trait;
};
