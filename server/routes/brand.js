const express = require('express');
const router = express.Router();
const { generate, selectConcept, getKit } = require('../controllers/brandController');

router.post('/generate', generate);
router.post('/select', selectConcept);
router.get('/:id', getKit);

module.exports = router;
