import { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import styles from './ChatArea.module.css';
import type { DocumentCitation } from '../../App';
import PipelineVisualizer, { type PipelineStep } from './PipelineVisualizer';

interface ChatAreaProps {
  onOpenDocument: (doc: DocumentCitation) => void;
  initialQuery: string;
  isActive: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  citations?: DocumentCitation[];
}

const mockCitations: DocumentCitation[] = [
  {
    id: 'doc1',
    title: 'BM25 FTS5 Match',
    snippet: 'Found exact term matches in SOU 2023:14...',
    content: 'BM25 Retrieval Strategy: High keyword overlap for "myndigheters datadelning". Raw BM25 Score: 14.52. Reranked Score: 0.94.',
    score: 0.94,
  },
  {
    id: 'doc2',
    title: 'Vector Semantics Match',
    snippet: 'Semantic alignment with GDPR compliance...',
    content: 'Vector Search Strategy: High semantic similarity via text-embedding-v3. Propositionen föreslår sekretessbrytande bestämmelser.',
    score: 0.88,
  }
];

export default function ChatArea({ onOpenDocument, initialQuery, isActive }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<PipelineStep>('idle');
  const [hasProcessedInitial, setHasProcessedInitial] = useState(false);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && initialQuery && !hasProcessedInitial) {
      setHasProcessedInitial(true);
      executeSearch(initialQuery);
    }
  }, [isActive, initialQuery, hasProcessedInitial]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, pipelineStep]);

  const executeSearch = (query: string) => {
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);
    
    // Animate the pipeline
    const sequence: PipelineStep[] = ['retrieval', 'rerank', 'crag', 'critic', 'generate'];
    let stepIndex = 0;
    
    setPipelineStep(sequence[0]);
    
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < sequence.length) {
        setPipelineStep(sequence[stepIndex]);
      } else {
        clearInterval(interval);
        setPipelineStep('done');
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'ai',
            content: 'Enligt SOU 2023:14 föreslås nya bestämmelser för att underlätta myndigheters datadelning. Efter utvärdering av CRAG har svaret reviderats för att inkludera referenser till GDPR-kompatibilitet.',
            citations: [mockCitations[0], mockCitations[1]],
          }
        ]);
        
        setTimeout(() => setPipelineStep('idle'), 2000); // Reset after a while
      }
    }, 1000); // 1 second per pipeline step for demo purposes
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const query = inputValue;
    setInputValue('');
    executeSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList}>
        {messages.map(msg => (
          <div key={msg.id} className={`${styles.messageRow} ${styles[msg.role]}`}>
            <div className={`${styles.avatar} ${styles[msg.role]}`}>
              {msg.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
            </div>
            <div className={styles.messageContent}>
              {msg.content}
              {msg.citations && msg.citations.map((cite, i) => (
                <span 
                  key={cite.id} 
                  className={styles.citationBadge}
                  onClick={() => onOpenDocument(cite)}
                >
                  View Insights [{i + 1}]
                </span>
              ))}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className={`${styles.messageRow} ${styles.ai}`}>
             <div className={`${styles.avatar} ${styles.ai}`}>
               <Sparkles size={20} />
             </div>
             <div className={styles.messageContent} style={{ width: '100%' }}>
               <PipelineVisualizer currentStep={pipelineStep} />
             </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className={styles.inputWrapper}>
        <div className={styles.inputElevated}>
          <textarea
            className={styles.inputField}
            placeholder="Ask a follow-up question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button 
            className={styles.sendBtn} 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
