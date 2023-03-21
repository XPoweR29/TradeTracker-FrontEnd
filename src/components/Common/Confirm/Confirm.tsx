import styles from './Confirm.module.scss';

interface Props {
    message: string;
    onConfirm: () => void;
    showConfirm: (val: boolean) => void;
}

export const Confirm = (props: Props) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <h1 className={styles.title}>{props.message}</h1>

                <button className={styles.confirm} onClick={()=>props.onConfirm()}>TAK</button>
                <button className={styles.cancel} onClick={()=>props.showConfirm(false)}>NIE</button>
            </div>
        </div>
    );
}