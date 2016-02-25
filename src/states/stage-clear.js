import {State, Timer} from 'phaser';

import {startStage} from 'core/game';

export default class StageClear extends State {
  init(params) {
    this.nextStageId = params.id;
    this.nextStageClass = params.class;
  }

  create() {
    super.create();

    const text = this.game.add.bitmapText(
      this.game.width / 2,
      this.game.height / 2,
      'press-start-2p',
      'STAGE CLEAR!',
      16
    );

    text.anchor.setTo(0.5, 0.5);

    this.game.time.events.add(Timer.SECOND * 3, () => {
      startStage(this.nextStageId, this.nextStageClass);
    });
  }
}
