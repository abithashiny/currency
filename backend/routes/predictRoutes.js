const express = require('express');
const router = express.Router();

const { predict, predictML } = require('../controllers/predictController');

router.get('/predict', predict);
router.get('/predict-ml', predictML);

module.exports = router;