const router = require('express').Router();

const clientesRouter = require('./api/clientes');
const ejerciciosRouter = require('./api/ejercicios');
const profesoresRouter = require('./api/profesores');

router.use('/clientes', clientesRouter);
router.use('/ejercicios', ejerciciosRouter);
router.use('/profesores', profesoresRouter);

module.exports = router;