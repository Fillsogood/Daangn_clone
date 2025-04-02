import styles from './KakaoLoginButton.module.css';
import logo from '../../logo/카카오.png';
const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL = import.meta.env.VITE_KAKAO_AUTH_URL;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL; // ✅ 백엔드 리디렉션
  };

  return (
    <button onClick={handleKakaoLogin} className={styles.kakaoBtn}>
      <img src={logo} alt="kakao" />
      카카오 로그인
    </button>
  );
};

export default KakaoLoginButton;
