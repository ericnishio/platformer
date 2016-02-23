/**
 * @param {Phaser.Sprite} sprite
 * @return {Phaser.Sprite}
 */
export default sprite => {
  return Object.assign({}, sprite, {
    inventory: [],

    /**
     * Checks if the creature carries an item.
     * @param {Item} item
     * @return {boolean}
     */
    hasItem(item) {
      return this.hasItemByName(item.name);
    },

    /**
     * Checks if the creature carries an item by item type.
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
     * Checks if the creature carries an item.
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
     * Returns the inventory count for the given item type.
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
     * Adds an item to the inventory.
     * @param {Item} item
     */
    addToInventory(item) {
      if (this.canAddToInventory(item)) {
        this.inventory.push(item);
      }
    },

    /**
     * Checks if an item can be added to the inventory.
     * @param {Item} item
     * @return {boolean}
     */
    canAddToInventory(item) {
      return this.getItemCountInInventory(item) < item.getMaxInInventory();
    }
  });
};
