const express = require('express');
const { createCheckout } = require('../controller/payment');
const router = express.Router();

router.post('/create-checkout-session', createCheckout);

module.exports = router;
