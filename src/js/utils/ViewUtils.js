const ViewUtils = parent => {
  let element

  /**
   * Create a element
   * @param {string} elementName - The name of the element type
   * @returns {ViewUtils} - A self instance of ViewUtils
   */
  const createElement = function(elementName){
    element = document.createElement(elementName)

    return this
  }

  /**
   * Get the element
   */
  const get = () => element

  /**
   * Add a class to the element
   * @param {string} className - The classes that will be applied
   * @returns {ViewUtils} - A self instance of ViewUtils
   */
  const withClass = function(className){
    if (className) {
      if (className instanceof Array)
        element.classList.add(...className)
      else element.classList.add(className)
    }

    return this
  }

  /**
   * Add a class to a group of elements
   * @param {...string} classNames - The classes that will be applied
   */
  const withClassGroup = function(...classNames){
    classNames.forEach((className, index) => {
      if (className) {
        if (className instanceof Array) 
          element[index].classList.add(...className)
        else element[index].classList.add(className)
      }

    })

    return this
  }

  /**
   * Creates a group of elements
   * @param {...string} elements - The name of the elements
   */
  const createGroup = function(...elements){
    element = elements.map((element, index) => {
      const el = document.createElement(element)

      return el
    })

    return this
  }

  /**
   * Append a element to a parent
   * @param {Node} elementToAppend - The element that will be append
   */
  const append = function(elementToAppend = element) {
    if (elementToAppend instanceof Array) {
      return elementToAppend.forEach(el => {
        parent.appendChild(el)
      })
    }

    return parent.appendChild(elementToAppend)
  }

  return {
    createElement,
    createGroup,
    withClass,
    withClassGroup,
    append,
    get
  }
}

export default ViewUtils