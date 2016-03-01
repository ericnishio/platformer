import {Physics} from 'phaser';

import {TYPE_FIREARM} from 'entities/actors/items/item';

/**
 * @param {Phaser.Sprite} parent
 * @return {Object}
 */
export default parent => {
  if (!parent.getComponent('canWalk')) {
    throw Error('Component canWieldBlaster requires canWalk');
  }

  const component = {
    initBullets() {
      component.bullets = parent.game.add.group();
      component.bullets.enableBody = true;
      component.bullets.physicsBodyType = Physics.ARCADE;
      component.bullets.createMultiple(30, 'weapons-1x1-1', 3);
      component.bullets.setAll('anchor.x', 0.5);
      component.bullets.setAll('anchor.y', 1);
      component.bullets.setAll('outOfBoundsKill', true);
      component.bullets.setAll('checkWorldBounds', true);
      component.bulletTime = parent.game.time.now;
    },

    /**
     * @return {Phaser.Group}
     */
    getBullets() {
      return component.bullets;
    },

    fire() {
      if (parent.getComponent('hasInventory').hasItemByType(TYPE_FIREARM) && parent.game.time.now > component.bulletTime) {
        const bullet = component.bullets.getFirstDead();

        bullet.body.setSize(parent.width - 3, parent.height - 7);

        if (bullet) {
          bullet.reset(component.getBulletOffsetX(), component.getBulletOffsetY());
          bullet.body.velocity.x = component.getBulletVelocity(420);

          component.bulletTime = parent.game.time.now + 200;
        }

        parent.effects.shoot.play();
      }
    },

    /**
     * Returns the X offset of bullet origin.
     * @return {number}
     */
    getBulletOffsetX() {
      return parent.getComponent('canWalk').isFacingRight() ? parent.x + 10 : parent.x - 10;
    },

    /**
     * Returns the Y offset of bullet origin.
     * @return {number}
     */
    getBulletOffsetY() {
      return parent.y - 6;
    },

    /**
     * Returns a firing velocity based on which way the blaster wielder is facing.
     * @param {number} speed
     * @return {number}
     */
    getBulletVelocity(speed) {
      return parent.getComponent('canWalk').isFacingRight() ? speed : -speed;
    }
  };

  parent.effects.shoot = parent.game.add.audio('laser1', 1, false);

  component.initBullets();

  parent._components.canWieldBlaster = component;

  return component;
};
