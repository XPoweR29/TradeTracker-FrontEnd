import { createContext } from "react";
import {Position, User} from 'types';

type AppContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (val: boolean) => void;

    userData: Partial<User>;
    setUserData: (val: User) => void;

    positions: Position[] | null
    setPositions: (val: Position[] | null) => void;
}


export const AppContext = createContext<AppContextType | null>(null);