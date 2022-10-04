import { Container } from './styles';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary(){

  const { transactions } = useTransactions();

  const summary = transactions.reduce((counter, transaction) => {
    if(transaction.type === 'deposit') {
      counter.deposits += transaction.amount;
      counter.total += transaction.amount;
    } else {
      counter.withdraws += transaction.amount;
      counter.total -= transaction.amount;
    }

    return counter;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            //style: currency é formatar em MOEDA.
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)
          }
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saidas" />
        </header>
        <strong>- 
          {new Intl.NumberFormat('pt-BR', {
            //style: currency é formatar em MOEDA.
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws)
          }
        </strong>
      </div>

      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            //style: currency é formatar em MOEDA.
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)
          }
        </strong>
      </div>
    </Container>
  );
}