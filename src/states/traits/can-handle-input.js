import {Keyboard, Gamepad} from 'phaser';

/**
 * @param {GameState} state
 * @param {Object} options
 * @return {Object}
 */
export default (state, options) => {
  const actor = options.actor;

  const trait = {
    handleInput() {
      actor.body.velocity.x = 0;

      if (state.game.input.keyboard.isDown(Keyboard.LEFT)) {
        actor.walkLeft();
      }

      if (state.pad1.isDown(Gamepad.XBOX360_DPAD_LEFT)) {
        actor.walkLeft();
      }

      if (state.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
        actor.walkLeft();
      }

      if (state.game.input.keyboard.isDown(Keyboard.RIGHT)) {
        actor.walkRight();
      }

      if (state.pad1.isDown(Gamepad.XBOX360_DPAD_RIGHT)) {
        actor.walkRight();
      }

      if (state.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
        actor.walkRight();
      }

      if (state.game.input.keyboard.isDown(Keyboard.UP)) {
        actor.jump();
      }

      if (state.game.input.keyboard.isDown(Keyboard.S)) {
        actor.jump();
      }

      if (state.pad1.isDown(Gamepad.XBOX360_X)) {
        actor.jump();
      }

      if (state.game.input.keyboard.isDown(Keyboard.SPACEBAR)) {
        actor.fire();
      }

      if (state.game.input.keyboard.isDown(Keyboard.D)) {
        actor.fire();
      }

      if (state.pad1.isDown(Gamepad.XBOX360_Y)) {
        actor.fire();
      }
    }
  };

  trait.pad1 = state.game.input.gamepad.pad1;
  state.game.input.gamepad.start();

  return trait;
};
