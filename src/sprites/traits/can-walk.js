import {LEFT, RIGHT} from 'phaser';

/**
 * @param {Phaser.Sprite} sprite
 * @return {Phaser.Sprite}
 */
export default sprite => {
  return Object.assign({}, sprite, {
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
     * Sets the creature's speed.
     * @param {number} speed
     */
    setSpeed(speed) {
      this.speed = speed;
    },

    /**
     * Returns the creature's speed.
     * @return {number}
     */
    getSpeed() {
      return this.speed;
    },

    /**
     * Sets this.facingX to Phaser.RIGHT.
     */
    faceRight() {
      this.facingX = RIGHT;
    },

    /**
     * Sets this.facingX to Phaser.LEFT.
     */
    faceLeft() {
      this.facingX = LEFT;
    },

    /**
     * Checks if the creature is facing right.
     * @return {boolean}
     */
    isFacingRight() {
      return this.facingX === RIGHT;
    },

    /**
     * Checks if the creature is facing left.
     * @return {boolean}
     */
    isFacingLeft() {
      return this.facingX === LEFT;
    }
  });
};
