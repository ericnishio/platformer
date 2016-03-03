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

/**
 * @param {string} string
 * @return {string}
 */
export function camelToKebab(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
