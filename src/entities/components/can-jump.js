import {Sprite} from 'phaser';

import {getGame} from 'core/game';

/**
 * @param {Phaser.Sprite} parent
 * @return {Object}
 */
export default parent => {
  if (!parent instanceof Sprite) {
    throw Error('Parent of canJump must extend Phaser.Sprite');
  }

  if (!parent.body) {
    throw Error('Parent of canJump must have a body');
  }

  if (!parent.getComponent('canWalk')) {
    throw Error('Component canJump requires canWalk');
  }

  const component = {
    /**
     * @return {boolean}
     */
    canJump() {
      return parent.body.onFloor() || parent.body.touching.down;
    },

    jump() {
      if (!component.canJump()) {
        return;
      }

      parent.body.velocity.y = -(parent.getComponent('canWalk').getSpeed() * 1.8);

      if (parent.getComponent('canWalk').isFacingLeft()) {
        parent.animations.play('jumpLeft');
      } else {
        parent.animations.play('jumpRight');
      }

      parent.effects.step.play();
    }
  };

  parent.effects.step = getGame().add.audio('step', 1, false);

  parent.animations.add('jumpLeft', [8], 5, false); // TODO: Replace animation.
  parent.animations.add('jumpRight', [0], 5, false); // TODO: Replace animation.

  parent._components.canJump = component;

  return component;
};
