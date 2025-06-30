# nao.ai 🧠 - Your Private AI Companion

(脑; pronounced /now • dot • ai/); _nao_ means "brain" in Mandarin.

**nao.ai** is Your Private AI Companion, a sleek and intuitive web interface that allows you to run and chat with powerful open-source language models directly on your own machine. Your conversations are private and happen entirely offline.

![nao-ai-demo](https://github.com/user-attachments/assets/d73be367-53d6-46a8-bc5c-f23d8d9cc687)

## ✨ Features

- 💬 **Chat with any Model**: Seamlessly interact with any language model supported by [Ollama](https://ollama.com/search).
- 🧠 **Reasoning Insights**: View the internal thought process of thinking/reasoning models.
- 📑 **RAG Document Support**: Securely upload and chat with your documents (.pdf & .txt) using Retrieval-Augmented Generation.
- 🔒 **Privacy-Focused**: All processing is done locally. Your data never leaves your machine.
- 🪄 **Easy Docker Setup**: Get up and running with a single command using Docker Compose.

## 🚀 Getting Started with Docker

This is the easiest and recommended way to get started.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the Repository

```bash
git clone https://github.com/wazeerc/nao.ai.git && cd nao.ai
```

### 2. Configure Your Models

Create a `.env` file by copying the example file.

```bash
cp .env.example .env
```

Now, open the `.env` file and configure your models:

```bash
# .env
NUXT_PUBLIC_OLLAMA_MODEL="deepseek-r1:1.5b"
NUXT_PUBLIC_EMBEDDING_MODEL="nomic-embed-text"
NUXT_PUBLIC_OLLAMA_URL="http://localhost:11434"

COMPOSE_PROJECT_NAME=nao-ai
```

> [!NOTE]
> The model will be automatically downloaded the first time you start the application. You can find more models on the [Ollama Library](https://ollama.com/library).

### 3. Run the Application

```bash
docker compose up -d
```

The application will be available at `http://localhost:3000`.

### 4. Stop the Application

To stop the application, run:

```bash
docker compose down
```

## 📄 RAG Document Support

nao.ai now supports Retrieval-Augmented Generation (RAG) to chat with your documents:

- **Supported formats**: PDF and TXT files (up to 15MB)
- **Upload documents**: Click the 📎 attachment icon in the chat input
- **Contextual responses**: Get answers based on your uploaded documents

## 🧑‍💻 Local Development Setup

For those who prefer to run the application without Docker.

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)
- [Ollama](https://ollama.com) installed locally

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Your Models

Follow step 2 from the "Getting Started with Docker" section to create and configure your `.env` file.

### 3. Run Ollama

Pull and run your desired model with Ollama.

```bash
# Pull the main model
ollama pull deepseek-r1:1.5b # Replace with your chosen model

# Pull the embedding model for RAG support
ollama pull nomic-embed-text
```

### 4. Start the Dev Server

```bash
pnpm dev
```

The development server will be available at `http://localhost:3000`.

## 🛠️ Built With

- [Nuxt.js 3](https://nuxt.com/)
- [Nuxt UI 3](https://ui.nuxt.com/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [TailwindCSS Motion](https://github.com/romboHQ/tailwindcss-motion)
- [Marked](https://github.com/markedjs/marked)

## 📚 Additional Information

### Available Models

You can use any model supported by Ollama. The model name in your `.env` file must match exactly with the model name from Ollama's library.

Some recently tested models:
- `deepseek-r1:1.5b`
- `llama3.2:1b`
- `qwen2.5:0.5b`
- `gemma3:1b`

### View Installed Models

To see which models are installed in your Docker volume:

```bash
echo 'Installed models: ' && docker run --rm -v nao-ai_data:/data alpine ls /data/models/manifests/registry.ollama.ai/library
```

### Environment Variables

- `NUXT_PUBLIC_OLLAMA_MODEL`: Model name used by both frontend and Docker.
- `NUXT_PUBLIC_EMBEDDING_MODEL`: Embedding model name used for RAG functionality.
- `NUXT_PUBLIC_OLLAMA_URL`: Ollama server URL used by the frontend.
- `COMPOSE_PROJECT_NAME`: The project name for Docker Compose.

