function LoginController (view, model, repository) {
  this.view = view
  this.model = model
  this.repository = repository
}

/**
 * Renders the content and bind listeners
 */
LoginController.prototype.main = function() {
  this.view.render()
  this._bindListeners()
}

/**
 * Bind the controller handlers
 */
LoginController.prototype._bindListeners = function() {
  this.view.bindInputListeners(inputInfo => {
    this.handleInputChange.bind(this, inputInfo)()
  })

  this.view.bindButtonListener(event => {
    this.handleButtonClick.bind(this, event)()
  })
}

/**
 * Handles the input changes
 * @param {target} target - The target input
 * @param {value} value - The input value
 */
LoginController.prototype.handleInputChange = function({ target, value }) {
  if (target === 'username') {
    this.model.username = value
  }
  else this.model.password = value
}

/**
 * Handles the button click
 * @param {MouseEvent} event - The event object
 */
LoginController.prototype.handleButtonClick = async function(_) {
  this.view.toggleLoader();

  await this.repository.login(this.model.username, this.model.password)

  this.view.toggleLoader();
}

export default LoginController