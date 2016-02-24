import GameState from 'states/game-state';

export default class Stage extends GameState {
  update() {
    this.game.physics.arcade.collide(this.getPlayer(), this.getPlatforms());
    this.game.physics.arcade.collide(this.getPlayer(), this.getHazard(), this.die.bind(this), null, this.getPlayer());

    if (this.getPlayer().alive && !this.getPlayer().hasOxygen()) {
      console.log('You ran out of oxygen.');

      this.die();
    }

    this.getItems().forEachAlive((item) => {
      this.game.physics.arcade.collide(item, this.getPlatforms());

      this.game.physics.arcade.collide(item, this.getPlayer(), () => {
        item.handleCollision(this.getPlayer());
      }, null, this);
    }, this);

    this.game.physics.arcade.collide(this.getObstacles(), this.getItems());
    this.game.physics.arcade.collide(this.getObstacles(), this.getPlayer());
    this.game.physics.arcade.collide(this.getObstacles(), this.getPlatforms());

    this.game.physics.arcade.collide(this.getPlayer().getBullets(), this.getPlatforms(), (bullet) => {
      bullet.kill();
    });

    this.game.physics.arcade.overlap(this.getObstacles(), this.getPlayer().getBullets(), (obstacle, bullet) => {
      obstacle.kill();
      obstacle.effects.destroy.play();
      bullet.kill();

      const explosion = this.explosions.getFirstExists(false);

      explosion.reset(obstacle.body.x + 8, obstacle.body.y + 8); // TODO: Fix X and Y.
      explosion.play('explode', 30, false, true);
    });

    this.handleInput();
  }
}
