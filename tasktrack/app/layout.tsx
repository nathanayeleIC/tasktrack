import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskTrack',
  description: 'Modern task, course, and meeting management for students and professionals.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
