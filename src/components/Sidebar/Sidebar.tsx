import { Plus, Search, BookOpen, Activity, BarChart2, Settings, Server } from 'lucide-react';
import styles from './Sidebar.module.css';

const AbstractLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
    {/* Query -> Retrieval -> Rerank -> Answer abstract representation */}
    <circle cx="6" cy="14" r="3" fill="currentColor" />
    <circle cx="14" cy="8" r="3" fill="currentColor" />
    <circle cx="14" cy="20" r="3" fill="currentColor" />
    <circle cx="22" cy="14" r="4" fill="currentColor" />
    <path d="M8.5 12.5L11.5 9.5M8.5 15.5L11.5 18.5M16.5 9.5L19 12M16.5 18.5L19 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <AbstractLogo />
        <span className={styles.brandTitle}>Svensk RAG</span>
      </div>

      <nav className={styles.navGroup}>
        <button className={`${styles.navItem} ${styles.active}`}>
          <Plus size={18} />
          <span>New Session</span>
        </button>
        <button className={styles.navItem}>
          <Search size={18} />
          <span>Search</span>
        </button>
        <button className={styles.navItem}>
          <BookOpen size={18} />
          <span>Corpus Management</span>
        </button>
        <button className={styles.navItem}>
          <Activity size={18} />
          <span>Retrieval Runs</span>
        </button>
        <button className={styles.navItem}>
          <BarChart2 size={18} />
          <span>Evaluations</span>
        </button>
      </nav>

      <div className={styles.spacer} />

      <nav className={styles.navGroup}>
        <button className={styles.navItem}>
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </nav>

      <div className={styles.systemStatus}>
        <div className={styles.statusHeader}>
          <Server size={14} />
          <span>Local System</span>
        </div>
        <div className={styles.statusIndicator}>
          <span className={styles.dot} />
          Engine Online
        </div>
      </div>
    </aside>
  );
}
