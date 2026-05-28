import { Search, ChevronDown, CheckCircle, BrainCircuit } from 'lucide-react';
import styles from './Omnibar.module.css';
import { type KeyboardEvent, useState } from 'react';

const AbstractLogo = () => (
  <svg width="48" height="48" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--text-primary)' }}>
    <circle cx="6" cy="14" r="3" fill="currentColor" />
    <circle cx="14" cy="8" r="3" fill="currentColor" />
    <circle cx="14" cy="20" r="3" fill="currentColor" />
    <circle cx="22" cy="14" r="4" fill="currentColor" />
    <path d="M8.5 12.5L11.5 9.5M8.5 15.5L11.5 18.5M16.5 9.5L19 12M16.5 18.5L19 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

interface OmnibarProps {
  onSearch: (query: string) => void;
}

export default function Omnibar({ onSearch }: OmnibarProps) {
  const [query, setQuery] = useState('');
  const [strategy, setStrategy] = useState('Hybrid');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <AbstractLogo />
        <h1 className={styles.heroTitle}>Svensk RAG</h1>
        <p className={styles.heroSubtitle}>Ask your corpus. Inspect how the answer was built.</p>
      </div>
      
      <div className={styles.commandObject}>
        <div className={styles.scopeSelector}>
          <span>All Documents</span>
          <ChevronDown size={14} />
        </div>
        
        <input 
          type="text" 
          className={styles.input} 
          placeholder="Ask anything about Swedish public documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        <div className={styles.controlsGroup}>
          <div 
            className={styles.controlToggle} 
            onClick={() => setStrategy(strategy === 'Hybrid' ? 'Vector' : strategy === 'Vector' ? 'BM25' : 'Hybrid')}
          >
            <BrainCircuit size={14} />
            {strategy}
          </div>
          <div className={`${styles.controlToggle} ${styles.active}`}>
            <CheckCircle size={14} />
            CRAG: Auto
          </div>
        </div>
      </div>

      <div className={styles.machineStatusRow}>
        <div className={styles.statusItem}>
          <span className={styles.statusDot} />
          ChromaDB: 14.2ms
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusDot} />
          BM25 Index: 142k chunks
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusDot} />
          Local Embedding Model Loaded
        </div>
      </div>
    </div>
  );
}
