const express = require('express');
const router = express.Router();
const { convert, convertMultiple, getTrends, getComparison } = require('../controllers/currencyController');

router.post('/convert', convert);
router.post('/convert-multiple', convertMultiple);
router.get('/trends', getTrends);
router.get('/comparison', getComparison);

module.exports = router;
