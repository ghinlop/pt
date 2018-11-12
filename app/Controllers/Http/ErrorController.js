'use strict'

class ErrorController {
  error404({view}){
    return view.render('404')
  }
}

module.exports = ErrorController
