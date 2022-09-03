const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
  static showToughts(req, res) {
    res.render('toughts/home');
  }

  static async dashboard(req, res) {
    const { userId } = req.session;
    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });

    // Check if user exists
    if (!user) {
      res.redirect('/login');
    }

    const toughts = user.Toughts.map((result) => result.dataValues);
    res.render('toughts/dashboard', { toughts: toughts.reverse() });
  }

  static createTought(req, res) {
    res.render('toughts/create');
  }

  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userId,
    };

    try {
      await Tought.create(tought);
      req.flash('message', 'Pensamento criado com sucesso!');
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (err) {
      console.log(`An error: ${err}`);
      req.flash(
        'message' /* key */,
        'Ocorreu um erro, tente novamente mais tarde!' /* value */,
      );
      res.render('toughts/create');
    }
  }
};
