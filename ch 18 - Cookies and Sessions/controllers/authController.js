exports.getLogin = (req, res, next) => {
  res.render('auth/login', { title: 'Login', currentPage: 'Login', isLoggedIn: false });
}

exports.postLogin = (req, res, next) => {
  console.log(req.body)
  req.session.isLoggedIn = true;
  res.redirect('/');
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  })
}
