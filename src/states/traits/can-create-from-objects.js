/**
 * @param {GameState} state
 * @return {GameState}
 */
export default state => {
  return Object.assign({}, state, {
    /**
     * Creates objects from a tilemap's object layer.
     */
    createFromObjects(layerName, gid, spriteClass, group) {
      this.stage.createFromObjects(layerName, gid, null, null, true, false, group, spriteClass, true);
    }
  });
};
