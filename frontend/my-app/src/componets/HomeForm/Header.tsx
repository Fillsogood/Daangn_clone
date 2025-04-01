import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import logo from '../../logo/당근마켓 로고.jpeg';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  if (loading) return null; // 로딩 중일 땐 아무것도 안 보여줌

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="당근마켓 로고" className={styles.logo} onClick={() => navigate('/')} />
        <span className={styles.menu} onClick={() => navigate('/')}>
          당근
        </span>
      </div>

      <div className={styles.right}>
        {user ? (
          <>
            <span className={styles.nickname}>{user.nickname}님</span>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
