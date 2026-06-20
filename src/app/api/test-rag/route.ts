import { NextResponse } from "next/server";

import { answerQuestion }
from "@/lib/agent/answer-question";

export async function GET() {
  const answer =
    await answerQuestion(
      "demo-repo",
      "How does authentication work?"
    );

  return NextResponse.json({
    answer,
  });
}