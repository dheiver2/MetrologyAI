'use client';

// app/page.tsx
import dynamic from 'next/dynamic';

const MetrologyAnalytics = dynamic(
  () => import('@/components/MetrologyAnalytics'),
  {
    ssr: false,
  }
);

export default function Home() {
  return <MetrologyAnalytics />;
}
