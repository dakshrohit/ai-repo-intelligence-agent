import { z } from "zod";

export const connectRepositorySchema = z.object({
  githubUrl: z.string().url(),
});

export type ConnectRepositoryInput =
  z.infer<typeof connectRepositorySchema>;