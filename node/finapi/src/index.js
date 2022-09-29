const express = require('express');
const { v4: uuidv4 } = require('uuid')
const app = express();
app.use(express.json());

/**
 * Dados de uma conta:
 * cpf: string,
 * name: string,
 * id: uuid,
 * statement: []
 */


//Middleware

//armazenamento dos meus clientes
const customers = [];

// - funcao que verifica se uma conta existe
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  //o metodo .find() retorna a informacao completa quando encontrada
  const customer = customers.find((customer) => customer.cpf === cpf);

  //se nao exister o customer, ele vai lancar o erro
  if(!customer) {
    return response.status(400).json({ error: "Customer not found" });
  } 
  

  //para passar os dados do customer para as rotas:
  request.customer = customer;

  //se existir, ele volta para a a rota
  return next();
}

//funcao que verifica se ha saldo para uma operacao de saque
function getBalance(statement) {
  //reduce() recebe as informacoes e devolve uma unica informacao

  //meu statement ja possui as informacoes de saldo em conta
  const balance = statement.reduce((acumulador, operacao) => {
    //se minha operacao for credito, quero que acumule o valour
    //se minha operacao for debito, quero que subtraia o valor
    if(operacao.type === 'credit') {
      return acumulador + operacao.amount;
    } else {
      return acumulador - operacao.amount;
    }
  }, 0);

  return balance;
}

// - Criar conta e verificar se a conta existe:
//minha requisicao possui no corpo os dados da conta
app.post('/account', (request, response) => {

  const { cpf, name } = request.body;
  console.log(cpf, name);

  // metodo .some() retorna apenas um booleano, existe ou nao existe
  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if(customerAlreadyExists) {
    return response.status(400).json({error: "Customer Already Exists!"})
  }
  
  customers.push({ 
    cpf,
    name,
    id: uuidv4(), 
    statement: []
  });

  return response.status(201).send();
});

// - Buscar um extrato bancario do cliente e verificar se o cliente existe
app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  //desestruturo e pego o dado que veio de dentro da funcao verifyIfExistsAccount
  const { customer } = request;
  //console.log(customer);

  return response.json(customer.statement);
});

// - deve ser possivel realizar um deposito, nao deve ser possivel realizar um deposito numa conta nao existente
app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  //pego os dados do deposito: destinatario e valor
  const { description, amount } = request.body;
  console.log(description, amount);

  //resgato meu cliente (veio de dentro da minha funcao verifyIfExistsAccountCPF)
  const { customer } = request;

  //qual sera o tipo de operacao feita:
  const statementeOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  //operacao efetuada:
  customer.statement.push(statementeOperation);

  return response.status(201).send();
})

// - deve ser possivel realizar um saque, nao deve ser possivel sacar caso a conta nao exista
app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  //qual valor do saque?
  const { amount } = request.body;
  //quem eh nosso cliente?
  const { customer } = request;

  //verifico pela funcao qual eh o saldo existente
  const balance = getBalance(customer.statement);

  //se nao houver suficiente:
  if(balance < amount) {
    return response.status(400).json({error: "Insuficient Funds!"});
  } 

  //havendo saldo, faco a operacao :
  const statementOperation = {
    amount, 
    created_ate: new Date(),
    type: "debit"
  };

  //insiro a operacao no statement do customer
  customer.statement.push(statementOperation);

  return response.status(201).send();
})

// - Buscar um extrato bancario do cliente a partir de uma data especifica
app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
  //desestruturo e pego o dado que veio de dentro da funcao verifyIfExistsAccount
  const { customer } = request;
  //console.log(customer);

  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  //vai comparar cada data do statement com a data formatada
  const statement = customer.statement.filter(
    (statement) => 
    statement.created_at.toDateString() === 
    new Date(dateFormat).toDateString()
    );

  return response.json(statement);
});

// - atualizar os dados da conta do cliente
app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
})

// - obter dados da conta
app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer);
})

// - deletar uma conta
app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  //retirar de dentro do nosso array de customers pelo splice
  //remove apenas uma posicao a partir do customer, ou seja, ele mesmo
  customers.splice(customer, 1);

  return response.status(200).json(customers);
})

app.listen(3333);