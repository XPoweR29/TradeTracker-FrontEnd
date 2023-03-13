import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { AppContext } from "./components/Common/Contexts/AppContext"
import { PrivateRoute } from "./components/Common/PrivateRoute/PrivateRoute"
import { Dashboard } from "./views/Dashboard/Dashboard"
import { HomePage } from "./views/HomePage/HomePageView"
import { NotFound } from "./views/NotFound/NotFound"
import {User} from 'types';

const user: User = {
  id: '',
  username: '',
  email: '',
  pwd: '',
};

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(user);

  const contextValues = {
    isAuthenticated, setIsAuthenticated,
    userData, setUserData,
  };


  return (
    <AppContext.Provider value={contextValues}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    </AppContext.Provider>
  )
}
