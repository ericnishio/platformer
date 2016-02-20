import {getTileCoordinate} from 'core/game';
import {createDialogGroup} from 'util/dialog-box';
import Stage from './stage';
import Antenna from 'sprites/entities/structures/antenna';
import Blaster from 'sprites/entities/items/blaster';
import OxygenTank from 'sprites/entities/items/oxygen-tank';
import PowerCell from 'sprites/entities/items/power-cell';
import Crate from 'sprites/entities/structures/crate';
import TwinklingStar from 'sprites/decorations/twinkling-star';

export default class Stage1 extends Stage {
  create() {
    super.create();

    this.createStage('Stage1', ['terrain-1x1-1']);
    this.createPlayer(getTileCoordinate(3), getTileCoordinate(15));

    this.getItems().add(new OxygenTank(this.game, getTileCoordinate(42), getTileCoordinate(18)));
    this.getItems().add(new Blaster(this.game, getTileCoordinate(29), getTileCoordinate(18)));
    this.getItems().add(new PowerCell(this.game, getTileCoordinate(40), getTileCoordinate(8)));

    this.createFromObjects('Crates', 2, Crate, this.getObstacles());
    this.createFromObjects('Stars', 26, TwinklingStar, this.getDecorations());

    this.antenna = new Antenna(this.game, getTileCoordinate(52), getTileCoordinate(0));

    // this.dialogBox = createDialogGroup(15, 8, this.game);
  }

  update() {
    super.update();

    this.game.physics.arcade.collide(this.antenna, this.getPlatforms());

    this.game.physics.arcade.collide(this.antenna, this.getPlayer(), () => {
      this.antenna.activate(this.getPlayer());

      if (this.antenna.isActivated()) {
        this.win();
      }
    }, null, this);
  }
}
