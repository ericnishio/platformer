import {LEFT, RIGHT} from 'phaser';

/**
 * @param {Phaser.Sprite} sprite
 * @param {Object} options
 * @return {Phaser.Sprite}
 */
export default (sprite, options = {speed: 50}) => {
  const trait = Object.assign({}, options, {
    facingX: RIGHT,

    walkLeft() {
      sprite.body.velocity.x = -(trait.getSpeed());
      trait.faceLeft();
      sprite.animations.play('walkLeft');
      sprite.play('left');
    },

    walkRight() {
      sprite.body.velocity.x = trait.getSpeed();
      trait.faceRight();
      sprite.animations.play('walkRight');
      sprite.play('right');
    },

    /**
     * @param {number} speed
     */
    setSpeed(speed) {
      trait.speed = speed;
    },

    /**
     * @return {number}
     */
    getSpeed() {
      return trait.speed;
    },

    faceRight() {
      trait.facingX = RIGHT;
    },

    faceLeft() {
      trait.facingX = LEFT;
    },

    /**
     * @return {boolean}
     */
    isFacingRight() {
      return trait.facingX === RIGHT;
    },

    /**
     * @return {boolean}
     */
    isFacingLeft() {
      return trait.facingX === LEFT;
    }
  });

  sprite.animations.add('walkRight', [1, 2, 0], 5, false);
  sprite.animations.add('walkLeft', [9, 10, 8], 5, false);

  return trait;
};
