import {get} from 'lodash';

const dialogueState = {};

/**
 * @param {string} actorId
 * @param {GameState} stage
 * @return {string[]}
 */
export function nextMessages(actorId, stage) {
  const dialogues = require(`json!data/dialogues/${actorId}.json`);
  const dialogueIndexNow = get(dialogueState, `${actorId}`, -1);
  const dialogueIndexNext = dialogueIndexNow + 1;

  if (!dialogueState[actorId]) {
    dialogueState[actorId] = dialogueIndexNow;
  }

  return getNextMessages(actorId, dialogueIndexNext, dialogues, stage);
}

/**
 * @param {string} actorId
 */
export function incrementDialogue(actorId) {
  dialogueState[actorId] += 1;
}

/**
 * @param {string} actorId
 * @param {number} dialogueIndex
 * @param {Object} dialogues
 * @param {GameState} stage
 * @return {string[]}
 */
function getNextMessages(actorId, dialogueIndex, dialogues, stage) {
  const response = get(dialogues, dialogueIndex);

  if (!response) {
    return [];
  }

  if (satisfiesPrerequisites(response.prerequisites, stage)) {
    incrementDialogue(actorId);

    return response.messagesOnSuccess;
  }

  return response.messagesOnRejection;
}

/**
 * @param {Object[]} prerequisites
 * @param {GameState} stage
 * @return {boolean}
 */
function satisfiesPrerequisites(prerequisites, stage) {
  if (!prerequisites) {
    return true;
  }

  return !prerequisites
    .map(prerequisite => satisfiesPrerequisite(prerequisite, stage))
    .includes(false);
}

/**
 * @param {Object} prerequisite
 * @param {GameState} stage
 * @return {boolean}
 */
function satisfiesPrerequisite(prerequisite, stage) {
  switch (prerequisite.type) {
    case 'PLAYER_HAS_ITEM':
      return playerHasItem(stage.getComponent('hasPlayer').getPlayer(), prerequisite.params.itemId);

    // TODO: Implement prerequisite evaluators.

    default:
      return false;
  }
}

/**
 * @param {Player} player
 * @param {string} itemId
 * @return {boolean}
 */
function playerHasItem(player, itemId) {
  return player.getComponent('hasInventory').hasItemById(itemId);
}
