import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

export async function POST(req) {
  try {
    if (!groq) {
      return NextResponse.json(
        { error: "Groq AI is not configured." },
        { status: 500 }
      );
    }

    const { question, articleTitle, articleContent } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const prompt = `You are "Dragon AI", an intelligent news analyst assistant for The Dragon Dispatch newsletter.
A reader is asking a question about the following news story:

Story Title: ${articleTitle || "Current News Story"}
Story Details: ${articleContent || "N/A"}

Reader Question: "${question}"

Provide a concise, highly informative, balanced answer in 2 to 3 paragraphs maximum. Use markdown formatting where helpful.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an articulate, objective news analysis assistant.",
        },
        { role: "user", content: prompt },
      ],
      model: "qwen/qwen3.8-27b",
      temperature: 0.5,
    });

    const answer = completion.choices[0]?.message?.content || "";

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI Ask error:", error);
    return NextResponse.json(
      { error: "Failed to answer question. Please try again." },
      { status: 500 }
    );
  }
}
