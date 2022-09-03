module.exports.checkAuth = (req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    res.redirect('/entrar');
  }

  next();
};
