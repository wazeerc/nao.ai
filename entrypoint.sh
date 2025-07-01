#!/bin/sh

# Start Ollama in the background
ollama serve &

# Wait for Ollama to be available
echo "Waiting for Ollama to start..."
while ! ollama list > /dev/null 2>&1; do
    sleep 2
done

# Pull the required model using the environment variables
if [ -z "$NUXT_PUBLIC_OLLAMA_MODEL" ] || [ -z "$NUXT_PUBLIC_EMBEDDING_MODEL" ]; then
    echo "Error: Required environment variables not set"
    echo "NUXT_PUBLIC_OLLAMA_MODEL: $NUXT_PUBLIC_OLLAMA_MODEL"
    echo "NUXT_PUBLIC_EMBEDDING_MODEL: $NUXT_PUBLIC_EMBEDDING_MODEL"
    exit 1
fi

echo "Pulling ${NUXT_PUBLIC_OLLAMA_MODEL} model..."
if ! ollama pull ${NUXT_PUBLIC_OLLAMA_MODEL}; then
    echo "Failed to pull ${NUXT_PUBLIC_OLLAMA_MODEL}"
    exit 1
fi

echo "Pulling ${NUXT_PUBLIC_EMBEDDING_MODEL} model..."
if ! ollama pull ${NUXT_PUBLIC_EMBEDDING_MODEL}; then
    echo "Failed to pull ${NUXT_PUBLIC_EMBEDDING_MODEL}"
    exit 1
fi

# Kill the background Ollama process
pkill ollama

# Start Ollama in the foreground
exec ollama serve
