'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome').as('dashboard')

Route.group(()=>{
  // Register Route
  Route.get('dang-ky', 'Auth/RegisterController.index').as('auth.getRegister')
  Route.post('dang-ky', 'Auth/RegisterController.signup').as('auth.signup')
  // Login Routes
  Route.get('dang-nhap', 'Auth/LoginController.index').as('auth.getLogin')
  Route.post('dang-nhap', 'Auth/LoginController.signin').as('auth.signin')

  // Logout Router
  Route.get('thoat', 'Auth/LoginController.logout').as('auth.logout')

  // Confirm Router
  Route.get('xac-nhan/:token', 'Auth/ConfirmController.kiemTraToken')

  // Forgot Password Routes
  Route.get('phuc-hoi-mat-khau', 'Auth/PasswordRessetController.getForgot').as('auth.getForgot')
  Route.post('phuc-hoi-mat-khau', 'Auth/PasswordRessetController.postForgot').as('auth.forgot')
  Route.get('doi-mat-khau/:token', 'Auth/PasswordRessetController.getChangePass').as('auth.getChangePass')
  Route.post('doi-mat-khau', 'Auth/PasswordRessetController.resetPassword').as('auth.resetPassword')

  // notification Router
  Route.get('thong-bao', ({view}) => {
    return view.render('auth.alert', {
      title: 'Thông báo'
    })
  }).as('auth.noted')
}).prefix('kiem-tra')


Route.on('/admin').render('admin.pages.index')

Route.group(() => {
  Route.get('404', 'ErrorController.error404').as('404page')
}).prefix('error')

// Redirect 404 to Login
Route.get('*', ({response}) => {
  return response.route('404page')
})
