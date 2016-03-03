import {Tilemap} from 'phaser';

import {TILE_SIZE, getTilePosition} from 'core/game';
import GameState from 'states/game-state';
import hasTilemap from 'states/components/has-tilemap';
import hasSky from 'states/components/has-sky';
import hasPlayer from 'states/components/has-player';
import canHandleInput from 'states/components/can-handle-input';
import hasNextStage from 'states/components/has-next-stage';
import hasDecorations from 'states/components/has-decorations';
import hasObstacles from 'states/components/has-obstacles';
import hasExplosions from 'states/components/has-explosions';
import hasPlatforms from 'states/components/has-platforms';
import hasHazard from 'states/components/has-hazard';
import hasItems from 'states/components/has-items';
import canCreateFromObjects from 'states/components/can-create-from-objects';
import canDie from 'states/components/can-die';
import {createItem} from 'entities/actors/items/item';
import {createStructure} from 'entities/actors/structures/structure';
import Crate from 'entities/actors/structures/crate';

import {TwinklingStar} from 'entities/decorations/twinkling-star';

export default class TestStage extends GameState {
  static onPreload(preloader) {
    preloader.load.tilemap('TestStage', require('file!assets/tilemaps/test-stage.json'), null, Tilemap.TILED_JSON);

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
    this.addComponent(hasTilemap, {tilemap: 'TestStage', tilesets: ['terrain-1x1-1']});
    this.addComponent(hasSky);
    this.addComponent(hasNextStage, {stageId: 'TestStage', stageClass: TestStage});
    this.addComponent(hasDecorations);
    this.addComponent(hasExplosions);
    this.addComponent(canCreateFromObjects);
    this.addComponent(hasPlayer, {x: getTilePosition(3), y: getTilePosition(15)});
    this.addComponent(canDie);
    this.addComponent(canHandleInput, {actor: this.getComponent('hasPlayer').getPlayer()});
    this.addComponent(hasHazard);
    this.addComponent(hasPlatforms);
    this.addComponent(hasItems);
    this.addComponent(hasObstacles);

    this.getComponent('hasItems').getItems().add(createItem('OxygenTank', getTilePosition(42), getTilePosition(18)));
    this.getComponent('hasItems').getItems().add(createItem('Blaster', getTilePosition(29), getTilePosition(18)));
    this.getComponent('hasItems').getItems().add(createItem('PowerCell', getTilePosition(40), getTilePosition(8)));

    this.getComponent('canCreateFromObjects').createFromObjects('Crates', 2, Crate, this.getComponent('hasObstacles').getObstacles());
    this.getComponent('canCreateFromObjects').createFromObjects('Stars', 26, TwinklingStar, this.getComponent('hasDecorations').getDecorations());

    this.getComponent('hasPlayer').getPlayer().getComponent('needsOxygen').startOxygenConsumption();

    this.antenna = createStructure('Antenna', getTilePosition(52), getTilePosition(0));
  }

  update() {
    this.getComponent('canDie').update();
    this.getComponent('hasHazard').update();
    this.getComponent('hasItems').update();
    this.getComponent('hasObstacles').update();
    this.getComponent('hasPlatforms').update();
    this.getComponent('canHandleInput').update();

    const player = this.getComponent('hasPlayer').getPlayer();

    this.game.physics.arcade.collide(this.antenna, this.getComponent('hasPlatforms').getPlatforms());

    this.game.physics.arcade.collide(this.antenna, player, () => {
      this.antenna.activate(player);

      if (this.antenna.isActivated()) {
        this.getComponent('hasNextStage').win();
      }
    }, null, this);
  }
}
