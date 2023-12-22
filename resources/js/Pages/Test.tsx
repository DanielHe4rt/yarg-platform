import React from 'react';
import styles from "@/new/styles/home.module.css";
import Footer from '@/new/components/Footer';
import HomeHero from '@/new/components/Home/HomeHero';
import NewsSection from '@/new/components/NewsSection';
import Card from '@/new/components/Card';
import CardTitle from '@/new/components/Card/CardTitle';
import { BookOpenCheck, Music } from 'lucide-react';
import DiscordCard from '@/new/components/DiscordCard';

export default function Home() {
    return (<>
        <HomeHero />
        
        <div className={styles.content}>
            <NewsSection />

            <div className={styles.cards}>
                <DiscordCard />
                <Card>
                    <CardTitle><BookOpenCheck /> Documentation</CardTitle>
                    Check our official documentation for some guides on how to start.
                </Card>
                <Card>
                    <CardTitle><Music /> Setlist</CardTitle>
                    Featuring bottom bunk, KINGSEEKER, RinRin, Halfway to Michigan and much more...
                </Card>
            </div>
        </div>

        <Footer />
    </>);
}
