import Hero from '@/components/home/Hero';
import FeaturedLocations from '@/components/home/FeaturedLocations';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import WhyEstate from '@/components/home/WhyEstate';
import PropertyCategories from '@/components/home/PropertyCategories';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturedAgents from '@/components/home/FeaturedAgents';
import Testimonials from '@/components/home/Testimonials';
import FinalCTA from '@/components/home/FinalCTA';
import { TESTIMONIALS } from '@/data/testimonials';

export const metadata = {
  title: { absolute: 'ESTATE — Find a Place. Discover a Lifestyle.' },
  description:
    'Explore exceptional homes, discover inspiring spaces and find a property that feels like yours. A premium real estate discovery demo.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedLocations />
      <FeaturedProperties />
      <WhyEstate />
      <PropertyCategories />
      <HowItWorks />
      <FeaturedAgents />
      <Testimonials items={TESTIMONIALS} />
      <FinalCTA />
    </>
  );
}
