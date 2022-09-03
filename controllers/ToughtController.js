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

    let emptyToughts = false;

    if (toughts.length === 0) emptyToughts = true;

    res.render('toughts/dashboard', {
      toughts: toughts.reverse(),
      emptyToughts,
    });
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

  static async removeTought(req, res) {
    const { id } = req.body;
    const { userId } = req.session;

    try {
      await Tought.destroy({ where: { id, userId } });
      req.flash('message', 'Pensamento removido com sucesso!');
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (err) {
      console.log(`An error: ${err}`);
      req.flash(
        'message' /* key */,
        'Ocorreu um erro, tente novamente mais tarde!' /* value */,
      );
      res.redirect('/toughts/dashboard');
    }
  }

  static async updateTought(req, res) {
    const { id } = req.params;

    const tought = await Tought.findOne({ where: { id }, raw: true });

    res.render('toughts/edit', { tought });
  }

  static async updateToughtSave(req, res) {
    const { id, title } = req.body;
    const { userId } = req.session;

    try {
      await Tought.update({ title }, { where: { id, userId } });
      req.flash('message', 'Pensamento atualizado com sucesso!');
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (err) {
      console.log(`An error: ${err}`);
      req.flash(
        'message' /* key */,
        'Ocorreu um erro, tente novamente mais tarde!' /* value */,
      );
      res.render('toughts/edit');
    }
  }
};
