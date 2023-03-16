import styles from './Header.module.scss';
import {FiSearch} from 'react-icons/fi';

interface Props  {
    title: string;
    username: string;
}

export const Header = (props: Props) => {
    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{props.title}</h1>

            <section className={styles.search}>
                <form className={styles.searchBox}>
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

//IMPROVE: Rodzielic powyższy komponenta na mniejsze.