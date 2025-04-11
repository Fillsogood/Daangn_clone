import Header from '../HomeForm/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../HomeForm/Footer';
import { AuthProvider } from '../../contexts/AuthContext';
import { ChatProvider } from '../../contexts/ChatProvider';
import ChatModal from '../ChatForm/ChatModal';
import { useChat } from '../../hooks/useChat';

export default function Layout() {
  return (
    <AuthProvider>
      <ChatProvider>
        <LayoutContent />
      </ChatProvider>
    </AuthProvider>
  );
}

// 👇 ChatProvider 내부에서 useChat() 호출되도록 분리
function LayoutContent() {
  const { openChatUI } = useChat();

  return (
    <main className="container">
      <Header />
      <Outlet />
      <Footer />
      <button className="chatToggleButton" onClick={openChatUI}>
        💬
      </button>
      <ChatModal />
    </main>
  );
}
