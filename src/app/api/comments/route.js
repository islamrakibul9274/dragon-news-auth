import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Comment from "../../../models/Comment";
import { pusherServer } from "../../../lib/pusher";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const comments = await Comment.find({ articleId })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve comments." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { articleId, authorName, authorEmail, authorAvatar, content } =
      await req.json();

    if (!articleId || !content?.trim()) {
      return NextResponse.json(
        { error: "Article ID and content are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newComment = await Comment.create({
      articleId,
      authorName: authorName || "Anonymous Reader",
      authorEmail: authorEmail || "",
      authorAvatar: authorAvatar || "/assets/user.png",
      content: content.trim(),
    });

    // Real-time broadcast with Pusher
    try {
      if (pusherServer) {
        await pusherServer.trigger(`article-${articleId}`, "new-comment", {
          comment: newComment,
        });
      }
    } catch (pusherErr) {
      console.warn("Pusher broadcast notice:", pusherErr.message || pusherErr);
    }

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Post comment error:", error);
    return NextResponse.json(
      { error: "Failed to post comment." },
      { status: 500 }
    );
  }
}
