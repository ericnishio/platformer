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
      if (!trait.canJump()) {
        return;
      }

      sprite.body.velocity.y = -(sprite.getSpeed() * 1.8);

      if (sprite.isFacingLeft()) {
        sprite.animations.play('jumpLeft');
      } else {
        sprite.animations.play('jumpRight');
      }

      sprite.effects.step.play();
    }
  });

  trait.effects.step = getGame().add.audio('step', 1, false);

  trait.animations.add('jumpLeft', [8], 5, false); // TODO: Replace animation.
  trait.animations.add('jumpRight', [0], 5, false); // TODO: Replace animation.

  return trait;
};
