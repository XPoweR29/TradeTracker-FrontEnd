import { useEffect, useState} from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AppContext } from "./components/Common/Contexts/AppContext"
import { Dashboard } from "./views/Dashboard/Dashboard"
import { HomePage } from "./views/HomePage/HomePageView"
import {Position, PositionStats, User} from 'types';
import { ToastContainer } from "react-toastify"

import bcgIgm from "./assets/images/home1.jpg";
import { MainSpinner } from "./components/Common/MainSpinner/MainSpinner"


const user: Partial<User> = {
  id: '',
  username: '',
  email: '',
};

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<Partial<User>>(user);
  const [positions, setPositions] = useState<Position[] | null>([]);
  const [positionsStats, setPositionsStats] = useState<PositionStats[] | null>([]);
  const [isBcgLoaded, setIsBcgLoaded] = useState(false);
  const [isFilters, setIsFilters] = useState(false);

  const contextValues = {
    isAuthenticated, setIsAuthenticated,
    userData, setUserData,
    positions, setPositions,
    positionsStats, setPositionsStats,
    isFilters, setIsFilters
  };

      useEffect(() => {
        const background = new Image();
        background.src = bcgIgm;
        background.onload = () => {
          setIsBcgLoaded(true);
        };
      }, []); 


  return (
    isBcgLoaded ?
    <AppContext.Provider value={contextValues}>
      <ToastContainer/>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/dashboard/*" element={<Dashboard/>}/>
          
          <Route path="*" element={<Navigate to={'/'}/>}/>
      </Routes>
    </AppContext.Provider>
    : 
    <MainSpinner/>
  )
}
