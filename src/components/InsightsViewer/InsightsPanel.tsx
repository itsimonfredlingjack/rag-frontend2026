import { ChevronUp } from 'lucide-react';
import styles from './InsightsPanel.module.css';

export default function InsightsPanel() {
  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>RETRIEVAL SOURCES</span>
        <div className={styles.controls}>
          <button className={styles.iconBtn}>K = 5</button>
        </div>
      </div>

      <div className={styles.scrollArea}>
        {/* Source 1 */}
        <div className={styles.sourceCard}>
          <div className={styles.sourceHeader}>
            <div className={styles.sourceTitleWrapper}>
              <span className={styles.citationNumber}>1</span>
              <span className={styles.sourceTitle}>SOU 2023:45 — Sektion 4.2 Kapacitetsmekani...</span>
            </div>
            <span className={styles.sourceScore}>0.932</span>
          </div>
          <div className={styles.sourceSnippet}>
            "...införandet av balanseringsansvar för småskaliga producenter förväntas stabilisera prisbildningen i SE4 under vintern 2024."
          </div>
          <div className={styles.sourceFooter}>
            <span>SID. 142 · §4.2</span>
            <button className={styles.openBtn}>ÖPPNA →</button>
          </div>
        </div>

        {/* Source 2 */}
        <div className={styles.sourceCard}>
          <div className={styles.sourceHeader}>
            <div className={styles.sourceTitleWrapper}>
              <span className={styles.citationNumber}>2</span>
              <span className={styles.sourceTitle}>Energimyndigheten — Lägesrapport v2</span>
            </div>
            <span className={styles.sourceScore}>0.841</span>
          </div>
          <div className={styles.sourceSnippet}>
            "Kapaciteten i överföringssnitt 4 har ökat genom systemoptimering men flaskhalsar kvarstår vid extrem kyla."
          </div>
          <div className={styles.sourceFooter}>
            <span>BILAGA 4.2</span>
            <button className={styles.openBtn}>ÖPPNA →</button>
          </div>
        </div>

        {/* Source 3 */}
        <div className={styles.sourceCard}>
          <div className={styles.sourceHeader}>
            <div className={styles.sourceTitleWrapper}>
              <span className={styles.citationNumber}>3</span>
              <span className={styles.sourceTitle}>Svenska Kraftnät — Långsiktig marknadsanaly...</span>
            </div>
            <span className={styles.sourceScore}>0.793</span>
          </div>
          <div className={styles.sourceSnippet}>
            "Investeringstakten i transmissionsnätet måste minst fördubblas för att möta efterfrågan från elektrifierad industri."
          </div>
          <div className={styles.sourceFooter}>
            <span>KAP. 6</span>
            <button className={styles.openBtn}>ÖPPNA →</button>
          </div>
        </div>
      </div>

      <div className={styles.traceSection}>
        <div className={styles.traceHeader}>
          <span>RETRIEVAL TRACE</span>
          <ChevronUp size={16} />
        </div>
        <div className={styles.traceBarWrapper}>
          <div className={styles.traceBar} />
        </div>
        <div className={styles.traceLabel}>
          <span>EMBEDDING QUALITY</span>
          <span>85%</span>
        </div>
      </div>

    </aside>
  );
}
