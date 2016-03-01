export default {
  _components: {},

  /**
   * @param {function} component
   * @param {Object} options
   */
  addComponent(component, options) {
    component(this, options);
  },

  /**
   * @param {string} id
   * @return {*}
   */
  getComponent(id) {
    return this._components[id];
  }
};
