import React from 'react';
import styles from "./card.title.module.css";

type Props = {
    children?: React.ReactNode;
}

const CardTitle: React.FC<Props> = ({ children }) => {
    return <div className={styles.title}>
        {children}
    </div>;
}

export default CardTitle;