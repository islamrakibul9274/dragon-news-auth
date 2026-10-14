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

    const { topic = "Today in Tech & Global Affairs" } = await req.json();

    const prompt = `You are the Editor-in-Chief of The Dragon Dispatch, an acclaimed morning newsletter.
Create a full, beautifully structured morning newsletter edition focusing on the topic: "${topic}".

Format your response in JSON (output strictly JSON):
{
  "editionNumber": 142,
  "editionDate": "${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}",
  "subjectLine": "🐉 The Dragon Dispatch: [Catchy, high-open-rate subject line]",
  "headline": "[Main Lead Headline]",
  "subtitle": "[Sub-headline capturing the big idea]",
  "estimatedReadTime": "4 min read",
  "heroStory": {
    "title": "[Lead story title]",
    "content": "[Engaging 2-paragraph narrative breakdown of the lead story.]",
    "whyItMatters": "[1-2 sentences on why readers should care.]"
  },
  "quickBites": [
    { "title": "[Bullet 1 title]", "detail": "[1-2 sentence crisp insight]" },
    { "title": "[Bullet 2 title]", "detail": "[1-2 sentence crisp insight]" },
    { "title": "[Bullet 3 title]", "detail": "[1-2 sentence crisp insight]" }
  ],
  "deepDive": {
    "title": "[Deep Dive Investigation/Analysis Title]",
    "content": "[2-paragraph analytical deep dive providing historical perspective or technical nuance.]"
  },
  "quoteOfTheDay": {
    "quote": "[A thought-provoking relevant quote]",
    "author": "[Author Name]"
  }
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert newsletter curator and editor who outputs valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: "qwen/qwen3.8-27b",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const parsed = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return NextResponse.json({
      success: true,
      edition: parsed,
    });
  } catch (error) {
    console.error("Newsletter Builder error:", error);
    return NextResponse.json(
      { error: "Failed to generate newsletter edition." },
      { status: 500 }
    );
  }
}
