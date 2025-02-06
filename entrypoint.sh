#!/bin/sh
set -e

# Start Ollama in the background
ollama serve &

# Wait for Ollama to be available
echo "Waiting for Ollama to start..."
until ollama list > /dev/null 2>&1; do
    sleep 2
done

# Pull the required model
echo "Pulling llama3.2 model..."
ollama pull llama3.2

# Kill the background Ollama process
pkill ollama

# Start Ollama in the foreground
exec ollama serve
