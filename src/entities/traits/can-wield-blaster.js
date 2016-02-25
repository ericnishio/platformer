import {Physics} from 'phaser';

import {TYPE_FIREARM} from 'entities/actors/items/item';

export default sprite => {
  const trait = Object.assign({}, sprite, {
    initBullets() {
      trait.bullets = sprite.game.add.group();
      trait.bullets.enableBody = true;
      trait.bullets.physicsBodyType = Physics.ARCADE;
      trait.bullets.createMultiple(30, 'weapons-1x1-1', 3);
      trait.bullets.setAll('anchor.x', 0.5);
      trait.bullets.setAll('anchor.y', 1);
      trait.bullets.setAll('outOfBoundsKill', true);
      trait.bullets.setAll('checkWorldBounds', true);
      trait.bulletTime = sprite.game.time.now;
    },

    /**
     * @return {Phaser.Group}
     */
    getBullets() {
      return trait.bullets;
    },

    fire() {
      if (sprite.hasItemByType(TYPE_FIREARM) && sprite.game.time.now > trait.bulletTime) {
        const bullet = trait.bullets.getFirstDead();

        bullet.body.setSize(sprite.width - 3, sprite.height - 7);

        if (bullet) {
          bullet.reset(trait.getBulletOffsetX(), trait.getBulletOffsetY());
          bullet.body.velocity.x = trait.getBulletVelocity(420);

          trait.bulletTime = sprite.game.time.now + 200;
        }

        sprite.effects.shoot.play();
      }
    },

    /**
     * Returns the X offset of bullet origin.
     * @return {number}
     */
    getBulletOffsetX() {
      return sprite.isFacingRight() ? sprite.x + 10 : sprite.x - 10;
    },

    /**
     * Returns the Y offset of bullet origin.
     * @return {number}
     */
    getBulletOffsetY() {
      return sprite.y - 6;
    },

    /**
     * Returns a firing velocity based on which way the blaster wielder is facing.
     * @param {number} speed
     * @return {number}
     */
    getBulletVelocity(speed) {
      return sprite.isFacingRight() ? speed : -speed;
    }
  });

  trait.effects.shoot = sprite.game.add.audio('laser1', 1, false);

  trait.initBullets();

  return trait;
};
