const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Table = require('../../models');
const { checkIsAlphanumeric } = require('../../middlewares/validators');

// http://localhost:3000/api/ejercicios
router.get('/', async (req, res) => {
    // Get all exercises
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // 'response' is either successful or error
    const response = await Table.getAll(table);

    res.json(response);
});

// http://localhost:3000/api/ejercicios/new
router.post('/new', [
    check(['titulo', 'duracion', 'repeticiones'], 'Debes completar todos los campos (titulo, duracion, repeticiones)').notEmpty(),
    check('titulo', 'El titulo debe tener entre 1 y 50 caracteres').custom(value => checkIsAlphanumeric(value)).isLength({ min: 1, max: 50 }),
    check('duracion', 'La duracion del ejercicio debe estar en un formato hh:mm:ss correcto').custom(value => /^([0-9]{2}:[0-6]{2}:[0-6]{2})$/.test(value)),
    check('repeticiones', 'Las repeticiones deben ser un número').isNumeric()
], async (req, res) => {
    // Add new exercise
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // 'response' is either successful or error
    const response = await Table.addData(table, req.body);

    res.json(response);
});

// http://localhost:3000/api/ejercicios/edit
router.put('/edit', [
    check(['titulo', 'duracion', 'repeticiones', 'id'], 'Debes completar todos los campos (titulo, duracion, repeticiones, id)').notEmpty(),
    check('titulo', 'El titulo debe tener entre 1 y 50 caracteres').custom(value => checkIsAlphanumeric(value)).isLength({ min: 1, max: 50 }),
    check('duracion', 'La duracion del ejercicio debe estar en un formato hh:mm:ss correcto').custom(value => /^([0-9]{2}:[0-6]{2}:[0-6]{2})$/.test(value)),
    check('repeticiones', 'Las repeticiones deben ser un número').isNumeric(),
    check('id', 'El id del ejercicio a editar debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], async (req, res) => {
    // Edit exercise
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // 'response' is either successful or error
    const response = await Table.editData(table, req.body);

    res.json(response);
});

// http://localhost:3000/api/ejercicios/delete
router.delete('/delete/:ejercicioId', [
    check('ejercicioId', 'El id del ejercicio a borrar debe ser un número y además positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], async (req, res) => {
    // Delete exercise
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