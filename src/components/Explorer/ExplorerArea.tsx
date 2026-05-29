import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import styles from './ExplorerArea.module.css';
import type { DocumentCitation } from '../../App';

interface ExplorerAreaProps {
  onOpenDocument: (doc: DocumentCitation) => void;
  query: string;
}

const mockCitations: DocumentCitation[] = [
  {
    id: 'doc1',
    title: 'SOU 2023:14',
    snippet: 'Found exact term matches in SOU 2023:14...',
    content: 'BM25 Retrieval Strategy: High keyword overlap for "myndigheters datadelning". Raw BM25 Score: 14.52. Reranked Score: 0.94.',
    score: 0.94,
  },
  {
    id: 'doc2',
    title: 'Proposition 2022/23:10',
    snippet: 'Semantic alignment with GDPR compliance...',
    content: 'Vector Search Strategy: High semantic similarity via text-embedding-v3. Propositionen föreslår sekretessbrytande bestämmelser.',
    score: 0.88,
  }
];

export default function ExplorerArea({ onOpenDocument, query }: ExplorerAreaProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  
  const fullTextPart1 = 'Enligt de senaste utredningarna kommer stabiliteten i elområde SE4 att stärkas genom en stegvis implementering av kapacitetsmekanismer';
  const fullTextPart2 = '. Detta innebär att balansen mellan produktion och konsumtion kan hanteras mer effektivt under perioder av hög belastning, särskilt vid importbehov från kontinenten';
  const fullTextPart3 = '.\n\nSvenska Kraftnät betonar dock att investeringstakten i transmissionsnätet måste öka markant för att möta klimat- och kapacitetsmålen till 2030';
  const fullTextPart4 = '. Utan koordinerade investeringar riskerar prisskillnaderna mellan elområdena att fördjupas ytterligare under kommande vinterhalvår.';

  useEffect(() => {
    // Simulate streaming
    let current = '';
    const full = fullTextPart1 + ' [1]' + fullTextPart2 + ' [2]' + fullTextPart3 + ' [3]' + fullTextPart4;
    let i = 0;
    setIsTyping(true);
    
    const interval = setInterval(() => {
      const chunk = full.substring(i, i + 3);
      current += chunk;
      setDisplayedText(current);
      i += 3;
      if (i >= full.length) {
        setDisplayedText(full);
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20);
    
    return () => clearInterval(interval);
  }, [query]);

  // A helper to render text with inline citations
  const renderTextWithCitations = (text: string) => {
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, index) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const citeNum = match[1];
        return (
          <span 
            key={index} 
            className={styles.citation}
            onClick={() => onOpenDocument(mockCitations[parseInt(citeNum) % mockCitations.length])}
          >
            {citeNum}
          </span>
        );
      }
      // Handle newlines
      return part.split('\n').map((line, i, arr) => (
        <span key={`${index}-${i}`}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ));
    });
  };

  if (!query) return null;

  return (
    <div className={styles.documentContainer}>
      <div className={styles.queryHeader}>
        <span className={styles.queryLabel}>QUERY</span>
        <span className={styles.queryTimestamp}>{new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
      </div>
      
      <h1 className={styles.queryTitle}>
        {query}
      </h1>

      <div className={styles.answerHeader}>
        <span className={styles.answerLabel}>ANSWER</span>
        <span className={styles.cragBadge}>CRAG VERIFIED</span>
      </div>

      <h2 className={styles.answerTitle}>
        Analys av elmarknadsstabilitet
      </h2>

      <div className={styles.answerBody}>
        <p>
          {renderTextWithCitations(displayedText)}
          {isTyping && <span style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--text-primary)', verticalAlign: 'middle', marginLeft: '4px', animation: 'pulseGlow 1s infinite' }} />}
        </p>
      </div>

      {!isTyping && (
        <div className={styles.documentFooter}>
          <div className={styles.footerMetric}>
            <span className={styles.metricLabel}>LATENCY</span>
            <span className={styles.metricValue}>1.24S</span>
          </div>
          <div className={styles.footerMetric}>
            <span className={styles.metricLabel}>CHUNKS</span>
            <span className={styles.metricValue}>5</span>
          </div>
          <div className={styles.footerMetric}>
            <span className={styles.metricLabel}>MODEL</span>
            <span className={styles.metricValue}>GPT-40-SV</span>
          </div>
        </div>
      )}

      {/* Suggested Follow-ups */}
      {!isTyping && (
        <div className={styles.suggestionsContainer}>
          <button className={styles.suggestionPill}>Granska Källa 1 & 2 i detalj</button>
          <button className={styles.suggestionPill}>Vad innebär kapacitetsmekanismer?</button>
          <button className={styles.suggestionPill}>Sammanfatta riskerna inför vintern</button>
        </div>
      )}

      {/* Floating Input Area */}
      <div className={styles.floatingInputWrapper}>
        <input 
          type="text" 
          className={styles.floatingInputField} 
          placeholder="Ställ en följdfråga..." 
        />
        <button className={styles.floatingSubmitBtn}>
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
