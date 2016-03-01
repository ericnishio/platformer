/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  const component = {
    /**
     * Creates objects from a tilemap's object layer.
     */
    createFromObjects(layerName, gid, spriteClass, group) {
      parent.stage.createFromObjects(layerName, gid, null, null, true, false, group, spriteClass, true);
    }
  };

  parent._components.canCreateFromObjects = component;

  return component;
};
