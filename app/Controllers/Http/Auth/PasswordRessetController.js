'use strict'

const { validate, validateAll }  = use('Validator'),
      User          = use('App/Models/User'),
      PasswordReset = use('App/Models/PasswordReset'),
      randomString  = require('random-string'),
      Mail          = use('Mail'),
      Hash          = use('Hash')


class PasswordRessetController {
  getForgot({view}){
    return view.render('auth.forgot', {
      title: 'Phục hồi mật khẩu'
    })
  }

  async postForgot({session, request, response}){
    const validation  = await validate(request.only('email'),{
      email: 'required|email'
    })

    if(validation.fails()){
      session.flash({
        notification:{
          type: 'danger',
          msg: validation.messages()
        }
      })

      return response.redirect('back')
    }

    try{
      const user = await User.findBy('email', request.input('email'))

      await PasswordReset.query().where('email', user.email).delete()

      const { token } = await PasswordReset.create({
        email: user.email,
        token: randomString({length: 60})
      })

      const mailData = {
        user: user.toJSON(),
        token
      }

      await Mail.send('emails.email_forgot', mailData, msg => {
        msg
          .to(user.email)
          .from('do-not-reply@ghinlop.com')
          .subject('Phục hồi mật khẩu tài khoản VutaTaskSystem')
      })
      session.flash({
        notification:{
          type: 'success',
          msg: [`Hệ thống đã gửi thông tin tới email: <b>${request.input('email')}</b>`]
        }
      })

      response.route('auth.noted')

    }catch (error){
      session.flash({
        notification:{
          type: 'danger',
          msg: [`Không tìm thấy thông tin email: <b>${request.input('email')}</b> trong hệ thống`]
        }
      })
    }
  }

  async getChangePass({session, response, params, view}){
    const token_check = await PasswordReset.query().where('token', params.token).first()
    if(!token_check){
      session.flash({
        notification:{
          type: 'danger',
          msg: [`Tài khoản không được cấp phép thay đổi mật khẩu`]
        }
      })

      return response.route('auth.getLogin')
    }
    return view.render('auth.resetPassword', {
      title: 'Thay đổi mật khẩu',
      token: params.token
    })
  }

  async resetPassword({session, request, response}){
    const validation = await validateAll(request.all(), {
      token: 'required',
      email: 'required',
      password: 'required|confirmed'
    })

    if(validation.fails()){
      session.flash({
        notification:{
          type: 'danger',
          msg: validation.messages()
        }
      })
      return response.redirect('back')
    }

    try{
      const user = await User.findBy('email', request.input('email'))

      const token = request.input('token')
      const token_check = await PasswordReset.query().where('email', user.email).where('token', token).first()
      console.log(token_check);
      if(!token_check){
        session.flash({
          notification:{
            type: 'danger',
            msg: [`Tài khoản không được cấp phép thay đổi mật khẩu`]
          }
        })

        return response.route('auth.getLogin')
      }
      // console.log(request.input('password'));
      // const new_password = await Hash.make(request.input('password'))
      user.password = request.input('password')
      // console.log(new_password);
      // console.log(user.password);
      // $2a$10$O55x0KvCOEL8Z.6Dp0JARehxISzGxgfKNDL/X.qkhTaQQAJGPO5nG
      // $2a$10$EcJU/wco131kWOgxtPu0TeBaIvOUpo2TrVOxlwShn1l37u1STvpKK
      await user.save()
      // await PasswordReset.query().where('email', user.email).delete()

      session.flash({
        notification:{
          type: 'success',
          msg: [`Mật khẩu ${user.email} đã được thay đổi`]
        }
      })

      return response.route('auth.getLogin')

    }catch(error){
      session.flash({
        notification:{
          type: 'danger',
          msg: [`Không tìm thấy thông tin ${request.input('email')} trên hệ thống`]
        }
      })

      return response.redirect('back')
    }

  }
}

module.exports = PasswordRessetController
