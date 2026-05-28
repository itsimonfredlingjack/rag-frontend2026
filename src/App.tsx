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
        {/* Conditional Rendering for Accessibility */}
        {!hasStarted ? (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyStateContent}>
              <Omnibar onSearch={handleStartSearch} />
              
              <div className={styles.exampleQueries}>
                <div className={styles.exampleCard} onClick={() => handleStartSearch('Hur förhåller sig Offentlighetsprincipen till GDPR vid utlämnande av handlingar?')}>
                  <h4>GDPR vs Offentlighetsprincipen</h4>
                  <p>Hur förhåller sig Offentlighetsprincipen till GDPR vid utlämnande av handlingar?</p>
                </div>
                <div className={styles.exampleCard} onClick={() => handleStartSearch('Vad innebär SOU 2023:14 för myndigheters datadelning?')}>
                  <h4>Datadelning (SOU 2023:14)</h4>
                  <p>Vad innebär SOU 2023:14 för statliga myndigheters datadelning?</p>
                </div>
                <div className={styles.exampleCard} onClick={() => handleStartSearch('Sammanfatta Proposition 2022/23:10 gällande sekretessbrytande bestämmelser.')}>
                  <h4>Sekretessbrytande bestämmelser</h4>
                  <p>Sammanfatta Proposition 2022/23:10 gällande sekretessbrytande bestämmelser.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.activeWorkspaceWrapper}>
            <ChatArea 
              onOpenDocument={handleOpenDocument} 
              initialQuery={initialQuery}
            />
          </div>
        )}
      </main>
      
      {activeDocument && (
        <InsightsPanel 
          activeDocument={activeDocument} 
          onClose={handleCloseDocument} 
        />
      )}
    </div>
  );
}

export default App;
