import Header from '../HomeForm/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../HomeForm/Footer';
import { AuthProvider } from '../../contexts/AuthContext';

export default function Layout() {
  return (
    <>
      <main className="container">
        <AuthProvider>
          <Header />
          <Outlet />
          <Footer />
        </AuthProvider>
      </main>
    </>
  );
}
