import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const MainCTA = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.cta}>
      <button onClick={() => navigate('/login')}>중고거래 시작하기</button>
      <p>
        아직 계정이 없다면? <span onClick={() => navigate('/signup')}>회원가입</span>
      </p>
    </div>
  );
};

export default MainCTA;
