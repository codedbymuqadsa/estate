import { Compass } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: 80, maxWidth: 760 }}>
      <EmptyState
        icon={Compass}
        title="This address doesn’t exist."
        text="The page you’re looking for may have moved or never existed. Let’s get you back to somewhere worth visiting."
        action={{ label: 'Explore Properties', href: '/properties' }}
        secondaryAction={{ label: 'Back to home', href: '/' }}
      />
    </div>
  );
}
