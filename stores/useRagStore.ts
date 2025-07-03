import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { RAG } from '../utils/rag';

export const useRagStore = defineStore('rag', () => {
  const documents = ref<File[]>([]);
  const ragInstance = ref<RAG | null>(null);
  const isProcessing = ref(false);
  const processedDocuments = ref<string[]>([]);
  const error = ref<string | null>(null);
  const processingAbortController = ref<AbortController | null>(null);

  function initializeRAG() {
    if (!ragInstance.value) ragInstance.value = new RAG();
  }

  function addDocument(newDocument: File) {
    documents.value.push(newDocument);
  }

  function removeDocument(documentName: string) {
    documents.value = documents.value.filter(doc => doc.name !== documentName);
    processedDocuments.value = processedDocuments.value.filter(name => name !== documentName);
    if (error.value) {
      error.value = null;
    }
  }

  async function processDocuments(docs: File[]) {
    if (!docs.length || isProcessing.value) return;

    initializeRAG();
    processingAbortController.value = new AbortController();
    if (ragInstance.value) ragInstance.value.abortController = processingAbortController.value;

    isProcessing.value = true;
    error.value = null;

    const MAX_FILE_SIZE_MB = 15;
    const BATCH_SIZE = 100;
    try {
      for (const doc of docs) {
        if (processingAbortController.value?.signal.aborted) return;

        const fileSizeInMB = doc.size / (1024 * 1024);
        if (fileSizeInMB > MAX_FILE_SIZE_MB) {
          error.value = `File "${doc.name.slice(0,30)}..." (${fileSizeInMB.toFixed(2)} MB) exceeds the ${MAX_FILE_SIZE_MB} MB limit and will be skipped.`;
          continue;
        }

        const chunks = await extractAndSplitTextFromFile(doc);
        if (chunks.length && ragInstance.value) {
          for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
            if (processingAbortController.value?.signal.aborted) return;

            const batch = chunks.slice(i, i + BATCH_SIZE);
            await ragInstance.value.storeMemory(batch);
          }
          processedDocuments.value.push(doc.name);
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      if (err instanceof Error && err.message === 'Operation was aborted') return;

      console.error('Error processing documents:', err);
      error.value = err instanceof Error ? err.message : String(err);
      throw err;
    } finally {
      isProcessing.value = false;
      processingAbortController.value = null;
      if (ragInstance.value) ragInstance.value.abortController = null;
    }
  }

  async function extractAndSplitTextFromFile(file: File): Promise<string[]> {
    let textContent = '';

    if (file.type === 'text/plain') {
      textContent = await file.text();
    } else if (file.type === 'application/pdf') {
      const chunks = await processPDFWithLangChain(file);
      return chunks;
    } else {
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    if (textContent) {
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      return await textSplitter.splitText(textContent);
    }

    return [];
  }

  async function processPDFWithLangChain(file: File): Promise<string[]> {
    try {
      const blob = new Blob([file], { type: 'application/pdf' });

      const pdfjsModule = await import('pdfjs-dist');
      pdfjsModule.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString();

      const { WebPDFLoader } = await import('@langchain/community/document_loaders/web/pdf');
      const loader = new WebPDFLoader(blob, {
        splitPages: true,
        parsedItemSeparator: ' ',
        pdfjs: () => Promise.resolve(pdfjsModule)
      });

      const docs = await loader.load();

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const chunks: string[] = [];
      for (const doc of docs) {
        const docChunks = await textSplitter.splitText(doc.pageContent);
        chunks.push(...docChunks);
      }

      return chunks;
    } catch (error) {
      console.error('Error processing PDF with LangChain:', error);
      throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async function extractTextFromFile(file: File): Promise<string> {
    if (file.type === 'text/plain') {
      return await file.text();
    } else if (file.type === 'application/pdf') {
      const chunks = await processPDFWithLangChain(file);
      return chunks.join('\n\n');
    }
    throw new Error(`Unsupported file type: ${file.type}`);
  }

  async function queryRAG(query: string): Promise<any> {
    if (!ragInstance.value) throw new Error('RAG not initialized. Please upload documents first.');
    return await ragInstance.value.getRelevantMemory(query);
  }

  async function resetDocuments() {
    if (processingAbortController.value) {
      processingAbortController.value.abort();
      processingAbortController.value = null;
    }

    documents.value = [];
    processedDocuments.value = [];
    if (ragInstance.value) await ragInstance.value.reset();
    isProcessing.value = false;
    error.value = null;
  }

  return {
    documents,
    ragInstance,
    isProcessing,
    processedDocuments,
    error,
    addDocument,
    removeDocument,
    processDocuments,
    queryRAG,
    resetDocuments,
    extractTextFromFile
  }
});