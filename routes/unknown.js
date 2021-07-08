const router = require('express').Router();
const messages = require('../utils/messages');
const NotFoundErr = require('../errors/not-found-err')

router.get('/*', (req, res, next) => { next(new NotFoundErr(messages['notFound'])); });
router.post('/*', (req, res, next) => { next(new NotFoundErr(messages['notFound'])); });

module.exports = router;
