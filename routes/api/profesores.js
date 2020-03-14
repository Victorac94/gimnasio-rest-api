const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Table = require('../../models');

// http://localhost:3000/api/profesores
router.get('/', (req, res) => {
    // Get all teachers
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.getAll(table)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/profesores/new
router.post('/new', [
    check('nombre', 'El nombre debe tener entre 1 y 30 caracteres').isLength({ min: 1, max: 30 }).isAlphanumeric(),
    check('experiencia', 'La experiencia debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], (req, res) => {
    // Add teacher
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.addData(table, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/profesores/edit
router.put('/edit', [
    check('nombre', 'El nombre debe tener entre 1 y 30 caracteres').isLength({ min: 1, max: 30 }).isAlphanumeric(),
    check('experiencia', 'La experiencia debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value)),
    check('id', 'El id del profesor a editar debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], (req, res) => {
    // Edit teacher
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.editData(table, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

// http://localhost:3000/api/profesores/delete
router.delete('/delete/:profesorId', (req, res) => {
    // Delete teacher
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.deleteData(table, req.params.profesorId)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

module.exports = router;