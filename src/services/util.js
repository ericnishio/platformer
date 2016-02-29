/**
 * @param {string} str
 * @param {number} breakAt
 * @param {string} append
 * @return {string}
 */
export function wordwrap(str, breakAt = 17, append = '\n') {
  const regexp = `(\\S(.{0,${breakAt}}\\S)?)\\s+`;

  return str.trim().replace(new RegExp(regexp, 'g'), `$1${append}`);
}
