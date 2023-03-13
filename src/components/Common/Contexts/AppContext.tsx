import { createContext } from "react";
import {User} from 'types';

type AppContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (val: boolean) => void;

    userData: User;
    setUserData: (val: User) => void;
}


export const AppContext = createContext<AppContextType | null>(null);