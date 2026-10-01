import React from 'react';
import type { Metadata } from 'next';
import { getAdminSession } from '@/lib/auth';
import AdminShell from './AdminShell';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  return <AdminShell initialSession={session}>{children}</AdminShell>;
}
