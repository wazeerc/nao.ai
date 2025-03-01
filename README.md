# iLlama

A web interface built with Nuxt for interacting with any OLlama language model locally.

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)
- pnpm
- oLlama (for local development)

## Technologies & Dependencies

- Nuxt.js 3
- Nuxt UI 3
- Tailwind CSS v4
- [TailwindCSS Motion](https://github.com/romboHQ/tailwindcss-motion)
- [Marked](https://github.com/markedjs/marked)

## Environment Setup

1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Configure your model in the `.env` file:
```bash
# Model Configuration
NUXT_PUBLIC_LLAMA_MODEL="deepseek-r1:1.5b"
LLAMA_MODEL="deepseek-r1:1.5b"
```

Note: Both environment variables should typically use the same model name.

## Docker Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd iLlama
```

2. Start the application using Docker Compose:
```bash
docker compose up -d
```

3. Stop the application using Docker Compose:
```bash
docker compose down
```

The application will be available at `http://localhost:3000`

## Local Development Setup

1. Install dependencies and start dev server:
```bash
pnpm install
pnpm dev
```

2. Install [oLlama](https://ollama.com)

3. Pull and run your desired model:
```bash
ollama run deepseek-r1:1.5b  # Replace 'deepseek-r1:1.5b' with your actual model name
```

The development server will be available at `http://localhost:3000`

## Available Models

You can use any model supported by oLlama. Some popular options include:
- deepseek
- codellama
- mistral
- llama2

The following models were recently tested in a containerized environment and ran smoothly:
- `deepseek-r1:1.5b`
- `llama3.2:1b`
- `qwen2.5:0.5b`

The model name in your `.env` file must match exactly with the model name from oLlama's library.
For example: `deepseek-r1:1.5b` not just `deepseek`.

Check [oLlama's model library](https://ollama.com/library) for more options.

## Environment Variables

- `NUXT_PUBLIC_LLAMA_MODEL`: Model name used by the frontend
- `LLAMA_MODEL`: Model name for Docker container to pull

Both variables should typically match and use the exact model name from oLlama's library.

