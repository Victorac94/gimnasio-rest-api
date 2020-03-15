const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Table = require('../../models');
const { isDNI, checkIsAlpha, checkIsAlphanumeric } = require('../../middlewares/validators');

// http://localhost:3000/api/clientes
router.get('/', async (req, res) => {
    // Get all clients
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // 'response' is either successful or error
    const response = await Table.getAll(table);

    res.json(response);
});

// http://localhost:3000/api/clientes/new
router.post('/new', [
    check(['nombre', 'apellidos', 'direccion', 'email', 'edad', 'sexo', 'cuota', 'fecha_nacimiento', 'dni', 'fk_profesor'], 'Completa todos los campos (nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, fk_profesor)').notEmpty(),
    check('nombre', 'El nombre sólo puede contener letras y debe tener entre 3 y 20 caracteres').custom(data => checkIsAlpha(data)).isLength({ min: 3, max: 20 }),
    check('apellidos', 'Los apellidos sólo pueden contener letras y deben tener entre 3 y 30 caracteres').custom(data => checkIsAlpha(data)).isLength({ min: 3, max: 30 }),
    check('direccion', 'La direccion sólo puede contener letras, números, º ó ª y debe tener entre 2 y 40 caracteres').custom(data => checkIsAlphanumeric(data)).isLength({ min: 2, max: 40 }),
    check('email', 'El formato de email es inválido').isEmail(),
    check('edad', 'La edad debe ser numérica y estar entre 1 y 99 años').custom(value => /^[1-9][0-9]{0,1}$/.test(value)),
    check('sexo', 'El sexo debe ser M (masculino) o F (Femenino)').custom(value => /[MF]/.test(value)),
    check('cuota', 'La cuota debe ser numerica y en formato dd.dd donde \'d\' representa un dígito').custom(value => /^[0-9]{2}\.[0-9]{2}$/.test(value)),
    check('fecha_nacimiento', 'La fecha de nacimiento debe estar en formato yyyy-mm-dd').isISO8601(),
    check('dni', 'Debes ingresar un DNI válido').custom(isDNI),
    check('fk_profesor', 'El id del profesor debe ser un número').custom(value => /^[1-9][0-9]*$/.test(value)),
], async (req, res) => {
    // Add new client
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // 'response' is either successful or error
    const response = await Table.addData(table, req.body);

    res.json(response);
});

// http://localhost:3000/api/clientes/edit
router.put('/edit', [
    check(['nombre', 'apellidos', 'direccion', 'email', 'edad', 'sexo', 'cuota', 'fecha_nacimiento', 'dni', 'fk_profesor', 'id'], 'Completa todos los campos (nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, fk_profesor, id)').notEmpty(),
    check('nombre', 'El nombre debe tener entre 3 y 20 caracteres').custom(data => checkIsAlpha(data)).isLength({ min: 3, max: 20 }),
    check('apellidos', 'Los apellidos deben tener entre 3 y 30 caracteres').custom(data => checkIsAlpha(data)).isLength({ min: 3, max: 30 }),
    check('direccion', 'La direccion sólo puede contener letras, números, º ó ª y debe tener entre 2 y 40 caracteres').custom(data => checkIsAlphanumeric(data)).isLength({ min: 2, max: 40 }),
    check('email', 'El formato de email es inválido').isEmail(),
    check('edad', 'La edad debe ser numérica y estar entre 1 y 99 años').custom(value => /^[1-9][0-9]{0,1}$/.test(value)),
    check('sexo', 'El sexo debe ser M (masculino) o F (Femenino)').custom(value => /[MF]/.test(value)),
    check('cuota', 'La cuota debe ser numerica y en formato dd.dd donde \'d\' representa un dígito').custom(value => /^[0-9]{2}\.[0-9]{2}$/.test(value)),
    check('fecha_nacimiento', 'La fecha de nacimiento debe estar en formato yyyy-mm-dd').isISO8601(),
    check('dni', 'Debes ingresar un DNI válido').custom(isDNI),
    check('fk_profesor', 'El id del profesor debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value)),
    check('id', 'El id del cliente a editar debe ser un número positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], async (req, res) => {
    // Edit client
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.array());
    }

    const table = req.baseUrl.split('/')[2]; // Get table name from url

    // 'response' is either successful or error
    const response = await Table.editData(table, req.body);

    res.json(response);
});

// http://localhost:3000/api/clientes/delete
router.delete('/delete/:clienteId', [
    check('clienteId', 'El id del cliente a borrar debe ser un número y además positivo').custom(value => /^[1-9][0-9]*$/.test(value))
], async (req, res) => {
    // Delete client
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