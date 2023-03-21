import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import { Header } from '../../components/Dashboard/Header/Header';
import { Transactions } from '../../components/Dashboard/Transactions/Transactions';
import { Sidebar } from '../../components/Dashboard/Sidebar/Sidebar';
import { Statistics } from '../../components/Dashboard/Statisctics/Statisctics';
import { Settings } from '../../components/Dashboard/Settings/Settings';
import { AppContext } from '../../components/Common/Contexts/AppContext';
import styles from './Dashboard.module.scss';


export const Dashboard = () => {
    
    const [headerTitle, setHeaderTitle] = useState(''); 
    const {userData: user, isAuthenticated, setPositions, positions} = useContext(AppContext)!;

    const getPositionsList = async() => {
        const rawRes = await fetch(`http://localhost:3001/positions/${user.id}`);
        const res = await rawRes.json();

        if(!rawRes.ok) throw new Error(res.message);
        setPositions(res);
    }

    useEffect(() => { 
        getPositionsList();
    }, []);


    if(isAuthenticated){
        return(
            <div className={styles.wrapper}>
                
                <header><Header title={headerTitle} username={user.username}/></header>
                <aside><Sidebar setTitle={setHeaderTitle}/></aside>
                <main>
                    <Routes>
                        <Route path='/transactions' element={<Transactions refreshList={getPositionsList}/>}/>
                        <Route path='/stats' element={<Statistics/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/*' element={<Navigate to='/dashboard/transactions'/>}/>
                    </Routes>
                </main>
            </div>
        )
    }

    else {
        return <Navigate to='/' replace/>
    }
}