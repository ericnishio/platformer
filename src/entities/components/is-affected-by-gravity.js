/**
 * @param {Object} parent
 * @return {Object}
 */
export default parent => {
  if (!parent.body) {
    throw Error('isAffectedByGravity requires body');
  }

  parent._components.isAffectedByGravity = true;

  parent.body.collideWorldBounds = true;
  parent.body.gravity.y = 280;

  return parent;
};
