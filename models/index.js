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
const getAll = async (table) => {
    // Creo la sentencia
    const query = `SELECT * FROM ${table}`;
    try {
        // Le paso la sentencia a ejecutar
        return await executeQuery(query, null);
    } catch (err) {
        return { 'error': 'Se ha producido un error', ...err };
    }
};

// Add row to a table
const addData = async (table, data) => {
    // Recojo los arrays en variables. Destructuring
    const [params, values, placeholders] = formatData('add', data);
    // Creo la sentencia
    const query = `INSERT INTO ${table} (${params}) VALUES (${placeholders})`;
    try {
        // Le paso la sentencia con los valores a añadir
        const result = await executeQuery(query, values.split(', '));

        if (response.affectedRows !== 0) {
            return { 'success': `Datos añadidos con éxito en la tabla ${table}`, 'addedData': data, ...result }
        } else {
            return response;
        }
    } catch (err) {
        return { 'error': 'Se ha producido un error', ...err };
    }
}

// Edit row of a table
const editData = async (table, data) => {
    const [params, values] = formatData('edit', data);
    // Creo la sentencia
    const query = `UPDATE ${table} SET ${params}`;
    try {
        // Le paso la sentencia con los valores a modificar
        const response = await executeQuery(query, values.split(', '));

        if (response.affectedRows !== 0) {
            return { 'success': `Datos editados con éxito en la tabla ${table}`, 'editedData': data, ...response }
        } else {
            return response;
        }
    } catch (err) {
        return { 'error': 'Se ha producido un error', ...err };
    }
}

// Delete row from a table
const deleteData = async (table, id) => {
    // Creo la sentencia
    const query = `DELETE FROM ${table} WHERE Id = ${id}`;
    try {
        // Le paso la sentencia con el id del row a borrar
        const response = await executeQuery(query, [id]);

        if (response.affectedRows !== 0) {
            return { 'success': `Datos borrados con éxito en la tabla ${table}`, 'deletedID': id, ...response }
        } else {
            return response;
        }
    } catch (err) {
        return { 'error': 'Se ha producido un error', ...err };
    }
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