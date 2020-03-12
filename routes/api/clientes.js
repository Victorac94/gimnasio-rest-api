const router = require('express').Router();

const Table = require('../../models');

// http://localhost:3000/api/clientes
router.get('/', (req, res) => {
    // Get all clients
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.getAll(table)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/clientes/new
router.post('/new', (req, res) => {
    // Add new client
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.addData(table, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/clientes/edit
router.put('/edit', (req, res) => {
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