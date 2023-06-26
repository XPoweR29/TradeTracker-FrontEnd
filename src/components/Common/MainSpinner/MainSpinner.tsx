import styles from './MainSpinner.module.scss';

export const MainSpinner = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}





