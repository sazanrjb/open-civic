import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpenCivic',
  description: 'An AI generated government assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-full flex flex-col h-full">
          <main className="mt-8 pb-8">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
              <h1 className="sr-only">Assistant</h1>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
