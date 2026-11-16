import { img } from '@/lib/images';
import { slugify } from '@/lib/formatters';
import { NEIGHBORHOODS } from '@/data/locations';

// All listings are fictional and for demonstration only.
// Prices are shown in USD. Rental and commercial-lease prices are monthly.

const IMAGE_LABELS = {
  ext: 'Exterior view',
  bld: 'Building exterior',
  land: 'The site',
  liv: 'Living space',
  kit: 'Kitchen',
  bed: 'Bedroom',
  bath: 'Bathroom',
  off: 'Workspace',
};

const labelFor = (key) => IMAGE_LABELS[key.replace(/\d+$/, '')] || 'Interior';

const RAW = [
  {
    id: 'p01', title: 'The Azure Residence', subtype: 'Luxury Villa', listingType: 'buy', propertyType: 'villa',
    city: 'Dubai', hood: 'Palm Jumeirah', address: '14 Frond K, Palm Jumeirah', price: 6850000,
    beds: 5, baths: 6, area: 7200, year: 2021, parking: 3, furnishing: 'Semi-furnished',
    amenities: ['pool', 'garden', 'parking', 'security', 'gym'], images: ['ext3', 'ext4', 'liv6', 'kit20', 'bed22', 'bath64'],
    agentId: 'a4', featured: true, dateAdded: '2026-10-28',
    overview: 'A sunlit waterfront villa with a lap pool, wide terraces and uninterrupted sea breezes, designed for relaxed indoor-outdoor living.',
    features: ['Private pool and sun terrace', 'Double-height living room', 'Staff quarters and a separate study', 'Direct beach-side walkway'],
  },
  {
    id: 'p02', title: 'Central Park Penthouse', subtype: 'Penthouse', listingType: 'buy', propertyType: 'penthouse',
    city: 'New York', hood: 'Upper East Side', address: '1010 Fifth Avenue, PH', price: 8400000,
    beds: 4, baths: 4, area: 3900, year: 2016, parking: 1, furnishing: 'Unfurnished',
    amenities: ['balcony', 'security', 'gym', 'parking', 'pets'], images: ['liv65', 'liv74', 'bed80', 'bath85', 'kit21'],
    agentId: 'a1', featured: true, dateAdded: '2026-11-02',
    overview: 'A full-floor penthouse with a wraparound terrace and park views from every principal room, finished with quiet, modern restraint.',
    features: ['Wraparound private terrace', 'Floor-to-ceiling park views', 'Chef’s kitchen with a breakfast counter', 'Doorman and concierge building'],
  },
  {
    id: 'p03', title: 'The Willow House', subtype: 'Family House', listingType: 'buy', propertyType: 'house',
    city: 'Toronto', hood: 'Rosedale', address: '28 Willow Crescent', price: 2350000,
    beds: 4, baths: 3, area: 3100, year: 1998, parking: 2, furnishing: 'Unfurnished',
    amenities: ['garden', 'parking', 'pets'], images: ['ext24', 'ext30', 'liv9', 'kit37', 'bed71'],
    agentId: 'a6', featured: false, dateAdded: '2026-09-14',
    overview: 'A welcoming porch-front family home on a quiet crescent, with generous rooms, a deep garden and a finished lower level.',
    features: ['Wraparound front porch', 'Deep, south-facing back garden', 'Finished lower-level recreation room', 'Two-car garage'],
  },
  {
    id: 'p04', title: 'Skyline Apartments', subtype: 'Apartment', listingType: 'rent', propertyType: 'apartment',
    city: 'New York', hood: 'Midtown', address: '350 W 42nd Street, Unit 31C', price: 5800, priceUnit: 'month',
    beds: 2, baths: 2, area: 1150, year: 2019, parking: 0, furnishing: 'Furnished',
    amenities: ['gym', 'security', 'balcony', 'furnished', 'pets'], images: ['bld18', 'liv19', 'kit20', 'bed22'],
    agentId: 'a2', featured: false, dateAdded: '2026-10-19',
    overview: 'A bright corner apartment high in a modern tower, fully furnished and ready to move into, close to every major subway line.',
    features: ['Corner unit with skyline views', 'Furnished by an interior designer', 'Residents’ gym and lounge', 'In-unit laundry'],
  },
  {
    id: 'p05', title: 'The Glass Pavilion', subtype: 'Contemporary Villa', listingType: 'buy', propertyType: 'villa',
    city: 'Los Angeles', hood: 'Hollywood Hills', address: '7720 Mulholland Terrace', price: 4950000,
    beds: 4, baths: 5, area: 4300, year: 2020, parking: 3, furnishing: 'Unfurnished',
    amenities: ['pool', 'garden', 'parking', 'security'], images: ['ext5', 'ext12', 'liv66', 'kit76', 'bed63', 'bath84'],
    agentId: 'a7', featured: true, dateAdded: '2026-10-05',
    overview: 'An architect-designed glass pavilion cantilevered over the canyon, with a pool terrace that feels suspended above the city.',
    features: ['Floor-to-ceiling glazing', 'Cantilevered infinity pool', 'Detached guest studio', 'Smart-home lighting and climate control'],
  },
  {
    id: 'p06', title: 'Harbor View Residence', subtype: 'Apartment', listingType: 'buy', propertyType: 'apartment',
    city: 'Lisbon', hood: 'Alfama', address: 'Rua da Alfândega 42, 4º', price: 890000,
    beds: 3, baths: 2, area: 1480, year: 2012, parking: 1, furnishing: 'Semi-furnished',
    amenities: ['balcony', 'parking'], images: ['bld72', 'liv17', 'liv14', 'kit21', 'bed86'],
    agentId: 'a8', featured: false, dateAdded: '2026-08-22',
    overview: 'A calm top-floor apartment above the rooftops of Alfama, with river glimpses from the balcony and a layout made for entertaining.',
    features: ['River-view balcony', 'Original tiled hallway', 'Lift access and private parking', 'Walking distance to the castle'],
  },
  {
    id: 'p07', title: 'The Modern Courtyard', subtype: 'Contemporary House', listingType: 'buy', propertyType: 'house',
    city: 'London', hood: 'Notting Hill', address: '9 Elgin Mews', price: 3900000,
    beds: 4, baths: 3, area: 2850, year: 2015, parking: 1, furnishing: 'Unfurnished',
    amenities: ['garden', 'pets', 'parking'], images: ['ext10', 'ext13', 'liv11', 'liv36', 'bed77'],
    agentId: 'a3', featured: false, dateAdded: '2026-09-30',
    overview: 'A timber-clad mews house arranged around a private courtyard, bringing daylight and calm to the centre of Notting Hill.',
    features: ['Private courtyard garden', 'Warm timber and brick palette', 'Open-plan kitchen and dining', 'Roof terrace'],
  },
  {
    id: 'p08', title: 'The Grand Estate', subtype: 'Luxury Villa', listingType: 'buy', propertyType: 'villa',
    city: 'Dubai', hood: 'Emirates Hills', address: '61 Sector E, Emirates Hills', price: 12500000,
    beds: 7, baths: 9, area: 14500, year: 2018, parking: 6, furnishing: 'Semi-furnished',
    amenities: ['pool', 'gym', 'garden', 'parking', 'security', 'pets'], images: ['ext28', 'ext7', 'liv83', 'kit37', 'bed80', 'bath84'],
    agentId: 'a4', featured: true, dateAdded: '2026-09-02',
    overview: 'A landmark residence on a corner plot overlooking the fairway, with formal and informal living, a spa wing and a resort-scale pool.',
    features: ['Resort-style pool and cabana', 'Private spa and gym wing', 'Cinema room and library', 'Six-car garage'],
  },
  {
    id: 'p09', title: 'Urban Loft 24', subtype: 'Loft Apartment', listingType: 'rent', propertyType: 'apartment',
    city: 'New York', hood: 'Chelsea', address: '24 W 25th Street, Loft 5', price: 7200, priceUnit: 'month',
    beds: 1, baths: 1, area: 1050, year: 1925, parking: 0, furnishing: 'Furnished',
    amenities: ['furnished', 'pets', 'security'], images: ['liv35', 'liv38', 'kit21', 'bed81'],
    agentId: 'a1', featured: false, dateAdded: '2026-10-11',
    overview: 'A converted warehouse loft with exposed brick, soaring ceilings and big factory windows, a few steps from the High Line.',
    features: ['12-foot ceilings and exposed brick', 'Oversized factory windows', 'Open studio-style living', 'Pet-friendly building'],
  },
  {
    id: 'p10', title: 'The Palm Residence', subtype: 'Villa', listingType: 'buy', propertyType: 'villa',
    city: 'Los Angeles', hood: 'Venice', address: '512 Palm Avenue', price: 3150000,
    beds: 3, baths: 3, area: 2600, year: 2014, parking: 2, furnishing: 'Unfurnished',
    amenities: ['pool', 'garden', 'parking'], images: ['ext29', 'ext23', 'liv33', 'kit76', 'bed86'],
    agentId: 'a7', featured: true, dateAdded: '2026-10-21',
    overview: 'A palm-shaded bungalow-style home a short walk from the boardwalk, with a plunge pool and an outdoor kitchen.',
    features: ['Plunge pool and outdoor kitchen', 'Mature palm landscaping', 'Skylit primary suite', 'Walk to Abbot Kinney'],
  },
  {
    id: 'p11', title: 'The Brick House', subtype: 'Residential House', listingType: 'buy', propertyType: 'house',
    city: 'London', hood: 'Shoreditch', address: '17 Chance Street', price: 1780000,
    beds: 3, baths: 2, area: 1900, year: 1890, parking: 0, furnishing: 'Unfurnished',
    amenities: ['garden', 'pets'], images: ['ext27', 'liv15', 'kit37', 'bed22'],
    agentId: 'a3', featured: false, dateAdded: '2026-08-12',
    overview: 'A characterful Victorian brick house sensitively updated, with a walled garden and original fireplaces throughout.',
    features: ['Original period fireplaces', 'Walled rear garden', 'Newly fitted kitchen', 'Moments from Shoreditch High Street'],
  },
  {
    id: 'p12', title: 'Crescent Heights', subtype: 'Apartment', listingType: 'rent', propertyType: 'apartment',
    city: 'Toronto', hood: 'Yorkville', address: '88 Cumberland Street, Unit 1204', price: 3400, priceUnit: 'month',
    beds: 2, baths: 2, area: 1020, year: 2017, parking: 1, furnishing: 'Unfurnished',
    amenities: ['gym', 'security', 'balcony', 'parking'], images: ['liv34', 'liv16', 'kit76', 'bed63'],
    agentId: 'a6', featured: false, dateAdded: '2026-10-08',
    overview: 'A well-planned two-bedroom apartment in the heart of Yorkville, with a sunny balcony and a parking space included.',
    features: ['South-facing balcony', 'Parking space included', 'Gym and rooftop terrace', 'Steps to Bay station'],
  },
  {
    id: 'p13', title: 'The Garden Villa', subtype: 'Luxury Villa', listingType: 'buy', propertyType: 'villa',
    city: 'Lisbon', hood: 'Príncipe Real', address: 'Rua da Escola Politécnica 61', price: 2200000,
    beds: 4, baths: 4, area: 3300, year: 1905, parking: 2, furnishing: 'Semi-furnished',
    amenities: ['garden', 'pool', 'parking'], images: ['ext2', 'liv79', 'kit37', 'bed71', 'bath85'],
    agentId: 'a8', featured: true, dateAdded: '2026-09-18',
    overview: 'A restored 1905 villa with a walled garden, tiled facade and a hidden pool, just steps from the Príncipe Real square.',
    features: ['Walled garden with pool', 'Restored azulejo facade', 'High ceilings and stucco detail', 'Secure private parking'],
  },
  {
    id: 'p14', title: 'West End Office', subtype: 'Commercial Office', listingType: 'commercial', propertyType: 'office',
    city: 'London', hood: 'Soho', address: '33 Dean Street, 3rd Floor', price: 18500, priceUnit: 'month',
    beds: 0, baths: 3, area: 4200, year: 2008, parking: 0, furnishing: 'Unfurnished',
    amenities: ['security', 'gym'], images: ['off39', 'off40', 'off41', 'off42'],
    agentId: 'a3', featured: false, dateAdded: '2026-09-25',
    overview: 'A flexible third-floor workspace in the middle of Soho, with a light-filled open floor, meeting rooms and a shared roof terrace.',
    features: ['Open floor for 40–50 desks', 'Three meeting rooms', 'Shared roof terrace', 'Showers and cycle storage'],
  },
  {
    id: 'p15', title: 'The Horizon Penthouse', subtype: 'Penthouse', listingType: 'buy', propertyType: 'penthouse',
    city: 'Dubai', hood: 'Downtown Dubai', address: 'Boulevard Heights, PH 62', price: 5600000,
    beds: 4, baths: 5, area: 4800, year: 2019, parking: 3, furnishing: 'Furnished',
    amenities: ['pool', 'gym', 'security', 'balcony', 'furnished', 'parking'], images: ['liv74', 'liv70', 'bed80', 'bath84', 'kit20'],
    agentId: 'a5', featured: true, dateAdded: '2026-11-06',
    overview: 'A sky-high penthouse with a private plunge pool, curated furnishings and a view across the entire downtown skyline.',
    features: ['Private plunge pool terrace', 'Fully furnished by designer', 'Concierge and valet service', 'Direct lift access'],
  },
  {
    id: 'p16', title: 'Oakwood Residence', subtype: 'Family House', listingType: 'buy', propertyType: 'house',
    city: 'Toronto', hood: 'The Annex', address: '41 Oakwood Place', price: 1495000,
    beds: 4, baths: 3, area: 2400, year: 1928, parking: 1, furnishing: 'Unfurnished',
    amenities: ['garden', 'parking', 'pets'], images: ['ext26', 'liv78', 'kit20', 'bed77'],
    agentId: 'a6', featured: false, dateAdded: '2026-08-30',
    overview: 'A classic 1920s house with deep porch, wood floors and an updated kitchen, set on a leafy street in The Annex.',
    features: ['Original oak flooring', 'Updated chef’s kitchen', 'Rear deck and garden', 'Garage with laneway access'],
  },
  {
    id: 'p17', title: 'The Coastal House', subtype: 'Villa', listingType: 'buy', propertyType: 'villa',
    city: 'Lisbon', hood: 'Belém', address: 'Rua Bartolomeu Dias 18', price: 1950000,
    beds: 4, baths: 3, area: 3000, year: 2017, parking: 2, furnishing: 'Semi-furnished',
    amenities: ['pool', 'garden', 'parking', 'balcony'], images: ['ext1', 'liv33', 'kit21', 'bed63', 'bath84'],
    agentId: 'a8', featured: false, dateAdded: '2026-10-14',
    overview: 'A bright white villa near the river, with a heated pool, terraces on two levels and a short walk to Belém’s waterfront.',
    features: ['Heated pool', 'Terraces on two levels', 'Open-plan living with river light', 'Near the Tagus promenade'],
  },
  {
    id: 'p18', title: 'Midtown Studio', subtype: 'Studio Apartment', listingType: 'rent', propertyType: 'apartment',
    city: 'New York', hood: 'Midtown', address: '215 W 38th Street, Unit 9F', price: 3200, priceUnit: 'month',
    beds: 0, baths: 1, area: 480, year: 2014, parking: 0, furnishing: 'Furnished',
    amenities: ['gym', 'security', 'furnished'], images: ['liv16', 'kit21', 'bed22'],
    agentId: 'a2', featured: false, dateAdded: '2026-11-09',
    overview: 'A smart, efficient studio with built-in storage and a full-size kitchen, ideal for a city base close to everything.',
    features: ['Space-saving built-in storage', 'Full-size kitchen', 'Fitness room access', 'Six minutes to Times Square'],
  },
  {
    id: 'p19', title: 'The Parkside Residence', subtype: 'Apartment', listingType: 'buy', propertyType: 'apartment',
    city: 'Toronto', hood: 'Liberty Village', address: '60 Pearl Street, Unit 708', price: 765000,
    beds: 2, baths: 2, area: 1180, year: 2016, parking: 1, furnishing: 'Unfurnished',
    amenities: ['gym', 'balcony', 'security', 'parking'], images: ['liv19', 'liv38', 'kit37', 'bed81'],
    agentId: 'a6', featured: false, dateAdded: '2026-09-08',
    overview: 'A bright two-bedroom with park views and a split-bedroom plan, in a well-managed building close to the lakefront.',
    features: ['Park-facing balcony', 'Split-bedroom layout', 'Locker and parking included', 'Concierge building'],
  },
  {
    id: 'p20', title: 'The White House', subtype: 'Modern House', listingType: 'buy', propertyType: 'house',
    city: 'Los Angeles', hood: 'Silver Lake', address: '2210 Reservoir Lane', price: 2680000,
    beds: 3, baths: 3, area: 2450, year: 2018, parking: 2, furnishing: 'Unfurnished',
    amenities: ['garden', 'parking', 'pets'], images: ['ext31', 'liv6', 'kit76', 'bed80'],
    agentId: 'a7', featured: false, dateAdded: '2026-10-02',
    overview: 'A crisp white modernist home on a hillside lot, framing views toward the reservoir with a calm, gallery-like interior.',
    features: ['Gallery-style interior', 'Hillside terrace with reservoir views', 'Solar and battery storage', 'EV charger in the garage'],
  },
  {
    id: 'p21', title: 'The Atrium Residence', subtype: 'Villa', listingType: 'buy', propertyType: 'villa',
    city: 'Dubai', hood: 'Palm Jumeirah', address: '9 Frond N, Palm Jumeirah', price: 4300000,
    beds: 5, baths: 5, area: 5600, year: 2017, parking: 3, furnishing: 'Unfurnished',
    amenities: ['pool', 'garden', 'parking', 'security'], images: ['ext68', 'liv66', 'kit20', 'bed86', 'bath64'],
    agentId: 'a5', featured: false, dateAdded: '2026-09-27',
    overview: 'A two-storey villa wrapped around a central atrium, with an unobstructed pool terrace and a private beach footpath.',
    features: ['Central daylit atrium', 'Pool terrace with outdoor dining', 'Maid’s room and driver’s room', 'Private footpath to the beach'],
  },
  {
    id: 'p22', title: 'The Urban Workspace', subtype: 'Commercial Office', listingType: 'commercial', propertyType: 'office',
    city: 'New York', hood: 'Tribeca', address: '80 Franklin Street, Floor 4', price: 24000, priceUnit: 'month',
    beds: 0, baths: 4, area: 6200, year: 1915, parking: 0, furnishing: 'Furnished',
    amenities: ['security', 'furnished'], images: ['off43', 'off44', 'off40', 'off39'],
    agentId: 'a1', featured: false, dateAdded: '2026-10-25',
    overview: 'A character-filled loft office in a restored cast-iron building, already furnished and ready for a creative or technology team.',
    features: ['Fully furnished open plan', 'Original timber columns', 'Kitchen and event space', 'Direct elevator access'],
  },
  {
    id: 'p23', title: 'The Lake House', subtype: 'Luxury House', listingType: 'buy', propertyType: 'house',
    city: 'Toronto', hood: 'The Beaches', address: '3 Lakeshore Boardwalk Road', price: 3650000,
    beds: 5, baths: 4, area: 4100, year: 2005, parking: 3, furnishing: 'Unfurnished',
    amenities: ['garden', 'parking', 'pets', 'security'], images: ['ext32', 'ext25', 'liv9', 'kit37', 'bed71'],
    agentId: 'a6', featured: true, dateAdded: '2026-10-30',
    overview: 'A timber-framed lodge-style home just off the lakefront, with wide decks, a stone fireplace and a long lawn.',
    features: ['Stone fireplace and vaulted ceiling', 'Wide decks facing the lake', 'Long private lawn', 'Boardwalk access nearby'],
  },
  {
    id: 'p24', title: 'The Courtyard Apartments', subtype: 'Apartment', listingType: 'buy', propertyType: 'apartment',
    city: 'Lisbon', hood: 'Chiado', address: 'Rua Garrett 76, 2º Esq', price: 640000,
    beds: 2, baths: 1, area: 960, year: 1930, parking: 0, furnishing: 'Semi-furnished',
    amenities: ['balcony'], images: ['liv14', 'liv17', 'kit21', 'bed71'],
    agentId: 'a8', featured: false, dateAdded: '2026-08-05',
    overview: 'A renovated 1930s apartment overlooking a quiet inner courtyard, with restored floors and a modern kitchen in the heart of Chiado.',
    features: ['Quiet inner-courtyard outlook', 'Restored timber floors', 'Modern fitted kitchen', 'Moments from Baixa-Chiado Metro'],
  },
  {
    id: 'p25', title: 'The Summit Parcel', subtype: 'Residential Land', listingType: 'buy', propertyType: 'land',
    city: 'Los Angeles', hood: 'Hollywood Hills', address: 'Lot 14, Wonderland Park Road', price: 1250000,
    beds: 0, baths: 0, area: 21780, year: null, parking: 0, furnishing: 'Unfurnished',
    amenities: ['security'], images: ['land67', 'ext25'],
    agentId: 'a7', featured: false, dateAdded: '2026-08-18',
    overview: 'A half-acre hillside parcel with plans for a canyon-facing home, long views and utilities already available at the street.',
    features: ['0.5 acre hillside parcel', 'Canyon and city-grid views', 'Utilities at the street', 'Preliminary design concepts available'],
  },
  {
    id: 'p26', title: 'Rowhouse Lane', subtype: 'Townhouse', listingType: 'buy', propertyType: 'townhouse',
    city: 'Toronto', hood: 'The Annex', address: '12 Rowhouse Lane', price: 1120000,
    beds: 3, baths: 3, area: 1850, year: 2020, parking: 1, furnishing: 'Unfurnished',
    amenities: ['parking', 'balcony', 'pets', 'security'], images: ['bld73', 'liv78', 'kit76', 'bed77'],
    agentId: 'a6', featured: false, dateAdded: '2026-11-11',
    overview: 'A new-build townhouse with a rooftop terrace, a built-in garage and a layout that works equally well for families and professionals.',
    features: ['Rooftop terrace', 'Built-in garage', 'Open-plan main floor', 'Quiet laneway setting'],
  },
];

function buildInterior(p) {
  if (p.propertyType === 'land') return 'This is an unbuilt site. Surveys, soil reports and preliminary design concepts can be requested from the listing agent.';
  if (p.propertyType === 'office') {
    return `A ${p.furnishing.toLowerCase()} floor plate of ${new Intl.NumberFormat('en-US').format(p.area)} sq ft with flexible zones for desks, meeting rooms and breakout space. Natural light reaches most of the floor and there are ${p.baths} washrooms.`;
  }
  const bedText = p.beds === 0 ? 'an efficient studio layout' : `${p.beds} bedroom${p.beds > 1 ? 's' : ''}`;
  return `Inside, the home offers ${bedText} and ${p.baths} bathroom${p.baths > 1 ? 's' : ''} across ${new Intl.NumberFormat('en-US').format(p.area)} sq ft. Living areas are bright and open, finishes are modern and the property is offered ${p.furnishing.toLowerCase()}.`;
}

function buildExterior(p) {
  const has = (a) => p.amenities.includes(a);
  if (p.propertyType === 'land') return 'The parcel is gently sloped with mature native planting and a straightforward approach from the road.';
  if (p.propertyType === 'office') return `The building is secure and well maintained${has('gym') ? ', with shower and fitness facilities' : ''}. Public transport is a short walk away.`;
  const bits = [];
  if (has('pool')) bits.push('a swimming pool');
  if (has('garden')) bits.push('landscaped outdoor space');
  if (has('balcony')) bits.push('a private balcony or terrace');
  if (p.parking) bits.push(`${p.parking} parking space${p.parking > 1 ? 's' : ''}`);
  return bits.length
    ? `Outside, the property includes ${bits.join(', ').replace(/, ([^,]*)$/, ' and $1')}.`
    : 'The property is part of a well-kept building with shared common areas.';
}

export const PROPERTIES = RAW.map((p) => {
  const hood = NEIGHBORHOODS[p.hood];
  // Deterministic offset so listings in one neighbourhood don't stack on one point.
  const seed = parseInt(p.id.slice(1), 10);
  const latOffset = (((seed * 37) % 100) - 50) / 12000;
  const lngOffset = (((seed * 53) % 100) - 50) / 12000;
  return {
    ...p,
    slug: slugify(p.title),
    currency: 'USD',
    priceUnit: p.priceUnit || null,
    neighborhood: p.hood,
    bedrooms: p.beds,
    bathrooms: p.baths,
    yearBuilt: p.year,
    parkingSpaces: p.parking,
    latitude: Number((hood.coords[0] + latOffset).toFixed(5)),
    longitude: Number((hood.coords[1] + lngOffset).toFixed(5)),
    images: p.images.map((key, i) => ({
      src: img(key, 1600),
      thumb: img(key, 400),
      alt: `${p.title} — ${labelFor(key)}`,
      key,
      index: i,
    })),
    description: {
      overview: p.overview,
      keyFeatures: p.features,
      interior: buildInterior(p),
      exterior: buildExterior(p),
      neighborhood: hood.about,
    },
    nearby: hood.nearby,
  };
});

export function getPropertyBySlug(slug) {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getPropertyById(id) {
  return PROPERTIES.find((p) => p.id === id);
}

export function getPropertiesByAgent(agentId) {
  return PROPERTIES.filter((p) => p.agentId === agentId);
}

export function getSimilarProperties(property, limit = 3) {
  return PROPERTIES.filter((p) => p.id !== property.id)
    .map((p) => {
      let score = 0;
      if (p.city === property.city) score += 3;
      if (p.propertyType === property.propertyType) score += 3;
      if (p.listingType === property.listingType) score += 2;
      const ratio = Math.min(p.price, property.price) / Math.max(p.price, property.price);
      score += ratio * 2;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
