import React from 'react';
import styles from './newsentry.module.css';
import { Clock } from 'lucide-react';

type EntryTypes = "entry"|"headline";

type Props = {
    type?: EntryTypes;

}

const NewsEntry: React.FC<Props> = ({type = "entry"}) => {
    return <div className={styles.entry} data-type={type} style={{ "--bannerImage": "url(https://news.yarg.in/images/banners/generic.webp)" } as React.CSSProperties}>
        <div className={styles.thumbnail}>
            <img src={"https://news.yarg.in/images/thumbs/setlist.webp"} />
        </div>
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.tag} data-color="blue">Announcement</div>
                <div className={styles.date}><Clock height="12px"/> 16h ago</div>
            </div>
            <div className={styles.title}>YARG Setlist: Wave 2 Trailer</div>
            <div className={styles.author}>
                <div className={styles.authorAvatar}>
                    <img src={"https://github.com/eliteasian123.png"} />
                    <img src={"https://github.com/eliteasian123.png"} />
                </div>
                <div className={styles.authorName}>Dai, EliteAsian123</div>
            </div>
        </div>
    </div>;
}

export default NewsEntry;