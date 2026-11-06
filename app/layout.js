import './globals.css';
export const metadata = {
  title: 'हिमांशु ♥ स्तुति | शुभ विवाह',
  description: 'हिमांशु एवं स्तुति के शुभ विवाह में सादर आमंत्रित हैं। 01 December 2026, Haridwar.',
  openGraph: { title: 'हिमांशु ♥ स्तुति | शुभ विवाह', description: 'A royal Indian wedding invitation' }
};
export default function RootLayout({ children }) {
  return <html lang="hi"><body>{children}</body></html>;
}
