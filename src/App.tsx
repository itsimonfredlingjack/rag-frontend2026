import { useState } from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import ChatArea from './components/Chat/ChatArea';
import InsightsPanel from './components/InsightsViewer/InsightsPanel';
import Omnibar from './components/Omnibar/Omnibar';

export type DocumentCitation = {
  id: string;
  title: string;
  snippet: string;
  content: string;
  score: number;
};

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const [activeDocument, setActiveDocument] = useState<DocumentCitation | null>(null);

  const handleStartSearch = (query: string) => {
    setInitialQuery(query);
    setHasStarted(true);
  };

  const handleOpenDocument = (doc: DocumentCitation) => {
    setActiveDocument(doc);
  };

  const handleCloseDocument = () => {
    setActiveDocument(null);
  };

  return (
    <div className={styles.appShell}>
      <Sidebar />
      <main className={styles.mainContent}>
        
        {/* Omnibar Empty State */}
        <div className={`${styles.emptyStateWrapper} ${hasStarted ? styles.hidden : ''}`}>
          <Omnibar onSearch={handleStartSearch} />
        </div>

        {/* Active Massive Chat Area */}
        <div className={`${styles.activeWorkspaceWrapper} ${hasStarted ? styles.active : ''}`}>
          <ChatArea 
            onOpenDocument={handleOpenDocument} 
            initialQuery={initialQuery}
            isActive={hasStarted}
          />
        </div>
      </main>
      
      <InsightsPanel 
        activeDocument={activeDocument} 
        onClose={handleCloseDocument} 
      />
    </div>
  );
}

export default App;
