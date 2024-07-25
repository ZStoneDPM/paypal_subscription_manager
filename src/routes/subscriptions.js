// src/routes/subscriptions.js
const express = require('express');
const router = express.Router();

const getPlans = require('./subscriptions/getPlans');
const updatePlan = require('./subscriptions/updatePlan');
const deletePlan = require('./subscriptions/deletePlan');
const createSubscription = require('./subscriptions/createSubscription');

router.use('/plans', getPlans);
router.use('/plans', updatePlan);
router.use('/plans', deletePlan);
router.post('/create', createSubscription);

module.exports = router;
