'use strict'

const User  = use('App/Models/User'),
      Hash  = use('Hash')

class LoginController {
  index({view}){
    return view.render('auth.login',{
      title: 'Đăng nhập hệ thống'
    })
  }

  async signin({request, auth, session, response}){
    const { email, password, remember } = request.all()

    const user = await User
                .query()
                .where('email', email)
                .where('active', true)
                .first()
    if(user){
      let passwordVerified = await Hash.verify(password, user.password)
      if(passwordVerified){
        await auth.remember(!!remember).login(user)
        return response.route('dashboard')
      }
    }

    session.flash({
      notification: {
        type: 'danger',
        msg: ['Thông tin đăng nhập không chính xác hoặc tài khoản không tồn tại <br> Vui lòng thủ lại hoặc xác minh tài khoản']
      }
    })

    return response.redirect('back')
  }

  async logout({auth, response}){
    await auth.logout()

    return response.route('auth.getLogin')
  }
}

module.exports = LoginController
