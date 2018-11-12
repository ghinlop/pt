'use strict'

const Users = use('App/Models/User')

class ConfirmController {
  async kiemTraToken({ params, session, response }){
    let isType, msg
    const user = await Users.findBy('confirm_token', params.token)
    if(user){
      user.confirm_token = null
      user.active = true
      await user.save()

      isType = 'success'
      msg = ['Email <b>' + user.email + '</b> đã được kích hoạt. <br> Vui lòng đăng nhập để truy cập hệ thống']
    }else{
      isType = 'danger'
      msg = ['Thông tin kích hoạt bị sai hoặc mã xác thực đã hết thời hạn']
    }

    session.flash({
      notification: {
        type: isType,
        msg: msg
      }
    })

    response.redirect('/kiem-tra/dang-nhap')
  }
}

module.exports = ConfirmController
