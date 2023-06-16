import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import { Header } from '../../components/Dashboard/Header/Header';
import { Transactions } from '../../components/Dashboard/Transactions/Transactions';
import { Sidebar } from '../../components/Dashboard/Sidebar/Sidebar';
import { Statistics } from '../../components/Dashboard/Statisctics/Statisctics';
import { Settings } from '../../components/Dashboard/Settings/Settings';
import { Contact } from '../../components/Dashboard/Contact/Contact';
import { AppContext } from '../../components/Common/Contexts/AppContext';
import styles from './Dashboard.module.scss';
import { apiUrl } from '../../config/api';
import { PaginationResponse } from 'types';

export const Dashboard = () => {
    
    const [headerTitle, setHeaderTitle] = useState('TRANSAKCJE'); 
    const {userData: user, isAuthenticated, setPositions} = useContext(AppContext)!;
    
    useEffect(() => { 
        getPositionsList();
    }, []);

    const getPositionsList = async() => {
            const rawRes = await fetch(`${apiUrl}/api/positions/1/asc`, {credentials: 'include'});
            const res = await rawRes.json() as PaginationResponse & Record<'message', string>;
        
        if(!rawRes.ok) throw new Error(res.message);
        
        setPositions(res.positions); 
    }
            


    if(isAuthenticated){
        return(
            <div className={styles.wrapper}>
            
            
                <header><Header title={headerTitle} username={user.username!}/></header>
                <aside><Sidebar setTitle={setHeaderTitle}/></aside>
                <main>
                    <Routes>
                        <Route path='/transactions' element={<Transactions refreshList={getPositionsList}/>}/>
                        <Route path='/stats' element={<Statistics/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/contact' element={<Contact/>}/>
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