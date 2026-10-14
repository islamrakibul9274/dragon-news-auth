'use client';

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { getPusherClient } from "../lib/pusher";
import { MessageSquare, Send, Loader2 } from "lucide-react";

export default function CommentsSection({ articleId }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments
  useEffect(() => {
    if (!articleId) return;
    setLoading(true);
    fetch(`/api/comments?articleId=${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.comments) setComments(data.comments);
      })
      .catch((err) => console.error("Failed to load comments:", err))
      .finally(() => setLoading(false));

    // Pusher real-time listener
    const pusher = getPusherClient();
    if (pusher) {
      const channel = pusher.subscribe(`article-${articleId}`);
      channel.bind("new-comment", (data) => {
        if (data?.comment) {
          setComments((prev) => [data.comment, ...prev]);
        }
      });

      return () => {
        pusher.unsubscribe(`article-${articleId}`);
      };
    }
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          authorName: user?.displayName || "Anonymous Reader",
          authorEmail: user?.email || "",
          authorAvatar: user?.photoURL || "/assets/user.png",
          content: newComment,
        }),
      });

      const data = await res.json();
      if (data.success && data.comment) {
        setComments((prev) => {
          if (prev.some((c) => c._id === data.comment._id)) return prev;
          return [data.comment, ...prev];
        });
        setNewComment("");
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t-2 border-gray-150">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-red-600" />
        <h3 className="text-xl font-black text-gray-950 font-serif">
          Reader Discussion ({comments.length})
        </h3>
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-3xl focus-within:border-red-600 focus-within:bg-white transition-all shadow-2xs">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              user
                ? `Add your perspective as ${user.displayName || user.email}...`
                : "Share your perspective on this dispatch..."
            }
            rows={3}
            className="w-full bg-transparent border-none text-sm text-gray-900 placeholder-gray-400 focus:outline-none resize-none font-medium"
          />

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-[11px] text-gray-500 font-medium">
              {user ? `Posting as ${user.displayName || user.email}` : "Civil discourse only."}
            </span>

            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-red-600/25 disabled:opacity-40"
            >
              {submitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Post Thought</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-6 text-center text-gray-500 text-xs font-medium">
            Loading thoughts...
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-5 bg-white border-2 border-gray-150 rounded-2xl shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src={comment.authorAvatar || "/assets/user.png"}
                    alt={comment.authorName}
                    className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/user.png";
                    }}
                  />
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">
                      {comment.authorName}
                    </h5>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-normal">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500 text-xs font-medium">
            No perspectives yet. Be the first to share your perspective!
          </div>
        )}
      </div>
    </div>
  );
}
