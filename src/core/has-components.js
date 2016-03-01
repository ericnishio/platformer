/**
 * @param {*} parent
 * @return {Object}
 */
export default parent => {
  return {
    _components: {},

    /**
     * @param {function} component
     * @param {Object} options
     */
    addComponent(component, options) {
      component(parent, options);
    },

    /**
     * @param {string} id
     * @return {*}
     */
    getComponent(id) {
      return parent._components[id];
    }
  };
};
