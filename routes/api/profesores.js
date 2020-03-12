const router = require('express').Router();

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
router.post('/new', (req, res) => {
    // Add teacher
    const table = req.baseUrl.split('/')[2]; // Get table name from url

    Table.addData(table, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// http://localhost:3000/api/profesores/edit
router.put('/edit', (req, res) => {
    // Edit teacher
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