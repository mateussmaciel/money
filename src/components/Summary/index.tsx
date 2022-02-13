import React, {useContext} from 'react';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';


import { Container } from "./styles";

export function Summary(){
  const {transactions} = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'entrada'){
      acc.entradas += transaction.valor
      acc.total += transaction.valor
    }
    else{
      acc.saidas += transaction.valor
      acc.total -= transaction.valor
    }
    return acc;
  }, {
    entradas: 0,
    saidas: 0,
    total: 0

  });

  return (
    <Container>


      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
                 style: 'currency',
                 currency: 'BRL'
               }).format(summary.entradas)}
          </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="saídas" />
        </header>
        <strong>
        - {new Intl.NumberFormat('pt-BR', {
                 style: 'currency',
                 currency: 'BRL'
               }).format(summary.saidas)}
          </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
                 style: 'currency',
                 currency: 'BRL'
               }).format(summary.total)}
          </strong>
      </div>
    </Container>
  )
}