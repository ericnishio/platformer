import {Keyboard, Gamepad} from 'phaser';

/**
 * @param {GameState} parent
 * @param {Object} options
 * @return {Object}
 */
export default (parent, {actor}) => {
  const component = {
    update() {
      actor.body.velocity.x = 0;

      if (parent.game.input.keyboard.isDown(Keyboard.LEFT)) {
        actor.getComponent('canWalk').walkLeft();
      }

      if (component.pad1.isDown(Gamepad.XBOX360_DPAD_LEFT)) {
        actor.getComponent('canWalk').walkLeft();
      }

      if (component.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
        actor.getComponent('canWalk').walkLeft();
      }

      if (parent.game.input.keyboard.isDown(Keyboard.RIGHT)) {
        actor.getComponent('canWalk').walkRight();
      }

      if (component.pad1.isDown(Gamepad.XBOX360_DPAD_RIGHT)) {
        actor.getComponent('canWalk').walkRight();
      }

      if (component.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
        actor.getComponent('canWalk').walkRight();
      }

      if (parent.game.input.keyboard.isDown(Keyboard.UP)) {
        actor.getComponent('canJump').jump();
      }

      if (parent.game.input.keyboard.isDown(Keyboard.S)) {
        actor.getComponent('canJump').jump();
      }

      if (component.pad1.isDown(Gamepad.XBOX360_X)) {
        actor.getComponent('canJump').jump();
      }

      if (parent.game.input.keyboard.isDown(Keyboard.SPACEBAR)) {
        actor.getComponent('canWieldBlaster').fire();
      }

      if (parent.game.input.keyboard.isDown(Keyboard.D)) {
        actor.getComponent('canWieldBlaster').fire();
      }

      if (component.pad1.isDown(Gamepad.XBOX360_Y)) {
        actor.getComponent('canWieldBlaster').fire();
      }
    }
  };

  component.pad1 = parent.game.input.gamepad.pad1;
  parent.game.input.gamepad.start();

  parent._components.canHandleInput = component;

  return component;
};
