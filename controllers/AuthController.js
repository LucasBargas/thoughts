// Encrypting password to save in data base
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }

  static register(req, res) {
    res.render('auth/register');
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // Password match validation
    if (password !== confirmpassword) {
      // Flash message
      req.flash(
        'message' /* key */,
        'As senhas precisam ser iguais. Por favor, tente novamente!' /* value */,
      );

      res.render('auth/register', { name, email });
      return;
    }

    res.redirect('/');
  }
};
