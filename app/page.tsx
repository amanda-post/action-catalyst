'use client';

import { About } from '~/components/About';
import { Footer } from '~/components/Footer';
import { Hero } from '~/components/Hero';
import { LandingHeader } from '~/components/LandingHeader';
import { PrimaryFeatures } from '~/components/PrimaryFeatures';
import { SecondaryFeatures } from '~/components/SecondaryFeatures';

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <About />
      </main>
      <Footer />
    </>
  );
}
