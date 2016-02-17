/**
 * @param {number} speed
 * @return {number}
 */
export function getRandomVelocity(speed) {
  return generateNumberBetween(-(speed), speed);
}

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * max) + min;
}
