import { createContext } from "react";
import {Position, PositionStats, User} from 'types';

type AppContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (val: boolean) => void;

    userData: Partial<User>;
    setUserData: (val: User) => void;

    positions: Position[] | null
    setPositions: (val: Position[] | null) => void;

    positionsStats: PositionStats[] | null
    setPositionsStats: (val: PositionStats[]) => void;
}


export const AppContext = createContext<AppContextType | null>(null);