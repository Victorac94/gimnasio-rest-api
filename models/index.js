// Paso los datos de req.body a diferentes variables para modulizar las peticiones a la DB.
// De esta forma no hace falta repetir funciones CRUD para actuar sobre las diferentes tablas de la DB.
const formatData = (method, data) => {
    let myParams = [];
    let myValues = [];
    let myPlaceholders = [];

    // Creamos arrays de longitud dependiente de la cantidad de datos recibidos en data (req.body)
    if (method === 'add') {
        for (let key in data) {
            myParams.push(key);
            myValues.push(data[key]);
            myPlaceholders.push('?');
        }
        // Los convertimos a string
        myParams = myParams.join(', ');
        myValues = myValues.join(', ');
        myPlaceholders = myPlaceholders.join(', ');
    } else if (method === 'edit') {
        for (let key in data) {
            const datum = `${key} = ?`;
            myParams.push(datum);
            myValues.push(data[key]);
        }
        // Remove 'id = ?'
        myParams.pop();

        // Los convertimos a string
        myParams = myParams.join(', ');
        myValues = myValues.join(', ');

        myParams += ` WHERE Id = ?`;
    }

    return [myParams, myValues, myPlaceholders];
}

// Get all rows from a table
const getAll = (table) => {
    // Creo la sentencia
    const query = `SELECT * FROM ${table}`;
    // Le paso la sentencia a ejecutar
    return executeQuery(query, null);
};

// Add row to a table
const addData = (table, data) => {
    // Recojo los arrays en variables. Destructuring
    const [params, values, placeholders] = formatData('add', data);
    // Creo la sentencia
    const query = `INSERT INTO ${table} (${params}) VALUES (${placeholders})`;
    // Le paso la sentencia con los valores a añadir
    return executeQuery(query, values.split(', '));
}

// Edit row of a table
const editData = (table, data) => {
    const [params, values] = formatData('edit', data);
    // Creo la sentencia
    const query = `UPDATE ${table} SET ${params}`;
    // Le paso la sentencia con los valores a modificar
    return executeQuery(query, values.split(', '));
}

// Delete row from a table
const deleteData = (table, id) => {
    // Creo la sentencia
    const query = `DELETE FROM ${table} WHERE Id = ${id}`;
    // Le paso la sentencia con el id del row a borrar
    return executeQuery(query, [id]);
};

// Execute query to DB
const executeQuery = (myQuery, params) => {
    return new Promise((resolve, reject) => {
        // Ejecuto la sentencia
        db.query(myQuery, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    getAll: getAll,
    addData: addData,
    editData: editData,
    deleteData: deleteData
}