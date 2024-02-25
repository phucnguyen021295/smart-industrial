import React from 'react';
import Header from '@/app/(main-template)/components/Header';

export default function LayoutMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}