import React from 'react';

// Styles
import './layout.local.scss';

export default function LayoutMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='ts-home-main'>
      {children}
    </div>
  );
}