import { Layers, Plus } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Layers className={styles.brandIcon} size={24} />
        <span className={styles.brandTitle}>Svensk RAG</span>
      </div>

      <button className={styles.newSessionBtn}>
        <Plus size={16} />
        New Research Session
      </button>

      <div className={styles.sectionTitle}>Recent Sessions</div>
      <ul className={styles.historyList}>
        <li className={styles.historyItem}>SOU 2023:14 Analysis</li>
        <li className={styles.historyItem}>BM25 vs Vector Eval</li>
        <li className={styles.historyItem}>CRAG Performance Test</li>
      </ul>
    </aside>
  );
}
