import { Building, Car, Dumbbell, PawPrint, ShieldCheck, Sofa, Trees, Waves } from 'lucide-react';
import { AMENITIES } from './constants';

const ICONS = { Car, Waves, Trees, Dumbbell, Building, ShieldCheck, Sofa, PawPrint };

export function getAmenity(value) {
  const found = AMENITIES.find((a) => a.value === value);
  return found ? { ...found, Icon: ICONS[found.icon] || Building } : null;
}
