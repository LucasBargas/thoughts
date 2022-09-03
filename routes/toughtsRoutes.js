const express = require('express');

const router = express.Router();

const ToughtController = require('../controllers/ToughtController');

// Helper
const { checkAuth } = require('../helpers/auth');

// This dashboard route is protected with the middleware checkAuth
// Your access only allowed if the user is authenticated
router.get('/dashboard/adicionar', checkAuth, ToughtController.createTought);
router.post(
  '/dashboard/adicionar',
  checkAuth,
  ToughtController.createToughtSave,
);
router.get('/dashboard/editar/:id', checkAuth, ToughtController.updateTought);
router.post('/dashboard/editar', checkAuth, ToughtController.updateToughtSave);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.post('/remove', checkAuth, ToughtController.removeTought);
router.get('/', ToughtController.showToughts);

module.exports = router;
