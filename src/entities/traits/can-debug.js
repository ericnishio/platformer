import {getTilePosition} from 'core/game';
import Blaster from 'entities/actors/items/blaster';

export default sprite => {
  window.IDKFA = () => {
    const blaster = Blaster(sprite.x, sprite.y);
    sprite.addToInventory(blaster);
    blaster.kill();
  };

  /**
   * @param {number} tileX
   * @param {number} tileY
   */
  window.GOTO = (tileX, tileY) => {
    sprite.x = getTilePosition(tileX);
    sprite.y = getTilePosition(tileY);
  };
};
