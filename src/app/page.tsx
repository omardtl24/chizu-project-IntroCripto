// app/landing/page.tsx
"use client";

import {
  Hero,
  AboutEvent,
  OurStats,
  EventContent,
  Faq,
  Slider
} from '@/components/landing-components';

const Page: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutEvent />
      <OurStats />
      <EventContent />
      <Faq />
      {/* <SponsoredBy /> */}
      <Slider />
    </>
  );
};

export default Page;