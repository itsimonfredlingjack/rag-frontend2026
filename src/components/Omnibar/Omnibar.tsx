import { Search, Layers } from 'lucide-react';
import styles from './Omnibar.module.css';
import { type KeyboardEvent, useState } from 'react';

interface OmnibarProps {
  onSearch: (query: string) => void;
}

export default function Omnibar({ onSearch }: OmnibarProps) {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Layers size={32} color="var(--accent-blue)" />
        Svensk RAG Command Center
      </div>
      
      <div className={styles.omnibar}>
        <Search className={styles.searchIcon} size={24} />
        <input 
          type="text" 
          className={styles.input} 
          placeholder="Ask anything about Swedish public documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>

      <div className={styles.metricsRow}>
        <div className={styles.metricBadge}>
          <div className={styles.indicator} />
          BM25 FTS5 Indexed
        </div>
        <div className={styles.metricBadge}>
          <div className={styles.indicator} />
          ChromaDB Ready
        </div>
        <div className={styles.metricBadge}>
          <div className={styles.indicator} />
          CRAG Evaluator Active
        </div>
      </div>
    </div>
  );
}
