/**
 * @param {Phaser.Sprite} sprite
 * @return {Phaser.Sprite}
 */
export default sprite => {
  // TODO: Do not mutate existing objects.
  sprite.body.collideWorldBounds = true;
  sprite.body.gravity.y = 280;

  return sprite;
};
