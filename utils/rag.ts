import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import type { Runnable } from "@langchain/core/runnables";
import type { VectorStoreRetriever } from "@langchain/core/vectorstores";

export class RAG {
  model: string | null = null;
  embeddingModel: string | null = null;
  llm: ChatOllama | null = null;
  embeddings: OllamaEmbeddings | null = null;
  vectorStore: MemoryVectorStore | null = null;
  retriever: VectorStoreRetriever<MemoryVectorStore> | null = null;
  chain: Runnable | null = null;
  documents: Document[] = [];
  initialized: boolean = false;

  constructor() {
    this.documents = [];
  }

  private async initialize() {
    if (this.initialized) return;

    const config = useRuntimeConfig();
    this.model = config.public.ollamaModel as string;
    this.embeddingModel = config.public.embeddingModel as string;
    this.llm = new ChatOllama({
      model: this.model,
      temperature: 0.1, //? Adjust as needed, higher = more creative responses
      baseUrl: config.public.ollamaUrl as string,
    });
    this.embeddings = new OllamaEmbeddings({
      model: this.embeddingModel,
      baseUrl: config.public.ollamaUrl as string,
    });

    this.vectorStore = new MemoryVectorStore(this.embeddings);
    this.retriever = this.vectorStore.asRetriever({ k: 3 }); //? Adjust k as needed, higher = more context

    await this.initializeChain();
    this.initialized = true;
  }

  async initializeChain() {
    if (!this.llm || !this.retriever) await this.initialize();
    if (!this.llm) throw new Error("LLM not initialized. Please call initialize() first.");
    if (!this.retriever) throw new Error("Retriever not initialized. Please call initialize() first.");

    const prompt = ChatPromptTemplate.fromTemplate(`
      Answer the following question based only on the provided context:

      Context: {context}

      Question: {input}

      Answer:`);

    const documentChain = await createStuffDocumentsChain({
      llm: this.llm,
      prompt,
    });
    this.chain = await createRetrievalChain({
      retriever: this.retriever,
      combineDocsChain: documentChain,
    });
  }

  async storeMemory(memory: string | string[]): Promise<void> {
    if (!memory || (Array.isArray(memory) && memory.length === 0))
      throw new Error('Memory content cannot be empty');
    if (Array.isArray(memory) && memory.some(m => !m || m.trim().length === 0))
      throw new Error('Memory array cannot contain empty strings');
    if (typeof memory === 'string' && memory.trim().length === 0)
      throw new Error('Memory string cannot be empty');

    if (!this.initialized) await this.initialize();

    const memories = Array.isArray(memory) ? memory : [memory];
    const newDocuments = memories.map(
      (mem) =>
        new Document({
          pageContent: mem,
          metadata: { source: "memory" },
        })
    );

    this.documents.push(...newDocuments);
    await this.vectorStore?.addDocuments(newDocuments);
  }

  async getRelevantMemory(query: string): Promise<{ context: Document[]; answer: string }> {
    if (!this.initialized) await this.initialize();
    if (!this.chain) await this.initializeChain();
    if (!this.chain) throw new Error("Chain not initialized. Please call initialize() first.");

    const response = await this.chain.invoke({
      input: query,
    });
    return response;
  }
}
