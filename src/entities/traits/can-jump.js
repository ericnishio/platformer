import {getGame} from 'core/game';

/**
 * @param {Phaser.Sprite} sprite
 * @return {Phaser.Sprite}
 */
export default sprite => {
  const trait = {
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
  };

  sprite.effects.step = getGame().add.audio('step', 1, false);

  sprite.animations.add('jumpLeft', [8], 5, false); // TODO: Replace animation.
  sprite.animations.add('jumpRight', [0], 5, false); // TODO: Replace animation.

  return trait;
};
