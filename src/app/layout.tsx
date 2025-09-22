import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Football Reserve TN',
  description: 'Reserve football fields in Tunis',
};

const Header = () => (
  <header className="bg-gray-800 shadow-md">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            Football Reserve TN
          </Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/fields" className="text-gray-300 hover:text-white">
            Fields
          </Link>
          <Link href="/reservations" className="text-gray-300 hover:text-white">
            My Reservations
          </Link>
        </nav>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 mt-12">
    <div className="container mx-auto px-6 py-4">
      <p className="text-center text-gray-400">
        © 2025 Football Reserve TN. All rights reserved.
      </p>
    </div>
  </footer>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
