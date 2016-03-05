import {LEFT, RIGHT} from 'phaser';

import {TILE_SIZE} from 'core/game';
import {transitionFromColor, transitionToColor} from 'ui/transitions';

const FADE_DURATION = 400;
const FADE_COLOR = '#000000';

/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  const component = {
    isEnteringDoor: false,
    doors: [],

    /**
     * @param {number} fromX
     * @param {number} fromY
     * @param {number} toX
     * @param {number} toY
     * @param {boolean} [twoWaysFromDir]
     */
    createDoor(fromX, fromY, toX, toY, twoWaysFromDir = false) {
      component.doors.push({fromX, fromY, toX, toY});

      if (twoWaysFromDir === LEFT) {
        component.doors.push({
          fromX: toX - TILE_SIZE,
          fromY: toY,
          toX: fromX - (2 * TILE_SIZE),
          toY: fromY
        });
      }

      if (twoWaysFromDir === RIGHT) {
        component.doors.push({
          fromX: toX + TILE_SIZE,
          fromY: toY,
          toX: fromX + (2 * TILE_SIZE),
          toY: fromY
        });
      }
    },

    update() {
      const player = parent.getComponent('hasPlayer').getPlayer();
      const door = component.getDoorAt(player.x, player.y);

      if (door && !component.isEnteringDoor) {
        component.enterDoor(door, player);
      }
    },

    /**
     * @param {number} x
     * @param {number} y
     * @return {?Object}
     */
    getDoorAt(x, y) {
      for (const door of component.doors) {
        if (door.fromX >= x && door.fromX <= x + TILE_SIZE && door.fromY >= y && door.fromY <= y + TILE_SIZE) {
          return door;
        }
      }

      return null;
    },

    /**
     * @param {Object} door
     * @param {Player} player
     */
    enterDoor(door, player) {
      component.isEnteringDoor = true;

      transitionToColor(FADE_COLOR);

      parent.game.time.events.add(FADE_DURATION, () => {
        player.x = door.toX;
        player.y = door.toY;

        transitionFromColor(FADE_COLOR);

        component.isEnteringDoor = false;
      }, FADE_DURATION);
    }
  };

  parent._components.hasDoors = component;

  return component;
};
