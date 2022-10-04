import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closedIMg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { api } from '../../services/api';

interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose}: NewTransactionModalProps) {
  const [type, setType] = useState('deposit');

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');


  //funcao do onSubmit do formulario
  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    const data = {
      title,
      value,
      category,
      type,
    }

    api.post('/transactions', data);
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
            value={value}
            onChange={event => setValue(Number(event.target.value))}
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