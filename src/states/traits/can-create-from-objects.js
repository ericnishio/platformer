export default state => {
  return Object.assign({}, state, {
    /**
     * Creates objects from a tilemap's object layer.
     */
    createFromObjects(layerName, gid, customClass, group) {
      this.stage.createFromObjects(layerName, gid, null, null, true, false, group, customClass, true);
    }
  });
};
