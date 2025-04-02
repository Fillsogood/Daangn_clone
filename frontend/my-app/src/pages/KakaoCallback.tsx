import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드가 로그인 처리 다 했고 프론트로 redirect만 해준 상황
    // 여긴 그냥 홈으로 보내기만 해도 됨
    navigate('/');
  }, [navigate]);

  return <p>로그인 처리 중입니다... ⏳</p>;
};

export default KakaoCallback;
