const router = require('express').Router();

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
router.post('/new', (req, res) => {
    // Add exercise
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.addData(table, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/edit
router.put('/edit', (req, res) => {
    // Edit exercise
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