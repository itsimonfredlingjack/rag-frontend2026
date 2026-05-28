import { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import styles from './ChatArea.module.css';
import type { DocumentCitation } from '../../App';
import PipelineVisualizer, { type PipelineStep } from './PipelineVisualizer';

interface ChatAreaProps {
  onOpenDocument: (doc: DocumentCitation) => void;
  initialQuery: string;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  citations?: DocumentCitation[];
  pipelineState?: PipelineStep;
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

export default function ChatArea({ onOpenDocument, initialQuery }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasProcessedRef = useRef(false);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && !hasProcessedRef.current) {
      hasProcessedRef.current = true;
      executeSearch(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const executeSearch = (query: string) => {
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    const aiMessageId = (Date.now() + 1).toString();
    
    setMessages(prev => [...prev, newUserMsg, {
      id: aiMessageId,
      role: 'ai',
      content: '',
      pipelineState: 'retrieval'
    }]);
    
    setIsTyping(true);
    
    // Animate the pipeline
    const sequence: PipelineStep[] = ['retrieval', 'rerank', 'crag', 'critic', 'generate'];
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < sequence.length) {
        setMessages(prev => prev.map(m => 
          m.id === aiMessageId ? { ...m, pipelineState: sequence[stepIndex] } : m
        ));
      } else {
        clearInterval(interval);
        setMessages(prev => prev.map(m => 
          m.id === aiMessageId ? {
            ...m,
            pipelineState: 'done',
            content: 'Enligt SOU 2023:14 föreslås nya bestämmelser för att underlätta myndigheters datadelning. Efter utvärdering av CRAG har svaret reviderats för att inkludera referenser till GDPR-kompatibilitet.',
            citations: [mockCitations[0], mockCitations[1]],
          } : m
        ));
        setIsTyping(false);
      }
    }, 1000);
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
            <div className={styles.messageContent} style={msg.role === 'ai' ? { width: '100%' } : {}}>
              
              {/* Persistent Retrieval Trace */}
              {msg.role === 'ai' && msg.pipelineState && (
                 <PipelineVisualizer currentStep={msg.pipelineState} />
              )}
              
              {/* Message Content with Inline Source Chips */}
              {msg.content && (
                <div style={{ marginTop: msg.pipelineState ? '1rem' : '0' }}>
                  {msg.content}
                  {msg.citations && msg.citations.map((cite, i) => (
                    <span 
                      key={cite.id} 
                      className={styles.citationBadge}
                      onClick={() => onOpenDocument(cite)}
                      title={cite.title}
                    >
                      [{i + 1}: {cite.title}]
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
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
