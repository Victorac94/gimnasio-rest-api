# REST API GimnasioDB

This API is aimed to work along with the Gimnasio DB (local DB) made in NEOLAND.

All endpoints return a JSON.



## ROUTES

The endpoints of the API are:

### For clients

**GET** /api/clientes --> Get all clients
**POST** /api/clientes/new --> Add a new client
**PUT** /api/clientes/edit --> Edit client. Client's ID to edit must be passed in the request's body
**DELETE** /api/clientes/delete/:clientID --> Delete a client. 'clientId' must be a positive number

### For exercises

**GET** /api/ejercicios --> Get all exercises
**POST** /api/ejercicios/new --> Add a new exercise
**PUT** /api/ejercicios/edit --> Edit an exercise. Exercise's ID to edit must be passed in the request's body
**DELETE** /api/ejercicios/delete/:exerciseID --> Delete an exercise. 'exerciseID' must be a positive number

### For teachers

**GET** /api/profesores --> Get all teachers
**POST** /api/profesores/new --> Add a new teacher
**PUT** /api/profesores/edit --> Edit a teacher. Teacher's ID to edit must be passed in the request's body
**DELETE** /api/profesores/delete/:teacherID --> Delete a teacher. 'teacherID' must be a positive number