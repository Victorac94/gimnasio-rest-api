const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Table = require('../../models');
const { isDNI } = require('../../middlewares/validators');

// http://localhost:3000/api/clientes
router.get('/', (req, res) => {
    // Get all clients
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.getAll(table)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/clientes/new
router.post('/new', [
    check('nombre', 'El nombre sólo puede contener letras y debe tener entre 3 y 20 caracteres').isAlpha().isLength({ min: 3, max: 20 }),
    check('apellidos', 'Los apellidos sólo pueden contener letras y deben tener entre 3 y 30 caracteres').isAlpha().isLength({ min: 3, max: 30 }),
    check('direccion', 'La direccion sólo puede contener letras y/o números y debe tener entre 2 y 40 caracteres').isAlphanumeric().isLength({ min: 2, max: 40 }),
    check('email', 'El formato de email es inválido').isEmail(),
    check('edad', 'La edad debe ser numérica y estar entre 1 y 99 años').custom(value => /^[1-9][0-9]{0,1}$/.test(value)),
    check('sexo', 'El sexo debe ser M (masculino) o F (Femenino)').custom(value => /[MF]/.test(value)),
    check('cuota', 'La cuota debe ser numerica y en formato dd.dd donde \'d\' representa un dígito').custom(value => /^[0-9]{2}\.[0-9]{2}$/.test(value)),
    check('fecha_nacimiento', 'La fecha de nacimiento debe estar en formato yyyy-mm-dd').isISO8601().toDate(),
    check('dni', 'Debes ingresar un DNI válido').custom(isDNI),
    check('fk_profesor', 'El id del profesor debe ser un número').custom(value => /^[1-9][0-9]*$/.test(value)),
], (req, res) => {
    // Add new client
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.addData(table, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/clientes/edit
router.put('/edit', [
    check('nombre', 'El nombre sólo puede contener letras y debe tener entre 3 y 20 caracteres').isAlpha().isLength({ min: 3, max: 20 }),
    check('apellidos', 'Los apellidos sólo pueden contener letras y deben tener entre 3 y 30 caracteres').isAlpha().isLength({ min: 3, max: 30 }),
    check('direccion', 'La direccion sólo puede contener letras y/o números y debe tener entre 2 y 40 caracteres').isAlphanumeric().isLength({ min: 2, max: 40 }),
    check('email', 'El formato de email es inválido').isEmail(),
    check('edad', 'La edad debe ser numérica y estar entre 1 y 99 años').custom(value => /^[1-9][0-9]{0,1}$/.test(value)),
    check('sexo', 'El sexo debe ser M (masculino) o F (Femenino)').custom(value => /[MF]/.test(value)),
    check('cuota', 'La cuota debe ser numerica y en formato dd.dd donde \'d\' representa un dígito').custom(value => /^[0-9]{2}\.[0-9]{2}$/.test(value)),
    check('fecha_nacimiento', 'La fecha de nacimiento debe estar en formato yyyy-mm-dd').isISO8601().toDate(),
    check('dni', 'Debes ingresar un DNI válido').custom(isDNI),
    check('fk_profesor', 'El id del profesor debe ser un número').custom(value => /^[1-9][0-9]*$/.test(value)),
    check('id', 'El id del cliente a editar debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value)),
], (req, res) => {
    // Edit client
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.editData(table, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/clientes/delete
router.delete('/delete/:clienteId', (req, res) => {
    // Delete client
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.deleteData(table, req.params.clienteId)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

module.exports = router;