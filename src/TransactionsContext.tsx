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
  createTransaction: (transaction: TransactionInput) => Promise<void>;
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

  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    });
    const {transaction} = response.data;
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )
}