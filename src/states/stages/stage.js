import {Physics, Timer, Keyboard, Gamepad} from 'phaser';

import {TILE_SIZE} from 'core/game';
import GameState from 'states/game-state';
import StageClear from 'states/stage-clear';
import Player from 'sprites/entities/creatures/player';
import OxygenMeter from 'ui/oxygen-meter';

export default class Stage extends GameState {
  create() {
    this.game.state.add('StageClear', StageClear, false);
  }

  /**
   * @param {string} tilemap
   * @param {string[]} tilesets
   */
  createStage(tilemap, tilesets) {
    this.stage = this.game.add.tilemap(tilemap, TILE_SIZE, TILE_SIZE);

    tilesets.forEach(tileset => {
      this.stage.addTilesetImage(tileset);
    });

    this.sky = this.stage.createLayer('Sky');
    this.sky.resizeWorld();
    this.decorations = this.game.add.group();
    this.platforms = this.stage.createLayer('Platforms');
    this.hazard = this.stage.createLayer('Hazard');
    this.items = this.game.add.group();

    this.stage.setCollisionByExclusion([], true, 'Platforms');
    this.stage.setCollisionByExclusion([], true, 'Hazard');

    this.initObstacles();
    this.initExplosions();

    this.pad1 = this.game.input.gamepad.pad1;
    this.game.input.gamepad.start();
  }

  /**
   * @param {string} stageName
   * @param {Stage} stageClass
   */
  setNextStage(stageName, stageClass) {
    this.nextStageName = stageName;
    this.nextStageClass = stageClass;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  createPlayer(x, y) {
    this.player = Player(x, y);
    this.oxygenMeter = OxygenMeter(this.getPlayer());
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
    this.obstacles.physicsBodyType = Physics.ARCADE;
  }

  /**
   * Creates objects from a tilemap's object layer.
   */
  createFromObjects(layerName, gid, customClass, group) {
    this.stage.createFromObjects(layerName, gid, null, null, true, false, group, customClass, true);
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

    this.explosions.forEach(explosion => {
      explosion.anchor.setTo(0.5, 0.5);
      explosion.animations.add('explode', [4, 3, 2, 4, 3, 3, 2, 2, 0], 4, false);
    }, this);
  }

  win() {
    if (!this.isVictorious()) {
      this.victorious = true;

      console.log('You beat the stage.');

      this.game.time.events.add(Timer.SECOND * 1.5, () => {
        this.game.state.start('StageClear', true, false, {
          nextStageName: this.nextStageName,
          nextStageClass: this.nextStageClass
        });
      });
    }
  }

  /**
   * Checks if the stage has been beaten.
   * @return {boolean}
   */
  isVictorious() {
    return this.victorious;
  }

  handleInput() {
    this.getPlayer().body.velocity.x = 0;

    if (this.game.input.keyboard.isDown(Keyboard.LEFT) || this.pad1.isDown(Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
      this.getPlayer().walkLeft();
    }

    if (this.game.input.keyboard.isDown(Keyboard.RIGHT) || this.pad1.isDown(Gamepad.XBOX360_DPAD_RIGHT) || this.pad1.axis(Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
      this.getPlayer().walkRight();
    }

    if (this.getPlayer().canJump() && (this.game.input.keyboard.isDown(Keyboard.UP) || this.game.input.keyboard.isDown(Keyboard.S) || this.pad1.isDown(Gamepad.XBOX360_X))) {
      this.getPlayer().jump();
    }

    if (this.game.input.keyboard.isDown(Keyboard.SPACEBAR) || this.game.input.keyboard.isDown(Keyboard.D) || this.pad1.isDown(Gamepad.XBOX360_Y)) {
      this.getPlayer().fire();
    }
  }

  die() {
    this.getPlayer().die();

    this.game.time.events.add(Timer.SECOND * 1, () => {
      this.game.state.restart();
    });
  }

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
