import Phaser from 'phaser';

import {TILE_SIZE} from 'core/game';
import GameState from 'states/game-state';
import Player from 'sprites/entities/creatures/player';
import OxygenMeter from 'sprites/ui/oxygen-meter';

export default class Stage extends GameState {
  /**
   * @param {string} tilemap
   * @param {string[]} tilesets
   */
  createStage(tilemap, tilesets) {
    this.level = this.game.add.tilemap(tilemap, TILE_SIZE, TILE_SIZE);

    tilesets.forEach(tileset => {
      this.level.addTilesetImage(tileset);
    });

    this.sky = this.level.createLayer('Sky');
    this.sky.resizeWorld();
    this.decorations = this.game.add.group();
    this.platforms = this.level.createLayer('Platforms');
    this.hazard = this.level.createLayer('Hazard');
    this.items = this.game.add.group();

    this.level.setCollisionByExclusion([], true, 'Platforms');
    this.level.setCollisionByExclusion([], true, 'Hazard');

    this.initObstacles();
    this.initExplosions();
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  createPlayer(x, y) {
    this.player = new Player(this.game, x, y);
    this.oxygenMeter = new OxygenMeter(this.game, this.getPlayer());
  }

  /**
   * @return {Player}
   */
  getPlayer() {
    return this.player;
  }

  initObstacles() {
    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;
    this.obstacles.physicsBodyType = Phaser.Physics.ARCADE;
  }

  /**
   * Creates objects from a tilemap's object layer.
   */
  createFromObjects(layerName, gid, customClass, group) {
    this.level.createFromObjects(layerName, gid, null, null, true, false, group, customClass, true);
  }

  /**
   * Returns the obstacles group.
   * @return {Phaser.Group}
   */
  getObstacles() {
    return this.obstacles;
  }

  /**
   * @param {Object} entityClass
   * @param {number} x
   * @param {number} y
   */
  addObstacle(entityClass, x, y) {
    this.obstacles.add(new entityClass(this.game, x, y));
  }

  /**
   * @return {Phaser.TilemapLayer}
   */
  getPlatforms() {
    return this.platforms;
  }

  /**
   * @return {Phaser.Group}
   */
  getDecorations() {
    return this.decorations;
  }

  /**
   * @return {Phaser.TilemapLayer}
   */
  getHazard() {
    return this.hazard;
  }

  /**
   * @return {Phaser.Group}
   */
  getItems() {
    return this.items;
  }

  initExplosions() {
    this.explosions = this.game.add.group();
    this.explosions.createMultiple(10, 'effects-1x1-1');

    this.explosions.forEach(function(explosion) {
      explosion.anchor.setTo(0.5, 0.5);
      explosion.animations.add('explode', [0, 1, 1, 2, 3, 4, 3, 2], 4, false);
    }, this);
  }

  win() {
    if (!this.isVictorious()) {
      this.victorious = true;

      console.log('You beat the level.');

      this.game.time.events.add(Phaser.Timer.SECOND * 1.5, () => {
        this.game.state.start('StageClear', true, false);
      });
    }
  }

  /**
   * Checks if the level has been beaten.
   * @return {boolean}
   */
  isVictorious() {
    return this.victorious;
  }

  update() {
    this.game.physics.arcade.collide(this.getPlayer(), this.getPlatforms());
    this.game.physics.arcade.collide(this.getPlayer(), this.getHazard(), this.getPlayer().die, null, this.getPlayer());

    if (this.getPlayer().alive && !this.getPlayer().hasOxygen()) {
      console.log('You ran out of oxygen.');
      this.getPlayer().die();
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
  }
}
