# iLlama - A web app built with Nuxt for Llama3.2

A web interface built with Nuxt.js for interacting with Llama 3.2 language model locally.

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)
- pnpm
- oLlama (for local development)

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

3. Pull and run the required model:
```bash
ollama pull llama3.2
ollama run llama3.2
```

The development server will be available at `http://localhost:3000`

