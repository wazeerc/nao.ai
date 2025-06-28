# nao.ai 🧠

(脑; pronounced /now • dot • ai/); _nao_ means "brain" in Mandarin.

**nao.ai** is a sleek and intuitive web interface that allows you to run and chat with powerful open-source language models directly on your own machine. Your conversations are private and happen entirely offline.

![nao-ai-demo](https://github.com/user-attachments/assets/d73be367-53d6-46a8-bc5c-f23d8d9cc687)

## ✨ Features

- 💬 **Chat with any Model**: Seamlessly interact with any language model supported by [oLlama](https://ollama.com/search).
- 🧠 **Reasoning Insights**: View the internal thought process of thinking/reasoning models.
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

### 2. Configure Your Model

Create a `.env` file by copying the example file.

```bash
cp .env.example .env
```

Now, open the `.env` file and set the `NUXT_PUBLIC_LLAMA_MODEL` you want to use. The `LLAMA_MODEL` variable will automatically use this value. For example:

```bash
# .env
NUXT_PUBLIC_LLAMA_MODEL="deepseek-r1:1.5b"
LLAMA_MODEL="$NUXT_PUBLIC_LLAMA_MODEL"
```

> [!NOTE]
> The model will be automatically downloaded the first time you start the application. You can find more models on the [oLLama Library](https://ollama.com/library).

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

## 🧑‍💻 Local Development Setup

For those who prefer to run the application without Docker.

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)
- [oLlama](https://ollama.com) installed locally

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Your Model

Follow step 2 from the "Getting Started with Docker" section to create and configure your `.env` file.

### 3. Run oLlama

Pull and run your desired model with oLlama.

```bash
ollama run deepseek-coder-v2:16b # Replace with the model from your .env file
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

You can use any model supported by oLlama. The model name in your `.env` file must match exactly with the model name from oLlama's library.

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

- `NUXT_PUBLIC_LLAMA_MODEL`: Model name used by the frontend.
- `LLAMA_MODEL`: Model name for the Docker container to pull.
- `COMPOSE_PROJECT_NAME`: The project name for Docker Compose.

