import {createContext, ReactNode, useEffect, useState} from 'react'
import { api } from './services/api';


interface Transaction {
  id: number;
  title: string;
  valor: number;
  type: string;
  categoria: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransanctionProviderProps{
  children: ReactNode;
}

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => void;
}
export const TransactionContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
  );

export function TransactionProvider({children}: TransanctionProviderProps){

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  function createTransaction(transaction: TransactionInput){
    api.post('/transactions', transaction);
  }

  return (
    <TransactionContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )
}