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
import { toast } from 'react-toastify';

export const Dashboard = () => {
    
    const [headerTitle, setHeaderTitle] = useState('TRANSAKCJE'); 
    const {userData: user, isAuthenticated, setIsAuthenticated, setPositions} = useContext(AppContext)!;
    
    useEffect(() => { 
        getPositionsList();
    }, []);

    const getPositionsList = async(): Promise<void> => {
        const rawRes = await fetch(`${apiUrl}/api/positions/1/asc`, {credentials: 'include'});
        const res = await rawRes.json() as PaginationResponse & Record<'message', string>;
        if(!rawRes.ok){
            toast.error(res.message, {
                position: "top-right",
                theme: "colored",
            });
            if(rawRes.status === 401 || rawRes.status === 403) setIsAuthenticated(false);  
        } 
        setPositions(res.positions ?? []);
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