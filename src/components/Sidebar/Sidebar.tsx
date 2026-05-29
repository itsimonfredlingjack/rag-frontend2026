import { Plus, Search, BookOpen, Activity, BarChart2, Settings } from 'lucide-react';
import styles from './Sidebar.module.css';
import RagLogo from '../Shared/RagLogo';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand} title="Svensk RAG Explorer">
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>S</span>
      </div>

      <nav className={styles.navGroup}>
        <button className={`${styles.navItem} ${styles.active}`} title="New Session">
          <Plus size={20} />
        </button>
        <button className={styles.navItem} title="Search">
          <Search size={20} />
        </button>
        <button className={styles.navItem} title="Corpus Management">
          <BookOpen size={20} />
        </button>
        <button className={styles.navItem} title="Retrieval Runs">
          <Activity size={20} />
        </button>
        <button className={styles.navItem} title="Evaluations">
          <BarChart2 size={20} />
        </button>
      </nav>

      <div className={styles.spacer} />

      <nav className={styles.navGroup}>
        <button className={styles.navItem} title="Settings">
          <Settings size={20} />
        </button>
      </nav>

      <div className={styles.systemStatus} title="Local System Online">
        <span className={styles.dot} />
      </div>
    </aside>
  );
}
