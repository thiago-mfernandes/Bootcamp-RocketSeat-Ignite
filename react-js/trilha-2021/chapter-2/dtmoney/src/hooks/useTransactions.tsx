import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../services/api';
import { useContext } from 'react';
//import { TransactionsContext } from './useTransactions';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

//herdo as props de Transaction, omitindo os campos ...
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionProviderProps {
  children: ReactNode;
}

//que tipo de informacoes vou ter no meu contexto?
interface TransactionsContextData {
  transactions: Transaction[];
  //minha funcao eh assincrona e retorna uma Promise
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

//criei um contexto tipado recebendo um array de itens do tipo Transaction
const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

//criei uma funcao ..Provider, que recebe props tipadas
export function TransactionsProvider({ children }: TransactionProviderProps) {
  //realizei a logica dos dados que quero retornar no contexto
  const[transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    //como eh uma funcao assincrona, pego o retorno
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    });
    //e desestruturo a informacao que foi obtida pelo formulario
    const { transaction } = response.data;
    //incluo essa informacao no estado copiando a antiga e a nova
    setTransactions([ ...transactions, transaction ]);
  }

  //retorno o contexto: TransactionsContext.Provider apos obter os dados atraves da funcao TransactionsProvider disponibilizando atraves do value, os dados que quero compartilhar.

  //entao eu crio o contexto, crio uma funcao com a logica, e na funcao com a logica retorno o contexto com os dados

  return (
    <TransactionsContext.Provider value={ {transactions, createTransaction} }>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}

