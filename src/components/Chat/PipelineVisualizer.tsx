import { Search, ArrowDownUp, CheckCircle, BrainCircuit, Sparkles } from 'lucide-react';
import styles from './PipelineVisualizer.module.css';

export type PipelineStep = 'idle' | 'retrieval' | 'rerank' | 'crag' | 'critic' | 'generate' | 'done';

interface PipelineVisualizerProps {
  currentStep: PipelineStep;
}

export default function PipelineVisualizer({ currentStep }: PipelineVisualizerProps) {
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

  return (
    <div className={styles.container}>
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
  );
}
