// pages/index.js
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          {/* left: content */}
          <div className={styles.heroContent}>
            <div className={styles.brand}>Velora.ai</div>
            <div className={styles.heroTag}>Science-backed, personalized skincare routines</div>
            <h1 className={styles.heroHeadline}>Personalized skin care powered by AI</h1>
            <p className={styles.heroSub}>
              Velora.ai analyzes lifestyle and skin history to generate a safe, practical
              routine — formulations, product matches, and actionable steps you can follow.
            </p>

            <div className={styles.heroCTAs}>
              <Link href="/test" className={styles.ctaPrimary}>Take the Test</Link>
              <a className={styles.ctaGhost} href="#about">Learn more</a>
            </div>
          </div>

          {/* right visual / promo */}
          <div className={styles.heroVisual}>
            <div className={styles.promoCard}>
              <div style={{ padding: 14, flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Velora.ai</div>
                <div style={{ color: "#6B7280", marginBottom: 12 }}>AI-driven analysis • Tailored routines • Product matches</div>
                <div className={styles.rating}>⭐ 4.6 • 8,700+ reviews</div>
              </div>
              <div style={{ width: 180, height: 120, background: "linear-gradient(180deg,#FFEAF0,#FFF)", borderRadius: 12, marginRight: 8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <img src="/hero-face.png" alt="Velora" style={{ width: "92%", height: "92%", objectFit: "cover", borderRadius:8 }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* short about block */}
      <section id="about" style={{ padding: "28px 20px", textAlign: "center" }}>
        <div className="container-wide">
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, margin: 0 }}>What is Velora.ai?</h2>
          <p style={{ maxWidth: 900, margin: "12px auto 0 auto", color: "var(--muted)", fontSize: 16 }}>
            Velora.ai is a smart skincare assistant that uses your lifestyle inputs and current routine to recommend a simple, evidence-based skincare program. We focus on safe ingredient matches, practical formulating tips, and product suggestions you can buy.
          </p>
        </div>
      </section>
    </>
  );
}