import Header from '../HomeForm/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../HomeForm/Footer';

export default function Layout() {
  return (
    <>
      <main className="container">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
