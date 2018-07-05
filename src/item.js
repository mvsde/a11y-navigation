import detectHover from './detect-hover'
import detectTouch from './detect-touch'

/**
 * Item class
 */
export default class Item {
  /**
   * Create new Item
   * @param {Object} options Configuration
   * @param {HTMLElement} options.el Item element
   * @param {string} options.id Item ID
   * @param {Item[]} options.items Items of current A11yNavigation
   * @param {string} options.selectorButton Button selector
   * @param {string} options.selectorChild Child selector
   * @param {string} options.selectorLink Link selector
   * @param {string} options.classOpen Toggle this class
   */
  constructor (options) {
    this.el = options.el
    this.id = options.id
    this.items = options.items
    this.button = options.el.querySelector(options.selectorButton)
    this.child = options.el.querySelector(options.selectorChild)
    this.link = options.el.querySelector(options.selectorLink)

    this.config = {
      classOpen: options.classOpen,
      childId: `${this.id}-child`
    }

    this.isOpen = this.el.classList.contains(this.config.classOpen) || false
    this.canHover = detectHover()
    this.canTouch = false

    this.setButtonVisibility()
    this.setAttributes()

    this.button.setAttribute('aria-controls', this.config.childId)
    this.link.setAttribute('aria-controls', this.config.childId)
    this.child.id = this.config.childId

    this.button.addEventListener('click', () => this.toggle())
    this.link.addEventListener('focus', () => this.open())

    this.el.addEventListener('mouseenter', () => {
      // Open if user isn’t touching
      if (!this.canTouch) {
        this.open()
      }
    })

    this.el.addEventListener('mouseleave', () => {
      // Close if user isn’t touching
      if (!this.canTouch) {
        this.close()
      }
    })

    this.link.addEventListener('keydown', event => {
      // Close if user tabs back
      if (event.shiftKey && event.keyCode === 9) {
        this.close()
      }
    })

    const childLinks = this.child.querySelectorAll('a')
    childLinks[childLinks.length - 1].addEventListener('keydown', event => {
      // Close if user tabs out
      if (!event.shiftKey && event.keyCode === 9) {
        this.close()
      }
    })

    detectHover(canHover => {
      this.canHover = canHover
      this.setButtonVisibility()
    })

    detectTouch(() => {
      this.canTouch = true
    })
  }

  /**
   * Set button visibility state
   */
  setButtonVisibility () {
    if (this.canHover) {
      this.button.setAttribute('hidden', 'hidden')
    } else {
      this.button.removeAttribute('hidden')
    }
  }

  /**
   * Set element attributes
   */
  setAttributes () {
    if (this.isOpen) {
      this.button.setAttribute('aria-expanded', 'true')
      this.child.setAttribute('aria-hidden', 'false')
      this.link.setAttribute('aria-expanded', 'true')
    } else {
      this.button.setAttribute('aria-expanded', 'false')
      this.child.setAttribute('aria-hidden', 'true')
      this.link.setAttribute('aria-expanded', 'false')
    }
  }

  /**
   * Add open class and set attributes
   */
  open () {
    this.isOpen = true

    // Close all other items before opening the current
    this.items.forEach(item => (item !== this) && item.close())

    this.el.classList.add(this.config.classOpen)
    this.setAttributes()
  }

  /**
   * Remove open class and set attributes
   */
  close () {
    this.isOpen = false

    this.el.classList.remove(this.config.classOpen)
    this.setAttributes()
  }

  /**
   * Toggle between open and close state
   */
  toggle () {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }
}
