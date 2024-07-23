const express = require('express');
const router = express.Router();

const getPlans = require('./subscriptions/getPlans');
const updatePlan = require('./subscriptions/updatePlan');

router.use('/plans', getPlans);
router.use('/plans', updatePlan);

module.exports = router;
