const mq = window.matchMedia('(hover)')

/**
 * Try to detect hover capability of device
 * @param {Function} [callback] Add callback to media query listener
 * @returns {Boolean} Hover capability
 */
export default function (callback) {
  if (typeof callback === 'function') {
    mq.addListener(event => callback(event.matches))
  }

  return mq.matches
}
