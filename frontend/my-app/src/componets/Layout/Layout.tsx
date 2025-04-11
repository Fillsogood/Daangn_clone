import Header from '../HomeForm/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../HomeForm/Footer';
import { AuthProvider } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import ChatModal from '../ChatForm/ChatModal';

export default function Layout() {
  const { openChatUI } = useChat();
  return (
    <>
      <main className="container">
        <AuthProvider>
          <Header />
          <Outlet />
          <Footer />
          <button className="chatToggleButton" onClick={openChatUI}>
            💬
          </button>
          <ChatModal />
        </AuthProvider>
      </main>
    </>
  );
}
