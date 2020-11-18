

module.exports =  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      req.flash('info', 'You must be logged in to access the Dashboard.')
      res.redirect('/')
    }
  }