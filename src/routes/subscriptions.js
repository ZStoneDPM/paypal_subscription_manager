const express = require('express');
const router = express.Router();

const getPlans = require('./subscriptions/getPlans');
const updatePlan = require('./subscriptions/updatePlan');
const deactivatePlan = require('./subscriptions/deactivatePlan');
const activatePlan = require('./subscriptions/activatePlan');
const createSubscription = require('./subscriptions/createSubscription');

router.use('/plans', getPlans);
router.use('/plans', updatePlan);
router.use('/plans', deactivatePlan);
router.use('/plans', activatePlan);
router.post('/create', createSubscription);

module.exports = router;
