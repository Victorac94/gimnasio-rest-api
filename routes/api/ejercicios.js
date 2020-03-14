const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Table = require('../../models');

// http://localhost:3000/api/ejercicios
router.get('/', (req, res) => {
    // Get all exercises
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.getAll(table)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/new
router.post('/new', [
    check('titulo', 'El titulo debe tener entre 1 y 50 caracteres').isLength({ min: 1, max: 50 }),
    check('duracion', 'La duracion del ejercicio debe estar en un formato hh:mm:ss correcto').custom(value => /^([0-9]{2}:[0-6]{2}:[0-6]{2})$/.test(value)),
    check('repeticiones', 'Las repeticiones deben ser un número').isNumeric()
], (req, res) => {
    // Add exercise
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.addData(table, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/edit
router.put('/edit', [
    check('titulo', 'El titulo debe tener entre 1 y 50 caracteres').isLength({ min: 1, max: 50 }),
    check('duracion', 'La duracion del ejercicio debe estar en un formato hh:mm:ss correcto').custom(value => /^([0-9]{2}:[0-6]{2}:[0-6]{2})$/.test(value)),
    check('repeticiones', 'Las repeticiones deben ser un número').isNumeric(),
    check('id', 'El id del ejercicio a editar debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], (req, res) => {
    // Edit exercise
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.editData(table, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/delete
router.delete('/delete/:ejercicioId', (req, res) => {
    // Delete exercise
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.deleteData(table, req.params.ejercicioId)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

module.exports = router;