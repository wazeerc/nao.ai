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
    this.retriever = this.vectorStore.asRetriever({ k: 1 });

    await this.initializeChain();
    this.initialized = true;
  }

  async initializeChain() {
    if (!this.llm || !this.retriever) await this.initialize();

    const prompt = ChatPromptTemplate.fromTemplate(`
      Answer the following question based only on the provided context:

      Context: {context}

      Question: {input}

      Answer:`);

    const documentChain = await createStuffDocumentsChain({
      llm: this.llm!,
      prompt,
    });

    this.chain = await createRetrievalChain({
      retriever: this.retriever!,
      combineDocsChain: documentChain,
    });
  }

  async storeMemory(memory: string): Promise<void> {
    if (!this.initialized) await this.initialize();

    const _document = new Document({
      pageContent: memory,
      metadata: { source: "memory" },
    });

    this.documents.push(_document);
    await this.vectorStore?.addDocuments([_document]);
  }

  async getRelevantMemory(query: string): Promise<{ context: Document[]; answer: string }> {
    if (!this.initialized) await this.initialize();
    if (!this.chain) await this.initializeChain();

    const response = await this.chain!.invoke({
      input: query,
    });
    return response;
  }
}
