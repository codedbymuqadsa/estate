import MapExplorer from '@/components/property/MapExplorer';

export const metadata = {
  title: 'Map Search',
  description: 'Explore ESTATE’s demo listings on an interactive map. Click a marker to preview a property.',
};

export default function MapPage() {
  return (
    <>
      <h1 className="visually-hidden">Property map</h1>
      <MapExplorer />
    </>
  );
}
