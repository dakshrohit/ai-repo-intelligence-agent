import { qdrant }
from "./client";

export async function
createCollection() {

  const collections =
    await qdrant.getCollections();

  const exists =
    collections.collections.some(
      c =>
        c.name ===
        "repository_chunks"
    );

  if (exists) return;

  await qdrant.createCollection(
    "repository_chunks",
    {
      vectors: {
  size: 768,
  distance: "Cosine"
}
    }
  );
  await qdrant.createPayloadIndex(
  "repository_chunks",
  {
    field_name: "repositoryId",
    field_schema: "keyword",
  }
);
}