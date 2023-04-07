import { useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AppContext } from "./components/Common/Contexts/AppContext"
import { Dashboard } from "./views/Dashboard/Dashboard"
import { HomePage } from "./views/HomePage/HomePageView"
import {Position, User} from 'types';
import { ToastContainer } from "react-toastify"

const user: User = {
  id: '',
  username: '',
  email: '',
  pwd: '',
};

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User>(user);
  const [positions, setPositions] = useState<Position[]>([]);

  const contextValues = {
    isAuthenticated, setIsAuthenticated,
    userData, setUserData,
    positions, setPositions,
  };


  return (
    <AppContext.Provider value={contextValues}>
      <ToastContainer/>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard/*" element={<Dashboard/>}/>
        
        <Route path="*" element={<Navigate to={'/'}/>}/>
    </Routes>
    </AppContext.Provider>
  )
}
