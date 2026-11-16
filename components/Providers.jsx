'use client';

import { UIProvider } from '@/context/UIContext';
import { PropertyProvider } from '@/context/PropertyContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ComparisonProvider } from '@/context/ComparisonContext';

export default function Providers({ children }) {
  return (
    <UIProvider>
      <PropertyProvider>
        <WishlistProvider>
          <ComparisonProvider>{children}</ComparisonProvider>
        </WishlistProvider>
      </PropertyProvider>
    </UIProvider>
  );
}
