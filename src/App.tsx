import { useState } from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import ExplorerArea from './components/Explorer/ExplorerArea';
import InsightsPanel from './components/InsightsViewer/InsightsPanel';

export type DocumentCitation = {
  id: string;
  title: string;
  snippet: string;
  content: string;
  score: number;
};

function App() {
  const [activeDocument, setActiveDocument] = useState<DocumentCitation | null>(null);

  const handleOpenDocument = (doc: DocumentCitation) => {
    setActiveDocument(doc);
    // In a real app, this would open a modal or expand a view
    console.log("Opened doc", doc.title);
  };

  return (
    <div className={styles.appShell}>
      <Sidebar />
      <InsightsPanel />
      <main className={styles.mainContent}>
        <div className={styles.docHeader}>
          <h1 className={styles.docTitle}>Svensk RAG Explorer</h1>
          <span className={styles.docSubtitle}>WORKSPACE - STATENS OFFENTLIGA UTREDNINGAR (SOU)</span>
        </div>
        
        <ExplorerArea 
          onOpenDocument={handleOpenDocument} 
          query="Hur påverkar de nya föreskrifterna elmarknadens stabilitet i södra Sverige?"
        />
      </main>
    </div>
  );
}

export default App;
