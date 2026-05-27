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
          <div className={styles.metaGrid}>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}><Target size={14} /> Pipeline Source</div>
              <div className={styles.metaValue}>{activeDocument.title.includes('BM25') ? 'FTS5 / BM25' : 'ChromaDB'}</div>
            </div>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}><Zap size={14} /> Rerank Score</div>
              <div className={styles.metaValue}>{(activeDocument.score * 100).toFixed(1)}%</div>
            </div>
            <div className={styles.metaCard} style={{ gridColumn: '1 / -1' }}>
              <div className={styles.metaLabel}><ShieldCheck size={14} /> CRAG Evaluation</div>
              <div className={`${styles.metaValue} ${styles.success}`}>Relevant (Pass)</div>
            </div>
          </div>
          
          <div className={styles.sectionHeader}>Extracted Context</div>
          <div className={styles.documentText}>
            {activeDocument.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
