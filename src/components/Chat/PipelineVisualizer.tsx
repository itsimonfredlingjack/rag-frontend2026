import { useState } from 'react';
import { Search, ArrowDownUp, CheckCircle, BrainCircuit, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import styles from './PipelineVisualizer.module.css';

export type PipelineStep = 'idle' | 'retrieval' | 'rerank' | 'crag' | 'critic' | 'generate' | 'done';

interface PipelineVisualizerProps {
  currentStep: PipelineStep;
}

export default function PipelineVisualizer({ currentStep }: PipelineVisualizerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDone = currentStep === 'done';

  const steps = [
    { id: 'retrieval', label: 'BM25 + Vector', icon: Search },
    { id: 'rerank', label: 'Reranker', icon: ArrowDownUp },
    { id: 'crag', label: 'CRAG Eval', icon: CheckCircle },
    { id: 'critic', label: 'Critic Revise', icon: BrainCircuit },
    { id: 'generate', label: 'Generation', icon: Sparkles },
  ];

  const getStepStatus = (stepId: string) => {
    if (currentStep === 'done') return 'completed';
    if (currentStep === 'idle') return 'idle';
    
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'active';
    return 'idle';
  };

  const getLineStatus = (index: number) => {
    if (currentStep === 'done') return 'completed';
    if (currentStep === 'idle') return 'idle';
    
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex > index) return 'completed';
    if (currentIndex === index) return 'active';
    return 'idle';
  };

  const showExpanded = !isDone || isExpanded;

  return (
    <div className={`${styles.container} ${isDone && !isExpanded ? styles.collapsed : ''}`}>
      {isDone && (
        <div 
          className={styles.summaryHeader} 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={styles.summaryTitle}>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span style={{ marginLeft: '0.5rem' }}>Retrieval Trace</span>
          </div>
          <div className={styles.summaryStats}>
            <span className={styles.statBadge}>2 Sources</span>
            <span className={styles.statBadge}>CRAG Verified</span>
            <span className={styles.statBadge}>1.2s</span>
          </div>
        </div>
      )}

      {showExpanded && (
        <div className={styles.pipelineFlow}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const status = getStepStatus(step.id);
            
            return (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: index < steps.length - 1 ? 1 : 0 }}>
                <div className={`${styles.node} ${styles[status]}`}>
                  <div className={styles.iconWrapper}>
                    <Icon size={18} />
                  </div>
                  <span className={styles.nodeTitle}>{step.label}</span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={styles.lineWrapper}>
                    <div className={`${styles.lineProgress} ${styles[getLineStatus(index)]}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
