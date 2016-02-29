export default () => {
  return {
    toUpdate: [],

    /**
     * @param {function[]} funcs
     */
    addToUpdate(...funcs) {
      funcs.forEach(fn => this.toUpdate.push(fn));
    },

    runToUpdate() {
      this.toUpdate.forEach(func => func());
    }
  };
};
