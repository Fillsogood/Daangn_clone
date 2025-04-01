import Header from '../HomeForm/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <main className="container">
        <Header />
        <Outlet />
      </main>
    </>
  );
}
