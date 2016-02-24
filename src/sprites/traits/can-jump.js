import {getGame} from 'core/game';

/**
 * @param {Phaser.Sprite} sprite
 * @return {Phaser.Sprite}
 */
export default sprite => {
  const trait = Object.assign({}, sprite, {
    /**
     * @return {boolean}
     */
    canJump() {
      return sprite.body.onFloor() || sprite.body.touching.down;
    },

    jump() {
      this.body.velocity.y = -(this.getSpeed() * 1.8);

      if (this.isFacingLeft()) {
        this.animations.play('jumpLeft');
      } else {
        this.animations.play('jumpRight');
      }

      this.effects.step.play();
    }
  });

  trait.effects.step = getGame().add.audio('step', 1, false);

  trait.animations.add('jumpLeft', [8], 5, false); // TODO: Replace animation.
  trait.animations.add('jumpRight', [0], 5, false); // TODO: Replace animation.

  return trait;
};
