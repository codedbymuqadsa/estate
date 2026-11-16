import { img } from '@/lib/images';

export const CITIES = [
  { name: 'New York', slug: 'new-york', country: 'United States', image: img('nyc', 900), center: [40.7549, -73.984], blurb: 'Skyline views, pre-war icons and glass towers.' },
  { name: 'London', slug: 'london', country: 'United Kingdom', image: img('london', 900), center: [51.5136, -0.1365], blurb: 'Garden squares, mews houses and creative workspaces.' },
  { name: 'Dubai', slug: 'dubai', country: 'United Arab Emirates', image: img('dubai', 900), center: [25.1415, 55.2], blurb: 'Waterfront villas and sky-high penthouses.' },
  { name: 'Toronto', slug: 'toronto', country: 'Canada', image: img('toronto', 900), center: [43.6629, -79.37], blurb: 'Leafy neighbourhoods, lakeside living and loft conversions.' },
  { name: 'Los Angeles', slug: 'los-angeles', country: 'United States', image: img('la', 900), center: [34.04, -118.37], blurb: 'Hillside architecture, canyon light and coastal calm.' },
  { name: 'Lisbon', slug: 'lisbon', country: 'Portugal', image: img('lisbon', 900), center: [38.72, -9.15], blurb: 'Tiled facades, river light and walkable hills.' },
];

// Neighbourhood notes and nearby places are illustrative demo content.
// Distances are approximate walking / driving figures for demonstration only.
export const NEIGHBORHOODS = {
  'Upper East Side': {
    city: 'New York',
    coords: [40.7736, -73.9566],
    about: 'A refined residential district known for tree-lined streets, museums and quiet pre-war blocks.',
    nearby: [
      { name: 'Central Park', distance: '0.2 mi', kind: 'Park' },
      { name: 'Museum Mile', distance: '0.4 mi', kind: 'Culture' },
      { name: 'Lexington Ave subway', distance: '0.3 mi', kind: 'Transit' },
    ],
  },
  Midtown: {
    city: 'New York',
    coords: [40.7549, -73.984],
    about: 'The beating heart of Manhattan, with theatres, flagship retail and every major transit line within reach.',
    nearby: [
      { name: 'Bryant Park', distance: '0.3 mi', kind: 'Park' },
      { name: 'Grand Central Terminal', distance: '0.5 mi', kind: 'Transit' },
      { name: 'Broadway theatres', distance: '0.4 mi', kind: 'Culture' },
    ],
  },
  Chelsea: {
    city: 'New York',
    coords: [40.7465, -74.0014],
    about: 'Gallery-lined streets, converted warehouses and a lively waterfront promenade.',
    nearby: [
      { name: 'The High Line', distance: '0.2 mi', kind: 'Park' },
      { name: 'Chelsea Market', distance: '0.3 mi', kind: 'Dining' },
      { name: 'Hudson River Park', distance: '0.5 mi', kind: 'Park' },
    ],
  },
  Tribeca: {
    city: 'New York',
    coords: [40.7163, -74.0086],
    about: 'Cobblestone lanes, cast-iron lofts and understated downtown luxury.',
    nearby: [
      { name: 'Hudson River waterfront', distance: '0.3 mi', kind: 'Park' },
      { name: 'Tribeca Park', distance: '0.2 mi', kind: 'Park' },
      { name: 'Franklin St station', distance: '0.2 mi', kind: 'Transit' },
    ],
  },
  Kensington: {
    city: 'London',
    coords: [51.4994, -0.1938],
    about: 'Grand terraces, museums and the green expanse of Kensington Gardens on the doorstep.',
    nearby: [
      { name: 'Kensington Gardens', distance: '0.3 mi', kind: 'Park' },
      { name: 'Natural History Museum', distance: '0.6 mi', kind: 'Culture' },
      { name: 'High Street Kensington', distance: '0.2 mi', kind: 'Transit' },
    ],
  },
  Shoreditch: {
    city: 'London',
    coords: [51.5246, -0.078],
    about: 'London’s creative quarter, with converted warehouses, independent studios and late-night dining.',
    nearby: [
      { name: 'Columbia Road Flower Market', distance: '0.5 mi', kind: 'Market' },
      { name: 'Shoreditch High St station', distance: '0.2 mi', kind: 'Transit' },
      { name: 'Boxpark', distance: '0.3 mi', kind: 'Dining' },
    ],
  },
  'Notting Hill': {
    city: 'London',
    coords: [51.5094, -0.2],
    about: 'Pastel-coloured terraces, antique markets and quiet garden squares.',
    nearby: [
      { name: 'Portobello Road Market', distance: '0.2 mi', kind: 'Market' },
      { name: 'Holland Park', distance: '0.5 mi', kind: 'Park' },
      { name: 'Notting Hill Gate', distance: '0.4 mi', kind: 'Transit' },
    ],
  },
  Marylebone: {
    city: 'London',
    coords: [51.5205, -0.1547],
    about: 'A village atmosphere in central London, with boutique shops and a celebrated high street.',
    nearby: [
      { name: 'Regent’s Park', distance: '0.4 mi', kind: 'Park' },
      { name: 'Marylebone High Street', distance: '0.1 mi', kind: 'Dining' },
      { name: 'Baker Street station', distance: '0.3 mi', kind: 'Transit' },
    ],
  },
  Soho: {
    city: 'London',
    coords: [51.5136, -0.1365],
    about: 'Theatres, members’ clubs and some of the most walkable streets in the West End.',
    nearby: [
      { name: 'Covent Garden', distance: '0.4 mi', kind: 'Culture' },
      { name: 'Oxford Circus', distance: '0.3 mi', kind: 'Transit' },
      { name: 'Soho Square', distance: '0.1 mi', kind: 'Park' },
    ],
  },
  'Palm Jumeirah': {
    city: 'Dubai',
    coords: [25.1124, 55.139],
    about: 'An island community of beachfront villas, marinas and resort-style living.',
    nearby: [
      { name: 'Private beach access', distance: '0.1 mi', kind: 'Beach' },
      { name: 'The Pointe waterfront', distance: '2.1 mi', kind: 'Dining' },
      { name: 'Palm Monorail', distance: '1.2 mi', kind: 'Transit' },
    ],
  },
  'Downtown Dubai': {
    city: 'Dubai',
    coords: [25.1972, 55.2744],
    about: 'High-rise living beside the world’s tallest tower, fountains and flagship shopping.',
    nearby: [
      { name: 'Burj Khalifa', distance: '0.4 mi', kind: 'Landmark' },
      { name: 'Dubai Mall', distance: '0.5 mi', kind: 'Shopping' },
      { name: 'Burj Khalifa Metro', distance: '0.6 mi', kind: 'Transit' },
    ],
  },
  'Emirates Hills': {
    city: 'Dubai',
    coords: [25.0657, 55.1713],
    about: 'A gated enclave of large private residences overlooking lakes and fairways.',
    nearby: [
      { name: 'Montgomerie Golf Club', distance: '0.8 mi', kind: 'Leisure' },
      { name: 'Dubai Marina', distance: '3.5 mi', kind: 'Waterfront' },
      { name: 'Springs Souk', distance: '2.0 mi', kind: 'Shopping' },
    ],
  },
  'Dubai Marina': {
    city: 'Dubai',
    coords: [25.0805, 55.1403],
    about: 'A vibrant waterfront district of towers, yacht berths and promenade cafés.',
    nearby: [
      { name: 'Marina Walk', distance: '0.2 mi', kind: 'Dining' },
      { name: 'JBR Beach', distance: '0.7 mi', kind: 'Beach' },
      { name: 'Dubai Marina Tram', distance: '0.3 mi', kind: 'Transit' },
    ],
  },
  Yorkville: {
    city: 'Toronto',
    coords: [43.6709, -79.3933],
    about: 'Upmarket boutiques, galleries and polished residential towers in central Toronto.',
    nearby: [
      { name: 'Royal Ontario Museum', distance: '0.4 mi', kind: 'Culture' },
      { name: 'Yorkville Park', distance: '0.2 mi', kind: 'Park' },
      { name: 'Bay station', distance: '0.3 mi', kind: 'Transit' },
    ],
  },
  Rosedale: {
    city: 'Toronto',
    coords: [43.6796, -79.377],
    about: 'Winding ravine streets, mature trees and some of the city’s most coveted family homes.',
    nearby: [
      { name: 'Rosedale Valley Ravine', distance: '0.2 mi', kind: 'Park' },
      { name: 'Rosedale station', distance: '0.4 mi', kind: 'Transit' },
      { name: 'Summerhill Market', distance: '0.6 mi', kind: 'Shopping' },
    ],
  },
  'The Annex': {
    city: 'Toronto',
    coords: [43.67, -79.4046],
    about: 'Victorian brick homes, bookshops and a lively student-meets-professional mix.',
    nearby: [
      { name: 'Bloor Street shops', distance: '0.2 mi', kind: 'Shopping' },
      { name: 'University of Toronto', distance: '0.6 mi', kind: 'Education' },
      { name: 'Spadina station', distance: '0.3 mi', kind: 'Transit' },
    ],
  },
  'Liberty Village': {
    city: 'Toronto',
    coords: [43.6381, -79.4204],
    about: 'Industrial heritage reborn as lofts, studios and neighbourhood cafés.',
    nearby: [
      { name: 'Trinity Bellwoods Park', distance: '0.9 mi', kind: 'Park' },
      { name: 'Exhibition GO', distance: '0.5 mi', kind: 'Transit' },
      { name: 'King West restaurants', distance: '0.6 mi', kind: 'Dining' },
    ],
  },
  'The Beaches': {
    city: 'Toronto',
    coords: [43.6694, -79.2977],
    about: 'A calm lakeside neighbourhood on the eastern waterfront, popular for slower weekends.',
    nearby: [
      { name: 'Lakeshore boardwalk', distance: '0.2 mi', kind: 'Waterfront' },
      { name: 'Woodbine Beach', distance: '0.6 mi', kind: 'Beach' },
      { name: 'Queen Street East', distance: '0.8 mi', kind: 'Dining' },
    ],
  },
  'Beverly Hills': {
    city: 'Los Angeles',
    coords: [34.0736, -118.4004],
    about: 'Palm-lined avenues, landmark shopping and large private estates.',
    nearby: [
      { name: 'Rodeo Drive', distance: '0.8 mi', kind: 'Shopping' },
      { name: 'Beverly Gardens Park', distance: '0.5 mi', kind: 'Park' },
      { name: 'Greystone Mansion', distance: '1.2 mi', kind: 'Landmark' },
    ],
  },
  Venice: {
    city: 'Los Angeles',
    coords: [33.985, -118.4695],
    about: 'Canals, boardwalk energy and architect-designed homes a short stroll from the sand.',
    nearby: [
      { name: 'Venice Beach', distance: '0.5 mi', kind: 'Beach' },
      { name: 'Abbot Kinney Blvd', distance: '0.4 mi', kind: 'Shopping' },
      { name: 'Venice Canals', distance: '0.3 mi', kind: 'Landmark' },
    ],
  },
  'Silver Lake': {
    city: 'Los Angeles',
    coords: [34.0869, -118.2702],
    about: 'Hillside modernism, a reservoir loop and an independent café scene.',
    nearby: [
      { name: 'Silver Lake Reservoir', distance: '0.3 mi', kind: 'Park' },
      { name: 'Sunset Junction', distance: '0.6 mi', kind: 'Dining' },
      { name: 'Griffith Park', distance: '2.0 mi', kind: 'Park' },
    ],
  },
  'Hollywood Hills': {
    city: 'Los Angeles',
    coords: [34.1184, -118.3004],
    about: 'Canyon roads, city-grid views and sculptural homes tucked into the hillside.',
    nearby: [
      { name: 'Runyon Canyon Park', distance: '0.8 mi', kind: 'Park' },
      { name: 'Griffith Observatory', distance: '2.4 mi', kind: 'Landmark' },
      { name: 'Sunset Strip', distance: '1.6 mi', kind: 'Dining' },
    ],
  },
  Chiado: {
    city: 'Lisbon',
    coords: [38.71, -9.142],
    about: 'Historic bookshops, theatres and viewpoints in the centre of Lisbon.',
    nearby: [
      { name: 'Praça Luís de Camões', distance: '0.1 mi', kind: 'Landmark' },
      { name: 'Baixa-Chiado Metro', distance: '0.2 mi', kind: 'Transit' },
      { name: 'Time Out Market', distance: '0.5 mi', kind: 'Dining' },
    ],
  },
  Alfama: {
    city: 'Lisbon',
    coords: [38.711, -9.13],
    about: 'Winding medieval lanes, fado houses and sweeping river views.',
    nearby: [
      { name: 'São Jorge Castle', distance: '0.3 mi', kind: 'Landmark' },
      { name: 'Miradouro das Portas do Sol', distance: '0.2 mi', kind: 'Viewpoint' },
      { name: 'Lisbon Cathedral', distance: '0.3 mi', kind: 'Landmark' },
    ],
  },
  'Príncipe Real': {
    city: 'Lisbon',
    coords: [38.716, -9.15],
    about: 'Elegant garden squares, concept stores and 19th-century palaces turned into homes.',
    nearby: [
      { name: 'Jardim do Príncipe Real', distance: '0.1 mi', kind: 'Park' },
      { name: 'Botanical Garden', distance: '0.3 mi', kind: 'Park' },
      { name: 'Bairro Alto', distance: '0.4 mi', kind: 'Dining' },
    ],
  },
  Belém: {
    city: 'Lisbon',
    coords: [38.697, -9.206],
    about: 'Riverside promenades, monuments and calm, spacious streets west of the centre.',
    nearby: [
      { name: 'Belém Tower', distance: '0.5 mi', kind: 'Landmark' },
      { name: 'Jerónimos Monastery', distance: '0.6 mi', kind: 'Landmark' },
      { name: 'Tagus riverfront', distance: '0.2 mi', kind: 'Waterfront' },
    ],
  },
};

export function getNeighborhoodsByCity(city) {
  return Object.entries(NEIGHBORHOODS)
    .filter(([, v]) => v.city === city)
    .map(([name]) => name);
}
