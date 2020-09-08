import Login from './model/Login'
import LoginView from './view/LoginView'
import LoginController from './controller/LoginController'
import LoginRepository from './repositories/LoginRepository'

new LoginController(
  new LoginView(),
  new Login(),
  new LoginRepository()
).main()