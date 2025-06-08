'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  const testRoutes = ['/test/form', '/test/insight'];
  const isTestRoute = testRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );
  
  if (isTestRoute) {
    return null;
  }
  
  return <Footer />;
}
