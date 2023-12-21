import React from 'react';

import styles from "./hero.module.css";
import Header from '@/new/components/Header';
import { Github } from '@/new/components/Icons';
import Button from '@/new/components/Button';
import RotatingWords from '@/new/components/RotatingWords';

const HomeHero: React.FC = () => {
  return <div className={styles.hero}>
    <Header mode="transparent" />

    <div className={styles.content}>
      <div className={styles.about}>
        <div className={styles.title}>
          <div className={styles.titleStatic}>Play on</div>
          <RotatingWords className={styles.instrumentSection} words={["Pro Guitar", "Pro Drums", "Vocal", "Keys", "Guitar", "Bass"]} intervalTime={2500} />
        </div>

        <div className={styles.buttons}>
          <Button color="blue">
            Download
          </Button>

          <Button>
            <Github />
            Check our Repository
          </Button>
        </div>
      </div>

      <div className={styles.video}>
        <div className={styles.gem} data-color="green"></div>
        <div className={styles.gem} data-color="blue"></div>
      </div>
    </div>

  </div>;
}

export default HomeHero;