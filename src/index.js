import Item from './item'

/**
 * A11yNavigation class
 */
export default class A11yNavigation {
  /**
   * Create new A11yNavigation
   * @param {Object} options Configuration
   * @param {HTMLElement} options.el Container element
   * @param {string} [options.id] Navigation ID
   * @param {string} [options.classOpen=is-open] Toggle this class
   * @param {string} [options.selectorButton=.js-nav-button] Button selector
   * @param {string} [options.selectorChild=.js-nav-child] Child selector
   * @param {string} [options.selectorItem=.js-nav-item] Item selector (contains button, child, and link elements)
   * @param {string} [options.selectorLink=.js-nav-link] Link selector
   */
  constructor (options) {
    this.el = options.el
    this.id = options.id || this.el.id
    this.items = []

    this.config = {
      classOpen: options.classOpen || 'is-open',
      selectorButton: options.selectorButton || '.js-nav-button',
      selectorChild: options.selectorChild || '.js-nav-child',
      selectorItem: options.selectorItem || '.js-nav-item',
      selectorLink: options.selectorLink || '.js-nav-link'
    }

    // Create navigation items
    const items = this.el.querySelectorAll(this.config.selectorItem)
    for (let i = 0; i < items.length; i++) {
      this.items.push(new Item({
        el: items[i],
        id: `${this.id}-item-${i + 1}`,
        items: this.items,
        classOpen: this.config.classOpen,
        selectorButton: this.config.selectorButton,
        selectorChild: this.config.selectorChild,
        selectorLink: this.config.selectorLink
      }))
    }
  }
}
