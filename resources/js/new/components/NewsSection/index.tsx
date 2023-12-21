import React from 'react';
import styles from './NewsSection.module.css';
import NewsEntry from '@/new/components/NewsSection/NewsEntry';

const NewsSection: React.FC = () => {
  return <div className={styles.news}>
        <NewsEntry type="headline" />
        <NewsEntry />
        <NewsEntry />
  </div>;
}

export default NewsSection;