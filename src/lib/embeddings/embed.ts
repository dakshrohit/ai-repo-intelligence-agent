export async function embedText(
  text: string
): Promise<number[]> {
  const response =
    await fetch(
      "http://localhost:11434/api/embeddings",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          model:
            "nomic-embed-text",
          prompt: text,
        }),
      }
    );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `Ollama Error: ${errorText}`
    );
  }

  const data =
    await response.json();

  if (
    !data.embedding ||
    data.embedding.length === 0
  ) {
    throw new Error(
      "No embedding returned"
    );
  }

  return data.embedding;
}