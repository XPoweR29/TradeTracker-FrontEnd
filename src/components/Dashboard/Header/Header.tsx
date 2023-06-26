import styles from './Header.module.scss';
import {FiSearch} from 'react-icons/fi';
import {useState, useRef, useContext} from 'react';
import { authHandleFetch } from '../../../utils/authHandleFetch';
import { apiUrl } from '../../../config/api';
import { AppContext } from '../../Common/Contexts/AppContext';

interface Props  {
    title: string;
    username: string;
}

export const Header = (props: Props) => {
    const {setIsAuthenticated, setPositions, setIsFilters} = useContext(AppContext)!;
    const [searching, setSearching] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);

    const search = async(e: React.FormEvent) => {
        e.preventDefault(); 
        const data = await authHandleFetch(`${apiUrl}/api/positions/search`, setIsAuthenticated, {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({searching}),
        })
        searchRef.current!.value = '';
        setIsFilters(true);
        if(data.positions) setPositions(data.positions);
    }

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{props.title}</h1>
            
            {/* //FIXME: Wstępnie wywalamy wyszukiwarkę */}
            {/* <section className={styles.search}>
                <form className={styles.searchBox} onSubmit={search}>
                    <input ref={searchRef} 
                    type="text" 
                    onChange={e => setSearching(e.target.value)} 
                    placeholder='Wyszukaj...' />
                    <button type='submit'><FiSearch/></button>
                </form>
            </section> */}

            <section className={styles.userMenu}>
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
                className={styles.avatar}/>
                <p>{props.username}</p>
            </section>   
        </div>
    ) 
}