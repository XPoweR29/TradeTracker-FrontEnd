import { createContext } from "react";
import {Position, User} from 'types';

type AppContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (val: boolean) => void;

    userData: User;
    setUserData: (val: User) => void;

    positions: Position[]
    setPositions: (val: Position[]) => void;
}


export const AppContext = createContext<AppContextType | null>(null);