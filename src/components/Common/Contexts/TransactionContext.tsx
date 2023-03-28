import { createContext } from "react";
import {Position} from 'types';

export interface CurrUrls {
    before: string[];  
    after: string[];
}

type TransactionContextType = {
    position: Position;
    setPosition: (val: Position) => void;

    currentUrls: CurrUrls;
    setCurrentUrls: (val: CurrUrls) => void; 

    refresh: () => void;
}


export const TransactionContext = createContext<TransactionContextType | null>(null);