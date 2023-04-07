import styles from './Header.module.scss';
import {FiSearch} from 'react-icons/fi';

interface Props  {
    title: string;
    username: string;
}

export const Header = (props: Props) => {
    const search = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('searching...')
    }

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{props.title}</h1>

            <section className={styles.search}>
                <form className={styles.searchBox} onSubmit={search}>
                    <input type="text" placeholder='Wyszukaj...' />
                    <button type='submit'><FiSearch/></button>
                </form>
            </section>

            <section className={styles.userMenu}>
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
                className={styles.avatar}/>
                <p>{props.username}</p>
            </section>   
        </div>
    ) 
}