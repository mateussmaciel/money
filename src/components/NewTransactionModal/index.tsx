import { FormEvent, useState, useContext } from 'react';

import { api } from '../../services/api';

import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps{
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
  const {createTransaction} = useTransactions()
  
  const [title, setTitle] = useState('');
  const [valor, setValor] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [type, setType] = useState('entrada');

  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault();
    await createTransaction({
      title,
      valor,
      categoria,
      type
    })
    
    setTitle('');
    setValor(0);
    setCategoria('');
    setType('entrada');

    onRequestClose();
  }

  return(
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
          placeholder="Título" 
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input 
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={event => setValor(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {setType('entrada')}}
            isActive={type === 'entrada'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => {setType('saida')}}
            isActive={type === 'saida'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria"
          value={categoria}
          onChange={event => setCategoria(event.target.value)}
        
        />
        <button type="submit">Cadastrar</button>

      </Container>          
    </Modal>
  );
}
