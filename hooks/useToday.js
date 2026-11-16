'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

/** Today's date as yyyy-MM-dd. Empty string until mounted, so server and client markup match. */
export function useToday() {
  const [today, setToday] = useState('');
  useEffect(() => setToday(format(new Date(), 'yyyy-MM-dd')), []);
  return today;
}
