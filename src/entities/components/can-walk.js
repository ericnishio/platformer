import {LEFT, RIGHT, Sprite} from 'phaser';

/**
 * @param {Phaser.Sprite} parent
 * @param {Object} options
 * @return {Object}
 */
export default (parent, options = {speed: 50}) => {
  if (!parent instanceof Sprite) {
    throw Error('Parent of canWalk must extend Phaser.Sprite');
  }

  if (!parent.body) {
    throw Error('Parent of canWalk must have a body');
  }

  const component = Object.assign({}, options, {
    facingX: RIGHT,

    walkLeft() {
      parent.body.velocity.x = -(component.getSpeed());
      component.faceLeft();
      parent.animations.play('walkLeft');
      parent.play('left');
    },

    walkRight() {
      parent.body.velocity.x = component.getSpeed();
      component.faceRight();
      parent.animations.play('walkRight');
      parent.play('right');
    },

    /**
     * @param {number} speed
     */
    setSpeed(speed) {
      component.speed = speed;
    },

    /**
     * @return {number}
     */
    getSpeed() {
      return component.speed;
    },

    faceRight() {
      component.facingX = RIGHT;
    },

    faceLeft() {
      component.facingX = LEFT;
    },

    /**
     * @return {boolean}
     */
    isFacingRight() {
      return component.facingX === RIGHT;
    },

    /**
     * @return {boolean}
     */
    isFacingLeft() {
      return component.facingX === LEFT;
    }
  });

  parent.animations.add('walkRight', [1, 2, 0], 5, false);
  parent.animations.add('walkLeft', [9, 10, 8], 5, false);

  parent._components.canWalk = component;

  return component;
};
