import {Sprite, Keyboard} from 'phaser';

/**
 * @param {Phaser.Sprite} parent
 * @return {Object}
 */
export default parent => {
  if (!parent instanceof Sprite) {
    throw Error('Parent of canInteract must extend Phaser.Sprite');
  }

  const component = {
    questionMark: parent.game.add.sprite(-6, -45, 'effects-1x1-1', 8),

    /**
     * @param {function} interact
     */
    suggestInteraction(interact) {
      if (!component.lastInteraction || parent.game.time.now > component.lastInteraction) {
        component.questionMark.visible = true;
      }

      parent.game.input.keyboard
        .addKey(Keyboard.I)
        .onDown.add(() => {
          interact();
          parent.game.input.keyboard.removeKey(Keyboard.I);
        }, this);

      component.lastInteraction = parent.game.time.now + 100;
    },

    update() {
      if (!component.lastInteraction || parent.game.time.now > component.lastInteraction) {
        component.questionMark.visible = false;
      }
    }
  };

  component.questionMark.animations.add('bob', [8, 9, 10, 11, 10, 9, 8], 12, true);
  component.questionMark.animations.play('bob');
  component.questionMark.visible = false;

  parent.addChild(component.questionMark);

  parent._components.canInteract = component;

  return component;
};
