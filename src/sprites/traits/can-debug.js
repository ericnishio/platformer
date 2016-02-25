import {getTileCoordinate} from 'core/game';
import Blaster from 'sprites/entities/items/blaster';

export default sprite => {
  window.idkfa = () => {
    const blaster = Blaster(sprite.x, sprite.y);
    sprite.addToInventory(blaster);
    blaster.kill();
  };

  /**
   * @param {number} tileX
   * @param {number} tileY
   */
  window.goto = (tileX, tileY) => {
    sprite.x = getTileCoordinate(tileX);
    sprite.y = getTileCoordinate(tileY);
  };
};
