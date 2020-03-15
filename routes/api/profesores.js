const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Table = require('../../models');
const { checkIsAlpha } = require('../../middlewares/validators');

// http://localhost:3000/api/profesores
router.get('/', async (req, res) => {
    // Get all teachers
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // 'response' is either successful or error
    const response = await Table.getAll(table);

    res.json(response);
});

// http://localhost:3000/api/profesores/new
router.post('/new', [
    check(['nombre', 'experiencia'], 'Debes completar todos los campos (nombre, experiencia)').notEmpty(),
    check('nombre', 'El nombre debe tener entre 1 y 30 caracteres').custom(value => checkIsAlpha(value)).isLength({ min: 1, max: 30 }),
    check('experiencia', 'La experiencia debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], async (req, res) => {
    // Add new teacher
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // 'response' is either successful or error
    const response = await Table.addData(table, req.body);

    res.json(response);
});

// http://localhost:3000/api/profesores/edit
router.put('/edit', [
    check(['nombre', 'experiencia', 'id'], 'Debes completar todos los campos (nombre, experiencia, id)').notEmpty(),
    check('nombre', 'El nombre debe tener entre 1 y 30 caracteres').custom(value => checkIsAlpha(value)).isLength({ min: 1, max: 30 }),
    check('experiencia', 'La experiencia debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value)),
    check('id', 'El id del profesor a editar debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], async (req, res) => {
    // Edit teacher
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // 'response' is either successful or error
    const response = await Table.editData(table, req.body);

    res.json(response);
});

// http://localhost:3000/api/profesores/delete
router.delete('/delete/:profesorId', [
    check('profesorId', 'El id del profesor a borrar debe ser un número y además positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], async (req, res) => {
    // Delete teacher
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // response is either successful or error
    const response = await Table.deleteData(table, req.params.clienteId);

    res.json(response);
});

module.exports = router;