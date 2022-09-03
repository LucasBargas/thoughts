// Encrypting password to save in data base
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    // find user on database by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash('message' /* key */, 'Email ou senha incorretos!' /* value */);

      res.render('auth/login');
      return;
    }

    // see if password match with the password in the database
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash('message' /* key */, 'Email ou senha incorretos!' /* value */);

      res.render('auth/login');
      return;
    }

    try {
      // Doing authentication
      req.session.userId = user.id;

      req.flash('message' /* key */, `Bem vindo, ${user.name}!` /* value */);

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(`An error: ${err}`);

      req.flash(
        'message' /* key */,
        'Ocorreu um erro, tente novamente mais tarde!' /* value */,
      );

      res.render('auth/login');
    }
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

    // Check if user exists by email
    const checkIfUserExists = await User.findOne({ where: { email } });
    if (checkIfUserExists) {
      req.flash(
        'message' /* key */,
        'Este email já foi registrado, tente um diferente!' /* value */,
      );

      res.render('auth/register', { name });
      return;
    }

    // Create a password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = { name, email, password: hashedPassword };

    try {
      // Adding user in data base
      const createdUser = await User.create(user);

      // Initialize session
      req.session.userId = createdUser.id;

      req.flash(
        'message' /* key */,
        `Cadastro realizado com sucesso. Bem vindo, ${createdUser.name}!` /* value */,
      );

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(`An error: ${err}`);

      req.flash(
        'message' /* key */,
        'Ocorreu um erro, tente novamente mais tarde!' /* value */,
      );

      res.render('auth/register');
    }
  }

  // Logout route
  static async logout(req, res) {
    req.session.destroy();
    res.redirect('/entrar');
  }
};
