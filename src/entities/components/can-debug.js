import {getTilePosition} from 'core/game';
import Blaster from 'entities/actors/items/blaster';

/**
 * @param {Phaser.Sprite} parent
 */
export default parent => {
  window.IDKFA = () => {
    const blaster = Blaster(parent.x, parent.y);
    parent.getComponent('hasInventory').addToInventory(blaster);
    blaster.kill();
  };

  /**
   * @param {number} tileX
   * @param {number} tileY
   */
  window.GOTO = (tileX, tileY) => {
    parent.x = getTilePosition(tileX);
    parent.y = getTilePosition(tileY);
  };
};
