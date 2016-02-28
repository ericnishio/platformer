/**
 * @return {Object}
 */
export default () => {
  return {
    inventory: [],

    /**
     * @param {Item} item
     * @return {boolean}
     */
    hasItem(item) {
      return this.hasItemByName(item.name);
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
    hasItemByName(itemName) {
      let hasIt = false;

      this.inventory.forEach((itemInInventory) => {
        if (itemInInventory.name === itemName) {
          hasIt = true;
        }
      });

      return hasIt;
    },

    /**
     * @param {Item} item
     * @return {number}
     */
    getItemCountInInventory(item) {
      let count = 0;

      this.inventory.forEach((itemInInventory) => {
        if (item.name === itemInInventory.name) {
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
    }
  };
};
