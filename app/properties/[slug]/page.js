import { notFound } from 'next/navigation';
import { PROPERTIES, getPropertyBySlug } from '@/data/properties';
import { AGENTS } from '@/data/agents';
import { formatPrice } from '@/lib/formatters';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertySidebar from '@/components/property/PropertySidebar';
import SimilarProperties from '@/components/property/SimilarProperties';
import TrackView from '@/components/property/TrackView';
import styles from './page.module.scss';

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const property = getPropertyBySlug(params.slug);
  if (!property) return { title: 'Property not found' };
  const description = `${property.title} — ${property.subtype} in ${property.neighborhood}, ${property.city}. ${formatPrice(property)}. ${property.description.overview}`;
  return {
    title: property.title,
    description,
    openGraph: {
      title: `${property.title} | ESTATE`,
      description,
      type: 'website',
      images: [{ url: property.images[0].src, alt: property.images[0].alt }],
    },
  };
}

export default function PropertyPage({ params }) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();
  const agent = AGENTS.find((a) => a.id === property.agentId);

  return (
    <>
      <TrackView propertyId={property.id} />
      <div className="container">
        <div className={styles.crumbs}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Properties', href: '/properties' },
              { label: property.title },
            ]}
          />
        </div>
        <PropertyHeader property={property} />
        <div className={styles.layout}>
          <div className={styles.content}>
            <PropertyGallery images={property.images} title={property.title} />
            <PropertyDetails property={property} />
          </div>
          <PropertySidebar property={property} agent={agent} />
        </div>
      </div>
      <SimilarProperties property={property} />
    </>
  );
}
