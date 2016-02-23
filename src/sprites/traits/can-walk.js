import {LEFT, RIGHT} from 'phaser';

/**
 * @param {Phaser.Sprite} sprite
 * @return {Phaser.Sprite}
 */
export default sprite => {
  const trait = Object.assign({}, sprite, {
    facingX: RIGHT,
    speed: 50,

    walkLeft() {
      this.body.velocity.x = -(this.getSpeed());
      this.faceLeft();
      this.animations.play('walkLeft');
      this.play('left');
    },

    walkRight() {
      this.body.velocity.x = this.getSpeed();
      this.faceRight();
      this.animations.play('walkRight');
      this.play('right');
    },

    /**
     * @param {number} speed
     */
    setSpeed(speed) {
      this.speed = speed;
    },

    /**
     * @return {number}
     */
    getSpeed() {
      return this.speed;
    },

    faceRight() {
      this.facingX = RIGHT;
    },

    faceLeft() {
      this.facingX = LEFT;
    },

    /**
     * @return {boolean}
     */
    isFacingRight() {
      return this.facingX === RIGHT;
    },

    /**
     * @return {boolean}
     */
    isFacingLeft() {
      return this.facingX === LEFT;
    }
  });

  trait.animations.add('walkRight', [1, 2, 0], 5, false);
  trait.animations.add('walkLeft', [9, 10, 8], 5, false);

  return trait;
};
