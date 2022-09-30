const express = require('express');

//instancia do express
const app = express();

// receber na aplicacao body params do tipo json
app.use(express.json());


//localhost:3333

/**
 * GET - Buscar informações dentro do servidor;
 * POST - Inserir uma informação no servidor;
 * PUT - Alterar uma informação no servidor;
 * PATCH - Alterar uma informação especiífica;
 * DELETE - Remover uma informação no servidor;
 * 
 * Nossa fakeAPI de Cursos:
 */

/**
 * Tipos de Parametros:
 * 
 * 1.Route Params => /courses/:id => servem para identificar um recurso e buscar/editar/deletar
 * 2.Query Params => Paginação, filtro de busca
 * 3.Body Params => Objetos para inserção ou alteraçao de algum recurso
 */

app.get('/courses', (request, response) => {
  const query = request.query;
  console.log(query);
  return response.json([ "Curso 1", "Curso 2", "Curso 3" ])
})

app.post('/courses', (request, response) => {
  const body = request.body;
  console.log(body);
  return response.json([ "Curso 1", "Curso 2", "Curso 3", "Curso 4" ])
})

app.put('/courses/:id', (request, response) => {
  const params = request.params;
  console.log(params);
  return response.json([ "Curso 6", "Curso 2", "Curso 3", "Curso 4" ])
})

app.patch('/courses/:id', (request, response) => {
  return response.json([ "Curso 6", "Curso 7", "Curso 3", "Curso 4" ])
})

app.delete('/courses/:id', (request, response) => {
  return response.json([ "Curso 6", "Curso 2", "Curso 4" ])
})

// start app: node src/index.js


//porta que o servidor estara ouvindo as requisicoes
app.listen(3333);
