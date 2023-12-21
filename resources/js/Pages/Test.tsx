import Footer from '@/new/components/Footer';
import HomeHero from '@/new/components/Home/HomeHero';
import NewsSection from '@/new/components/NewsSection';
import React from 'react';

export default function TestScreen() {
    return (<>
        <HomeHero />
        <div>
            <NewsSection />
        </div>
        <Footer />
    </>);
}
