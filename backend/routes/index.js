const express = require('express');

const auth = require('./auth');
const user = require('./user');
const transactions = require('./transactions');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/auth', auth);
router.use('/user', user);
router.use('/transactions', transactions);

module.exports = router;