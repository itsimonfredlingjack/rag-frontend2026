import { X, Activity, Target, Zap, ShieldCheck } from 'lucide-react';
import styles from './InsightsPanel.module.css';
import type { DocumentCitation } from '../../App';

interface InsightsPanelProps {
  activeDocument: DocumentCitation | null;
  onClose: () => void;
}

export default function InsightsPanel({ activeDocument, onClose }: InsightsPanelProps) {
  return (
    <div className={`${styles.panelContainer} ${activeDocument ? styles.open : ''}`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Activity className={styles.docIcon} size={22} />
          <h3 className={styles.title}>Retrieval Insights</h3>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close panel">
          <X size={18} />
        </button>
      </div>
      
      {activeDocument && (
        <div className={styles.contentScroll}>
          <div className={styles.verdictStrip}>
            <ShieldCheck size={16} className={styles.verdictIcon} />
            <strong>CRAG Verdict: </strong> Supporting
          </div>

          <div className={styles.sectionHeader}>Source Preview</div>
          <div className={styles.documentText}>
            {activeDocument.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}><Target size={14} /> Retrieval Method</div>
              <div className={styles.metaValue}>Hybrid (BM25 + Vector)</div>
            </div>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}><Zap size={14} /> Final Score</div>
              <div className={styles.metaValue}>{(activeDocument.score * 100).toFixed(1)}%</div>
            </div>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>BM25 Score</div>
              <div className={styles.metaValue}>14.52</div>
            </div>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>Vector Distance</div>
              <div className={styles.metaValue}>0.12</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
