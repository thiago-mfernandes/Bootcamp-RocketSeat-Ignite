import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closedIMg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');


  //funcao do onSubmit do formulario
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    //preciso aguardar que a transaction aconteça, e dando certo
    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setType('deposit');
    setTitle('');
    setAmount(0);
    setCategory('');
    //executa o fechamento do modal
    onRequestClose();
  }

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      //overlay se refere a parte de fora do modal
      //as estilizacoes de modais, por serem parecidas, estao no GlobalStyles
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      >
        <button 
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"  
        >
          <img src={closedIMg} alt="Fechar Modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>

          <h2>Cadastrar Transação</h2>
          <input 
            type="text"
            placeholder="Título" 
            value={title}
            //funcao onChange devolve no retorno do evento
            onChange={event => setTitle(event.target.value)}
          />
          <input 
            type="number"
            placeholder="Valor" 
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
          />

          <TransactionTypeContainer>

            <RadioBox 
              type="button"
              onClick={() => { setType('deposit'); }}
              //meu botao nao possui uma propriedade native is Active, entao fiz uma interface no styled-component
              isActive={type === 'deposit'}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox 
              type="button"
              onClick={() => { setType('withdraw'); }}
              isActive={type === 'withdraw'}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída" />
              <span>Saída</span>
            </RadioBox>

          </TransactionTypeContainer>
          <input 
            type="text"
            placeholder="Categoria" 
            value={category}
            onChange={event => setCategory(event.target.value)}
          />
          <button type="submit">
            Cadastrar
          </button>

        </Container>
      
    </Modal>
  );
}