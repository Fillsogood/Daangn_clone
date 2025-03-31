import styles from './Home.module.css';

const HomeHero = () => {
  return (
    <section className={styles.hero}>
      <h1>
        우리 동네
        <br />
        중고 직거래 당근마켓
      </h1>
      <p>동네 주민들과 따뜻한 거래를 경험해보세요 🧡</p>
    </section>
  );
};

export default HomeHero;
