import {Keyboard} from 'phaser';

/**
 * @param {Phaser.Sprite} Sprite
 * @return {Object}
 */
export default sprite => {
  const trait = {
    questionMark: sprite.game.add.sprite(-6, -45, 'effects-1x1-1', 8),

    /**
     * @param {function} interact
     */
    suggestInteraction(interact) {
      if (!trait.lastInteraction || sprite.game.time.now > trait.lastInteraction) {
        trait.questionMark.visible = true;
      }

      sprite.game.input.keyboard
        .addKey(Keyboard.I)
        .onDown.add(() => {
          interact();
          sprite.game.input.keyboard.removeKey(Keyboard.I);
        }, this);

      trait.lastInteraction = sprite.game.time.now + 100;
    }
  };

  trait.questionMark.animations.add('bob', [8, 9, 10, 11, 10, 9, 8], 12, true);
  trait.questionMark.animations.play('bob');
  trait.questionMark.visible = false;

  sprite.addChild(trait.questionMark);

  sprite.toUpdate = sprite.toUpdate || [];

  sprite.toUpdate.push(
    () => {
      if (!trait.lastInteraction || sprite.game.time.now > trait.lastInteraction) {
        trait.questionMark.visible = false;
      }
    }
  );

  return trait;
};
