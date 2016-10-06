import {LEFT, Tilemap} from 'phaser';

import {TILE_SIZE, getTilePosition} from 'core/game';
import GameState from 'states/game-state';
import hasTilemap from 'states/components/has-tilemap';
import hasSky from 'states/components/has-sky';
import hasPlayer from 'states/components/has-player';
import canHandleInput from 'states/components/can-handle-input';
import hasNextStage from 'states/components/has-next-stage';
import hasPlatforms from 'states/components/has-platforms';
import hasItems from 'states/components/has-items';
import canCreateFromObjects from 'states/components/can-create-from-objects';
import canDie from 'states/components/can-die';
import hasDoors from 'states/components/has-doors';
import {createItem} from 'entities/actors/items/item';
import {createStructure} from 'entities/actors/structures/structure';

export default class Stage1 extends GameState {
  static onPreload(preloader) {
    preloader.load.tilemap('Stage1', require('file!assets/tilemaps/stage-1.json'), null, Tilemap.TILED_JSON);

    preloader.load.spritesheet('interior-1x1-1', require('assets/spritesheets/interior-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('terrain-1x1-1', require('assets/spritesheets/terrain-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('creatures-1x2-1', require('assets/spritesheets/creatures-1x2-1.png'), TILE_SIZE, TILE_SIZE * 2);
    preloader.load.spritesheet('weapons-1x1-1', require('assets/spritesheets/weapons-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('oxygen-meter', require('assets/spritesheets/oxygen-meter.png'), TILE_SIZE * 7, TILE_SIZE);
    preloader.load.spritesheet('terminal-facing-left', require('assets/spritesheets/animations/terminal-facing-left.png'), TILE_SIZE, TILE_SIZE, 3);
    preloader.load.spritesheet('menus-1x1-1', require('assets/spritesheets/menus-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('effects-1x1-1', require('assets/spritesheets/effects-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('items-1x1-1', require('assets/spritesheets/items-1x1-1.png'), TILE_SIZE, TILE_SIZE);

    preloader.load.audio('step', require('assets/audio/effects/step.ogg'));
    preloader.load.audio('powerup2', require('assets/audio/effects/powerup2.ogg'));
  }

  create() {
    this.addComponent(hasTilemap, {tilemap: 'Stage1', tilesets: ['interior-1x1-1', 'terrain-1x1-1']});
    this.addComponent(hasSky);
    this.addComponent(hasNextStage, {stageId: 'Stage1', stageClass: Stage1});
    this.addComponent(canCreateFromObjects);

    this.terminal = createStructure('Terminal', getTilePosition(13) + 4, getTilePosition(7) + 7, {id: 'TERMINAL_1'});

    this.addComponent(hasPlayer, {x: getTilePosition(21), y: getTilePosition(34)});
    // this.addComponent(hasPlayer, {x: getTilePosition(10), y: getTilePosition(9)});
    this.addComponent(canDie);
    this.addComponent(canHandleInput, {actor: this.getComponent('hasPlayer').getPlayer()});
    this.addComponent(hasPlatforms);
    this.addComponent(hasItems);
    this.addComponent(hasDoors);

    this.getComponent('hasDoors').createDoor(
      getTilePosition(18),
      getTilePosition(9),
      getTilePosition(34),
      getTilePosition(9),
      LEFT
    );

    this.getComponent('hasDoors').createDoor(
      getTilePosition(43),
      getTilePosition(9),
      getTilePosition(9),
      getTilePosition(24),
      LEFT
    );

    this.wrench = createItem('Wrench', getTilePosition(23), getTilePosition(33) - 4, {id: 'WRENCH_1'});
  }

  update() {
    this.getComponent('canDie').update();
    this.getComponent('hasItems').update();
    this.getComponent('hasPlatforms').update();
    this.getComponent('canHandleInput').update();
    this.getComponent('hasDoors').update();

    const player = this.getComponent('hasPlayer').getPlayer();

    this.game.physics.arcade.collide(this.wrench, this.getComponent('hasPlatforms').platforms);
    this.game.physics.arcade.collide(this.wrench, player, () => this.wrench.handleCollision(player));

    this.game.physics.arcade.overlap(player, this.terminal, () => {
      player.getComponent('canInteract').suggestInteraction(() => {
        this.terminal.interact(player, this);
      });
    });
  }
}
