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

interface TransanctionProviderProps{
  children: ReactNode;
}
export const TransactionContext = createContext<Transaction[]>([]);

export function TransactionProvider({children}: TransanctionProviderProps){
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionContext.Provider value={transactions}>
      {children}
    </TransactionContext.Provider>
  )
}