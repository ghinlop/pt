'use strict'

const { validateAll } = use('Validator'),
      User            = use('App/Models/User'),
      randomString    = require('random-string'),
      Mail            = use('Mail')
class RegisterController {
  index({view}){
    return view.render('auth.register')
  }
  async signup({request, session, response}){
    // Check Validator
    const validation = await validateAll(request.all(), {
      username:   'required|unique:users,username',
      email:      'required|email|unique:users,email',
      password:   'required'
    })
    console.log(validation.fails())
    if(validation.fails()){
      session.flash({
        notification: {
          type: 'danger',
          msg: validation.messages()
        }
      })
      // session.withErrors(validation.messages()).flashExcept(['password'])
      return response.redirect('back')
    }
    // Create User
    const user = await User.create({
      username:       request.input('username'),
      email:          request.input('email'),
      password:       request.input('password'),
      confirm_token:  randomString({length: 60})
    })
    // Send email token confirm register
    await Mail.send('emails.confirm', user.toJSON(), msg => {
        msg
          .to(user.email)
          .from('do-not-reply@ghinlop.com')
          .subject('Xác nhận tài khoản VutaTaskSystem')
    })
    session.flash({
      notification: {
        type: 'success',
        msg: ['Đăng ký tài khoản thành công <br> Vui lòng xác nhận email để được kích hoạt tài khoản']
      }
    })

    return response.redirect('back')
  }
}

module.exports = RegisterController
