import {find} from 'lodash';

/**
 * @param {Object} parent
 * @return {Object}
 */
export default parent => {
  const component = {
    inventory: [],

    /**
     * @param {Item} item
     * @return {boolean}
     */
    hasItem(item) {
      return this.hasItemByClassName(item.className);
    },

    /**
     * @param {string} itemType
     * @return {boolean}
     */
    hasItemByType(itemType) {
      let hasIt = false;

      this.inventory.forEach((itemInInventory) => {
        if (itemInInventory.getItemType() === itemType) {
          hasIt = true;
        }
      });

      return hasIt;
    },

    /**
     * @param {string} itemName
     * @return {boolean}
     */
    hasItemByClassName(className) {
      let hasIt = false;

      this.inventory.forEach((itemInInventory) => {
        if (itemInInventory.className === className) {
          hasIt = true;
        }
      });

      return hasIt;
    },

    /**
     * @param {string} itemId
     * @return {boolean}
     */
    hasItemById(itemId) {
      return !!find(this.inventory, item => item.id === itemId);
    },

    /**
     * @param {Item} item
     * @return {number}
     */
    getItemCountInInventory(item) {
      let count = 0;

      this.inventory.forEach(itemInInventory => {
        if (item.className === itemInInventory.className) {
          count += 1;
        }
      });

      return count;
    },

    /**
     * @param {Item} item
     */
    addToInventory(item) {
      if (this.canAddToInventory(item)) {
        this.inventory.push(item);
      }
    },

    /**
     * @param {Item} item
     * @return {boolean}
     */
    canAddToInventory(item) {
      return this.getItemCountInInventory(item) < item.getMaxInInventory();
    },

    /**
     * @return {Object}
     */
    createSnapshot() {
      return {
        inventory: component.inventory.map(item => ({
          id: item.id,
          className: item.className
          // TODO: Include more props.
        }))
      };
    }
  };

  parent._components.hasInventory = component;

  return component;
};
