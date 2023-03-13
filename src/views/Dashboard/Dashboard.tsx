import { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { AppContext } from '../../components/Common/Contexts/AppContext';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
    const {userData: user, isAuthenticated, setIsAuthenticated} = useContext(AppContext)!;

    if(isAuthenticated){
        return <>
            <h1>Witaj na swoim koncie {user.username}</h1>
            <br />
            <button onClick={()=>setIsAuthenticated(false)}>Wyloguj</button>
        </>
    }

    else {
        return <Navigate to='/' replace/>
    }
}