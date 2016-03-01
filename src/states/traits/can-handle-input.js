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
        actor.getComponent('canWalk').walkLeft();
      }

      if (state.pad1.isDown(Gamepad.XBOX360_DPAD_LEFT)) {
        actor.getComponent('canWalk').walkLeft();
      }

      if (state.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
        actor.getComponent('canWalk').walkLeft();
      }

      if (state.game.input.keyboard.isDown(Keyboard.RIGHT)) {
        actor.getComponent('canWalk').walkRight();
      }

      if (state.pad1.isDown(Gamepad.XBOX360_DPAD_RIGHT)) {
        actor.getComponent('canWalk').walkRight();
      }

      if (state.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
        actor.getComponent('canWalk').walkRight();
      }

      if (state.game.input.keyboard.isDown(Keyboard.UP)) {
        actor.getComponent('canJump').jump();
      }

      if (state.game.input.keyboard.isDown(Keyboard.S)) {
        actor.getComponent('canJump').jump();
      }

      if (state.pad1.isDown(Gamepad.XBOX360_X)) {
        actor.getComponent('canJump').jump();
      }

      if (state.game.input.keyboard.isDown(Keyboard.SPACEBAR)) {
        actor.getComponent('canWieldBlaster').fire();
      }

      if (state.game.input.keyboard.isDown(Keyboard.D)) {
        actor.getComponent('canWieldBlaster').fire();
      }

      if (state.pad1.isDown(Gamepad.XBOX360_Y)) {
        actor.getComponent('canWieldBlaster').fire();
      }
    }
  };

  trait.pad1 = state.game.input.gamepad.pad1;
  state.game.input.gamepad.start();

  return trait;
};
