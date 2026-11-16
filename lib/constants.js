export const SITE = {
  name: 'ESTATE',
  tagline: 'Find a Place. Discover a Lifestyle.',
  description:
    'ESTATE is a premium property discovery platform. Explore homes, compare listings, save favourites and arrange visits. This is a frontend demo with fictional listings.',
  email: 'hello@estate.example',
  phone: '+1 (555) 010-2040',
  address: '240 Meridian Avenue, Suite 12, New York, NY 10011',
};

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Explore Properties' },
  { href: '/map', label: 'Map' },
  { href: '/agents', label: 'Agents' },
  { href: '/about', label: 'About' },
];

export const LISTING_TYPES = [
  { value: 'buy', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
  { value: 'commercial', label: 'Commercial' },
];

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment', plural: 'Apartments' },
  { value: 'house', label: 'House', plural: 'Houses' },
  { value: 'villa', label: 'Villa', plural: 'Villas' },
  { value: 'penthouse', label: 'Penthouse', plural: 'Penthouses' },
  { value: 'townhouse', label: 'Townhouse', plural: 'Townhouses' },
  { value: 'office', label: 'Office', plural: 'Offices' },
  { value: 'land', label: 'Land', plural: 'Land' },
];

export const AMENITIES = [
  { value: 'parking', label: 'Parking', icon: 'Car' },
  { value: 'pool', label: 'Swimming Pool', icon: 'Waves' },
  { value: 'garden', label: 'Garden', icon: 'Trees' },
  { value: 'gym', label: 'Gym', icon: 'Dumbbell' },
  { value: 'balcony', label: 'Balcony', icon: 'Building' },
  { value: 'security', label: 'Security', icon: 'ShieldCheck' },
  { value: 'furnished', label: 'Furnished', icon: 'Sofa' },
  { value: 'pets', label: 'Pet Friendly', icon: 'PawPrint' },
];

export const BEDROOM_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
];

export const BATHROOM_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
];

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'area-desc', label: 'Largest Area' },
];

export const TIME_SLOTS = ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

export const COMPARE_LIMIT = 4;
export const PAGE_SIZE = 9;

export const STORAGE_KEYS = {
  wishlist: 'estate:wishlist',
  compare: 'estate:compare',
  recent: 'estate:recent',
  inquiries: 'estate:inquiries',
  visits: 'estate:visits',
  profile: 'estate:profile',
  contact: 'estate:contact-messages',
  newsletter: 'estate:newsletter',
};

export const PRICE_PRESETS = {
  buy: [
    { label: 'Any price', min: '', max: '' },
    { label: 'Under $500K', min: '', max: '500000' },
    { label: '$500K – $1M', min: '500000', max: '1000000' },
    { label: '$1M – $2.5M', min: '1000000', max: '2500000' },
    { label: '$2.5M – $5M', min: '2500000', max: '5000000' },
    { label: '$5M+', min: '5000000', max: '' },
  ],
  rent: [
    { label: 'Any price', min: '', max: '' },
    { label: 'Under $3K / mo', min: '', max: '3000' },
    { label: '$3K – $6K / mo', min: '3000', max: '6000' },
    { label: '$6K – $12K / mo', min: '6000', max: '12000' },
    { label: '$12K+ / mo', min: '12000', max: '' },
  ],
  commercial: [
    { label: 'Any price', min: '', max: '' },
    { label: 'Under $10K / mo', min: '', max: '10000' },
    { label: '$10K+ / mo', min: '10000', max: '' },
  ],
};
