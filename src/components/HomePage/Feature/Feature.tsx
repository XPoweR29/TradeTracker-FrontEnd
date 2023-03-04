import React from 'react';
import styles from './Feature.module.scss';

interface Props {
    icon: React.ReactNode
    title: string;
    desctiption: string;
}

export const Feature = (props: Props) => {
    return <>
        <li className={styles.feature}>
            <div className={styles.icon}>{props.icon}</div>
            <h2 className={styles.title}>{props.title}</h2>
            <p className={styles.description}>{props.desctiption}</p>
        </li>
    </>
}