import type { Metadata } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import './globals.css';

const pixelifySans = Pixelify_Sans({
  weight: 'variable',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Calma',
  description: "Akash Ram's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelifySans.className} antialiased bg-mountainsMobile md:bg-mountainsDesktop bg-cover bg-center`}
      >
        {children}
      </body>
    </html>
  );
}
