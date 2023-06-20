import { useContext, useState } from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import { Header } from '../../components/Dashboard/Header/Header';
import { Transactions } from '../../components/Dashboard/Transactions/Transactions';
import { Sidebar } from '../../components/Dashboard/Sidebar/Sidebar';
import { Statistics } from '../../components/Dashboard/Statisctics/Statisctics';
import { Settings } from '../../components/Dashboard/Settings/Settings';
import { Contact } from '../../components/Dashboard/Contact/Contact';
import { AppContext } from '../../components/Common/Contexts/AppContext';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
    const [headerTitle, setHeaderTitle] = useState('TRANSAKCJE'); 
    const {userData: user, isAuthenticated} = useContext(AppContext)!;
          
    if(isAuthenticated){
        return(
            <div className={styles.wrapper}>
                <header><Header title={headerTitle} username={user.username!}/></header>
                <aside><Sidebar setTitle={setHeaderTitle}/></aside>
                <main>
                    <Routes>
                        <Route path='/transactions' element={<Transactions/>}/>
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
    };
};