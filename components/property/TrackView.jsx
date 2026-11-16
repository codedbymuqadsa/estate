'use client';

import { useEffect } from 'react';
import { usePropertyContext } from '@/context/PropertyContext';

/** Records a property in the "recently viewed" list (localStorage) on mount. */
export default function TrackView({ propertyId }) {
  const { trackView } = usePropertyContext();
  useEffect(() => {
    trackView(propertyId);
  }, [propertyId, trackView]);
  return null;
}
