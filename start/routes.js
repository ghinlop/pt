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

Route.on('/').render('welcome')
Route.group(()=>{
  // Get Routes
  Route.get('dang-ky', 'Auth/RegisterController.index').as('auth.index')

  // Post Routes
  Route.post('dang-ky', 'Auth/RegisterController.signup').as('auth.signup')
  Route.post('dang-nhap', 'Auth/RegisterController.signup').as('auth.signin')
}).prefix('kiem-tra')
Route.on('/admin').render('admin.pages.index')
