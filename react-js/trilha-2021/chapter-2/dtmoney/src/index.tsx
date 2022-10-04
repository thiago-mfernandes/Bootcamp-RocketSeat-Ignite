import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({

  //banco de dados interno do miragejs
  models: {
    transaction: Model
  },

  //criar uma transaction fake para deixar a interface com dados pré-cadastrados
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-14-12 11:00:00'),
        }
      ],
    })
  },



  //quais sao as rotas da minha api ficticia:
  routes() {
    //chamadas com /api serao direciondas ao mirage
    this.namespace = 'api';

    //primeiro argumento: quando houver uma requisicao do tipo get para
    //segundo argumento: eu vou retornar alguma coisa
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

      //schema eh meu banco de dados
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      //parametro 1: qual meu model. 2: quais sao meus dados
      return schema.create('transactions', data)
    })
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
