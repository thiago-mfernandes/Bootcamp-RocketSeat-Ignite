import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer } from 'miragejs';
import { App } from './App';

createServer({
  //quais sao as rotas da minha api ficticia:
  routes() {
    //chamadas com /api serao direciondas ao mirage
    this.namespace = 'api';

    //primeiro argumento: quando houver uma requisicao do tipo get para
    //segundo argumento: eu vou retornar alguma coisa
    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date()
        }
      ]
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
