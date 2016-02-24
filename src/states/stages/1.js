import {Tilemap} from 'phaser';

import {TILE_SIZE, getTileCoordinate} from 'core/game';
import GameState from 'states/game-state';
import hasTilemap from 'states/traits/has-tilemap';
import hasSky from 'states/traits/has-sky';
import hasPlayer from 'states/traits/has-player';
import hasNextStage from 'states/traits/has-next-stage';
import hasDecorations from 'states/traits/has-decorations';
import hasObstacles from 'states/traits/has-obstacles';
import hasExplosions from 'states/traits/has-explosions';
import hasPlatforms from 'states/traits/has-platforms';
import hasHazard from 'states/traits/has-hazard';
import hasItems from 'states/traits/has-items';
import canCreateFromObjects from 'states/traits/can-create-from-objects';
import canDie from 'states/traits/can-die';
import Antenna from 'sprites/entities/structures/antenna';
import Blaster from 'sprites/entities/items/blaster';
import OxygenTank from 'sprites/entities/items/oxygen-tank';
import PowerCell from 'sprites/entities/items/power-cell';
import {Crate} from 'sprites/entities/structures/crate';
import {TwinklingStar} from 'sprites/decorations/twinkling-star';

export default class Stage1 extends GameState {
  static toPreload(preloader) {
    preloader.load.tilemap('Stage1', require('assets/tilemaps/stage1.json'), null, Tilemap.TILED_JSON);

    preloader.load.spritesheet('terrain-1x1-1', require('assets/spritesheets/terrain-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('structures-2x2-1', require('assets/spritesheets/structures-2x2-1.png'), TILE_SIZE * 2, TILE_SIZE * 2);
    preloader.load.spritesheet('creatures-1x2-1', require('assets/spritesheets/creatures-1x2-1.png'), TILE_SIZE, TILE_SIZE * 2);
    preloader.load.spritesheet('items-1x1-1', require('assets/spritesheets/items-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('menus-1x1-1', require('assets/spritesheets/menus-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('weapons-1x1-1', require('assets/spritesheets/weapons-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('effects-1x1-1', require('assets/spritesheets/effects-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('oxygen-meter', require('assets/spritesheets/oxygen-meter.png'), TILE_SIZE * 7, TILE_SIZE);

    preloader.load.audio('laser1', require('assets/audio/effects/laser1.ogg'));
    preloader.load.audio('combustion1', require('assets/audio/effects/combustion1.ogg'));
    preloader.load.audio('explosion1', require('assets/audio/effects/explosion1.ogg'));
    preloader.load.audio('powerup1', require('assets/audio/effects/powerup1.ogg'));
    preloader.load.audio('powerup2', require('assets/audio/effects/powerup2.ogg'));
    preloader.load.audio('step', require('assets/audio/effects/step.ogg'));
    preloader.load.audio('turn-on1', require('assets/audio/effects/turn-on1.ogg'));
  }

  create() {
    Object.assign(this, hasTilemap(this, {tilemap: 'Stage1', tilesets: ['terrain-1x1-1']}));
    Object.assign(this, hasPlayer(this));
    Object.assign(this, hasSky(this));
    Object.assign(this, hasNextStage(this, {stageName: 'Stage1', stageClass: Stage1}));
    Object.assign(this, hasDecorations(this));
    Object.assign(this, hasExplosions(this));
    Object.assign(this, canCreateFromObjects(this));
    Object.assign(this, canDie(this));

    this.createPlayer(getTileCoordinate(3), getTileCoordinate(15));

    Object.assign(this, hasHazard(this));
    Object.assign(this, hasItems(this));
    Object.assign(this, hasPlatforms(this));
    Object.assign(this, hasObstacles(this));

    this.getItems().add(OxygenTank(getTileCoordinate(42), getTileCoordinate(18)));
    this.getItems().add(Blaster(getTileCoordinate(29), getTileCoordinate(18)));
    this.getItems().add(PowerCell(getTileCoordinate(40), getTileCoordinate(8)));

    this.createFromObjects('Crates', 2, Crate, this.getObstacles());
    this.createFromObjects('Stars', 26, TwinklingStar, this.getDecorations());

    this.antenna = Antenna(getTileCoordinate(52), getTileCoordinate(0));
  }

  update() {
    this.toUpdate.forEach(func => func());

    this.handleInput();

    this.game.physics.arcade.collide(this.antenna, this.getPlatforms());

    this.game.physics.arcade.collide(this.antenna, this.getPlayer(), () => {
      this.antenna.activate(this.getPlayer());

      if (this.antenna.isActivated()) {
        this.win();
      }
    }, null, this);
  }
}
