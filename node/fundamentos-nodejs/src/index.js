const express = require('express');

//instancia do express
const app = express();

app.get('/', (request, response) => {
  return response.json({message: 'Hello World!'});
})


//porta que o servidor estara ouvindo as requisicoes
app.listen(3333);
