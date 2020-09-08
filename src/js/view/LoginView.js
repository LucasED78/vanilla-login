import ViewUtils from '../utils/ViewUtils'

function LoginView() {
  this.rootId = 'root'

  this.headlineClass = 'headline'
  this.inputClass = 'input__label'
  this.labelClass = 'input__label'
  this.inputInvalidClass = 'input--invalid'
  this.labelInvalidClass = 'label--invalid'
  this.labelFloatingClass = 'input__label--filled'
  this.inputWrapperClass = 'input__wrapper'
  this.inputGroupClass = 'input__group--column'
  this.inputRoundedClass = 'input--rounded'
  this.inputLargeClass = 'input--large'
  this.loginContainerClass = 'login'
  this.loginInputContainerClass = 'login__input';
  this.loginBannerClass = 'login__banner'
  this.buttonTextHideClass = 'button__text--hide'
  this.loaderHideClass = 'loader--hide'
  this.footerClass = 'footer'

  this.rootElement = undefined
  this.headlineElement = undefined
  this.loginContainerElement = undefined
  this.inputContainerElement = undefined
  this.loginContainerBannerElement = undefined
  this.inputGroupElement = undefined
  this.usernameInputElement = undefined
  this.usernameLabelElement = undefined
  this.passwordInputElement = undefined
  this.passwordLabelElement = undefined
  this.buttonElement = undefined
  this.buttonTextElement = undefined
  this.buttonLoader = undefined
}

/**
 * Renders the content
 */
LoginView.prototype.render = function() {
  this.rootElement = document.getElementById(this.rootId)

  const containers = this._createInputs()

  this._configureInputLabels()
  this._createLoginContainers()
  this._populateLoginContainers(this._createLoginContainers())
  this._populateFooter(this._createFooter())
  this._populateHeadline(this._createHeadline())

  ViewUtils(this.inputGroupElement)
    .append(containers)

  ViewUtils(this.inputContainerElement)
    .append([this.headlineElement, this.inputGroupElement, this.footerElement])

  ViewUtils(this.loginContainerElement)
    .append([this.inputContainerElement, this.loginContainerBannerElement])

  ViewUtils(this.rootElement)
    .append(this.loginContainerElement)
}

/**
 * Creates a headline element
 * @return {HTMLHeadElement} - The created headline
 */
LoginView.prototype._createHeadline = function() {
  return ViewUtils()
    .createElement('h3')
    .withClass(this.headlineClass)
    .get()
}

/**
 * Populates a headline element
 * @param {HTMLHeadElement} headline - The headline to be populated
 */
LoginView.prototype._populateHeadline = function(headline) {
  this.headlineElement = headline

  this.headlineElement.textContent = 'Welcome Back :)'
}

/**
 * Creates the inputs
 */
LoginView.prototype._createInputs = function() {
  const [usernameContainer, passwordContainer] = ViewUtils()
    .createGroup('div', 'div')
    .withClassGroup(this.inputWrapperClass, this.inputWrapperClass)
    .get()

  const usernameGroup = ViewUtils()
    .createGroup('input', 'label')
    .withClassGroup(['input', this.inputRoundedClass, this.inputLargeClass], [this.labelClass])
    .get()

  const passwordGroup = ViewUtils()
    .createGroup('input', 'label')
    .withClassGroup(['input', this.inputRoundedClass, this.inputLargeClass], this.labelClass)
    .get()

  const button = ViewUtils()
    .createElement('button')
    .withClass(['button', 'button--large'])
    .get()

  const [ usernameInput, usernameLabel ] = usernameGroup
  const [ passwordInput, passwordLabel ] = passwordGroup

  this._populateInputAndLabels([usernameInput, passwordInput, button], [usernameLabel, passwordLabel])
  this._createButtonWithLoader(this.buttonElement)

  ViewUtils(usernameContainer)
    .append(usernameGroup)

  ViewUtils(passwordContainer)
    .append(passwordGroup)

  return [ usernameContainer, passwordContainer, button ]
}

/**
 * Populates the inputs and labels
 * @param {Array} input - The inputs that will be populated
 * @param {Array} labels - The inputs that will be populated
 */
LoginView.prototype._populateInputAndLabels = function(input, labels) {
  const [ usernameInput, passwordInput, button ] = input
  const [ usernameLabel, passwordLabel ] = labels

  this.usernameInputElement = usernameInput
  this.passwordInputElement = passwordInput
  this.usernameLabelElement = usernameLabel
  this.passwordLabelElement = passwordLabel
  this.buttonElement = button
}

/**
 * Populates the labels
 */
LoginView.prototype._configureInputLabels = function() {
  this.usernameLabelElement.textContent = 'Username'
  this.passwordLabelElement.textContent = 'Password'
  this.buttonTextElement.textContent = 'Login'
}

/**
 * Creates the login containers
 * @return {Array} - The created containers
 */
LoginView.prototype._createLoginContainers = function() {
  return ViewUtils()
    .createGroup('div', 'div', 'div', 'div')
    .withClassGroup(this.loginContainerClass, this.loginInputContainerClass, this.loginBannerClass, this.inputGroupClass)
    .get()
}

/**
 * Populates the input containers
 * @param {Array} containers - The containers that will be populated
 */
LoginView.prototype._populateLoginContainers = function(containers) {
  const [ loginContainer, inputContainer, loginBanner, inputGroup ] = containers

  this.loginContainerElement = loginContainer
  this.inputContainerElement = inputContainer
  this.loginContainerBannerElement = loginBanner
  this.inputGroupElement = inputGroup
}

/**
 * Creates a button with a loader
 * @param {HTMLButtonElement} button - The button to append loader
 */
LoginView.prototype._createButtonWithLoader = function(button) {
  const loaderContainer = ViewUtils()
    .createElement('div')
    .withClass(['loader', 'loader--hide'])
    .get()

  const loader = ViewUtils()
    .createGroup('div', 'div', 'div')
    .withClassGroup('dot', 'dot', 'dot')
    .get()

  const buttonText = ViewUtils()
    .createElement('span')
    .withClass('button__text')
    .get()

  this.buttonTextElement = buttonText
  
  this.buttonLoader = loaderContainer

  ViewUtils(loaderContainer)
    .append(loader)

  ViewUtils(button)
    .append([buttonText, loaderContainer])
}

/**
 * Creates a footer element
 * @return {HTMLDivElement} - The created footer
 */
LoginView.prototype._createFooter = function() {
  return ViewUtils()
    .createElement('div')
    .withClass('footer')
    .get()
}

/**
 * Populates the footer
 * @param {HTMLDivElement} footer - The footer element to populate
 */
LoginView.prototype._populateFooter = function(footer) {
  this.footerElement = footer

  this.footerElement.textContent = 'Made with ❤️ by Lucas Eduardo'
}

/**
 * Toggles the floating label
 * @param {HTMLLabelElement} label - The label to float
 * @param {boolean} isEmpty - A indicator to input emptiness
 */
LoginView.prototype._toggleFloatingLabel = function(label, isEmpty) {
  if (isEmpty) {
    label.classList.remove(this.labelFloatingClass)
  } else label.classList.add(this.labelFloatingClass)
}

/**
 * This toggles a loader
 */
LoginView.prototype.toggleLoader = function() {
  this.buttonTextElement.classList.toggle(this.buttonTextHideClass)
  this.buttonLoader.classList.toggle(this.loaderHideClass)
}

/**
 * Bind a handler to a input listener
 * @param {Function} handler - The listener handler
 */
LoginView.prototype.bindInputListeners = function(handler) {
  if (handler) {
    [this.usernameInputElement, this.passwordInputElement]
      .forEach((input, index) => {
        input.addEventListener('input', ({ target }) => {
          this._toggleFloatingLabel(input.nextElementSibling, target.value === '')

          handler({
            target: index == 0 ? 'username' : 'password',
            value: target.value
          })
        })
      })
  }
}

/**
 * Binds a handler to a button listener
 * @param { Function } handler - The listener handler
 */
LoginView.prototype.bindButtonListener = function(handler) {
  if (handler) {
    this.buttonElement.addEventListener('click', handler)
  }
}

export default LoginView;