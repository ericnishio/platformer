import {LEFT, Tilemap} from 'phaser';

import {TILE_SIZE, getTilePosition} from 'core/game';
import GameState from 'states/game-state';
import hasTilemap from 'states/traits/has-tilemap';
import hasSky from 'states/traits/has-sky';
import hasPlayer from 'states/traits/has-player';
import canHandleInput from 'states/traits/can-handle-input';
import hasNextStage from 'states/traits/has-next-stage';
import hasObstacles from 'states/traits/has-obstacles';
import hasPlatforms from 'states/traits/has-platforms';
import hasItems from 'states/traits/has-items';
import canCreateFromObjects from 'states/traits/can-create-from-objects';
import canDie from 'states/traits/can-die';
import Terminal from 'entities/actors/structures/terminal';

export default class Stage1 extends GameState {
  static toPreload(preloader) {
    preloader.load.tilemap('Stage1', require('file!assets/tilemaps/stage-1.json'), null, Tilemap.TILED_JSON);

    preloader.load.spritesheet('interior-1x1-1', require('assets/spritesheets/interior-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('creatures-1x2-1', require('assets/spritesheets/creatures-1x2-1.png'), TILE_SIZE, TILE_SIZE * 2);
    preloader.load.spritesheet('weapons-1x1-1', require('assets/spritesheets/weapons-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('oxygen-meter', require('assets/spritesheets/oxygen-meter.png'), TILE_SIZE * 7, TILE_SIZE);
    preloader.load.spritesheet('terminal-facing-right', require('assets/spritesheets/animations/terminal-facing-right.png'), TILE_SIZE, TILE_SIZE, 3);
    preloader.load.spritesheet('menus-1x1-1', require('assets/spritesheets/menus-1x1-1.png'), TILE_SIZE, TILE_SIZE);
    preloader.load.spritesheet('effects-1x1-1', require('assets/spritesheets/effects-1x1-1.png'), TILE_SIZE, TILE_SIZE);

    preloader.load.audio('step', require('assets/audio/effects/step.ogg'));
  }

  create() {
    Object.assign(this, hasTilemap(this, {tilemap: 'Stage1', tilesets: ['interior-1x1-1']}));
    Object.assign(this, hasSky(this));
    Object.assign(this, hasNextStage(this, {id: 'Stage1', class: Stage1}));
    Object.assign(this, canCreateFromObjects(this));
    Object.assign(this, canDie(this));

    this.terminal = Terminal(getTilePosition(10), getTilePosition(8), {id: 'TERMINAL_1'});

    Object.assign(this, hasPlayer(this, {x: getTilePosition(15), y: getTilePosition(9), facing: LEFT}));
    Object.assign(this, canHandleInput(this, {actor: this.getPlayer()}));
    Object.assign(this, hasItems(this));
    Object.assign(this, hasPlatforms(this));
    Object.assign(this, hasObstacles(this));
  }

  update() {
    super.update();

    this.handleInput();

    this.game.physics.arcade.overlap(this.player, this.terminal, () => {
      this.player.getComponent('canInteract').suggestInteraction(() => {
        this.terminal.interact(this.player, this);
      });
    });
  }
}
