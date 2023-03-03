import styles from './MainBtn.module.scss';

interface Props {
    text: string;
    dark?: boolean;
}

export const MainBtn = (props: Props) => {
    return <>
        <button className={props.dark ? styles.dark : styles.primary}>{props.text}</button>
    </>
}