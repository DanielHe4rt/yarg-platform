import React from 'react';
import styles from "./discord.module.css";
import { Discord } from '../Icons';

const DiscordCard: React.FC = () => {
    return <div className={styles.card}>
        <span className={styles.title}>
            Join 3518 members in our amazing community
        </span>

        <div className={styles.button}>
            <Discord />
            Join the Discord server
        </div>
    </div>;
}

export default DiscordCard;