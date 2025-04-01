import styles from './Home.module.css';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.p}>
        <p>
          <span>(주) 당근마켓</span>
        </p>
        <p>
          <span>대표</span> 홍길동, 아무개 | <span>사업자번호</span> 000-00-000000
        </p>
        <p>
          <span>직업정보제공사업 신고번호</span> J1200020200016
        </p>
        <p>
          <span>주소</span> 서울특별시 행복루 행복하지 300, 10층 (당근서비스)
        </p>
        <p>
          <span>전화</span> 0000-0000 | <span>고객문의</span> example@daangnservice.com
        </p>
        <p>Copyright © 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
