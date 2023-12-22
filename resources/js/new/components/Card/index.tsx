import React from 'react';
import styles from "./card.module.css";

type Props = {
    children?: React.ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
    return <div className={styles.card}>
        {children}
    </div>;
}

export default Card;
