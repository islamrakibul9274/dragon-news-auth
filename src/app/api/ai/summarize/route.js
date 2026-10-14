import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

export async function POST(req) {
  try {
    if (!groq) {
      return NextResponse.json(
        { error: "Groq AI service is not configured." },
        { status: 500 }
      );
    }

    const { title, details, category } = await req.json();

    if (!title && !details) {
      return NextResponse.json(
        { error: "Article title or details are required." },
        { status: 400 }
      );
    }

    const prompt = `You are the Lead Executive Editor at The Dragon Dispatch, a premier modern newsletter known for concise, sharp, high-signal journalism.
Analyze the following article and generate a structured executive summary.

Article Title: "${title || ""}"
Category: "${category || "General News"}"
Article Content: "${details || ""}"

Format your response in JSON matching this exact structure (do not wrap in markdown quotes if possible, output valid JSON):
{
  "oneLiner": "A punchy 1-sentence essence of the story.",
  "keyTakeaways": [
    "First crucial bullet point with bold keywords.",
    "Second crucial bullet point with bold keywords.",
    "Third crucial bullet point with bold keywords."
  ],
  "whyItMatters": "2 concise sentences explaining the broader implications.",
  "readingTimeMinutes": 2
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert news editor who outputs only valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: "qwen/qwen3.8-27b",
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    const parsed = JSON.parse(content || "{}");

    return NextResponse.json({
      success: true,
      summary: parsed,
    });
  } catch (error) {
    console.error("AI Summarize error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI summary.",
        fallback: {
          oneLiner: "Latest breaking coverage and critical updates from Dragon News.",
          keyTakeaways: [
            "Essential briefing details being processed in real-time.",
            "Full reporting available in the complete article text below.",
            "Verified by The Dragon Dispatch editorial desk.",
          ],
          whyItMatters: "Stay informed on developing events impacting regional and global affairs.",
          readingTimeMinutes: 3,
        },
      },
      { status: 200 }
    );
  }
}
