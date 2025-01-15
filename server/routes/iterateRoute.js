const express = require('express');
const router = express.Router();
const {createTrip,getTrip}= require('../controllers/iterateController');

router.post('/', createTrip);
router.get('/:id', getTrip);

module.exports = router;