const express = require('express');
const router = express.Router();
const { saveHistory, getHistory } = require('../controllers/historyController');

router.post('/', saveHistory);
router.get('/', getHistory);

module.exports = router;
