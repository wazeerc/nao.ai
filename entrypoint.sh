#!/bin/sh

# Start Ollama in the background
ollama serve &

# Wait for Ollama to be available
echo "Waiting for Ollama to start..."
while ! ollama list > /dev/null 2>&1; do
    sleep 2
done

# Pull the required model using the environment variable
echo "Pulling ${LLAMA_MODEL} model..."
ollama pull ${LLAMA_MODEL}

# Kill the background Ollama process
pkill ollama

# Start Ollama in the foreground
exec ollama serve
