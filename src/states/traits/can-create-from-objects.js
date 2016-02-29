/**
 * @param {GameState} state
 * @return {Object}
 */
export default state => {
  return {
    /**
     * Creates objects from a tilemap's object layer.
     */
    createFromObjects(layerName, gid, spriteClass, group) {
      state.stage.createFromObjects(layerName, gid, null, null, true, false, group, spriteClass, true);
    }
  };
};
