const express = require('express');
const router = express.Router();
const {createTrip,getTrip,getTrips}= require('../controllers/iterateController');

router.post('/', createTrip);
router.get('/:id', getTrip);
router.get('/', getTrips);

module.exports = router;