/**
 * Detect touch enabled device
 * @param {Function} callback Called with TouchEvent when touch starts
 */
export default function (callback) {
  window.addEventListener('touchstart', function handler (event) {
    callback(event)
    window.removeEventListener('touchstart', handler)
  })
}
