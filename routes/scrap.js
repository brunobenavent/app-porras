const express = require('express');
const { consultarWebScraping } = require('../controllers/scrap');
const router = express.Router();


// ...

router.get('/:jornada', consultarWebScraping);






module.exports = router;
