import { embedText } from "@/lib/embeddings/embed";
import { searchChunks } from "@/lib/qdrant/search";
import { ai } from "@/lib/embeddings/embed";

export async function answerQuestion(
  repositoryId: string,
  question: string
) {
  const embedding =
    await embedText(question);

  const chunks =
    await searchChunks(
      repositoryId,
      embedding,
      5
    );

  const context =
    chunks
      .map(
        (chunk) =>
          chunk.payload?.content
      )
      .join("\n\n");

  const prompt = `
You are a repository assistant.

Repository context:

${context}

Question:
${question}

Answer using only the context above.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return response.text;
}