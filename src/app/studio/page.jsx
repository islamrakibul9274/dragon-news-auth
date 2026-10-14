'use client';

import { useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Sparkles, Send, Copy, Check, Loader2, BookOpen, Quote, Clock, Mail } from "lucide-react";

export default function StudioPage() {
  const [topic, setTopic] = useState("The Acceleration of Autonomous AI Agents in 2026");
  const [loading, setLoading] = useState(false);
  const [edition, setEdition] = useState(null);
  const [copied, setCopied] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const sampleTopics = [
    "The Acceleration of Autonomous AI Agents in 2026",
    "Clean Fusion & Renewable Grid Breakthroughs",
    "Global Trade Route Realignments & Supply Chains",
    "Space Exploration & Lunar Resource Treaties",
  ];

  const handleGenerate = async (customTopic) => {
    const t = customTopic || topic;
    if (!t) return;
    setLoading(true);
    setEmailMessage("");

    try {
      const res = await fetch("/api/ai/newsletter-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: t }),
      });
      const data = await res.json();
      if (data.edition) {
        setEdition(data.edition);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!edition) return;
    const text = `# ${edition.subjectLine}\n\n## ${edition.headline}\n*${edition.subtitle}* • ${edition.estimatedReadTime}\n\n### Lead Story: ${edition.heroStory?.title}\n${edition.heroStory?.content}\n\n**Why It Matters:** ${edition.heroStory?.whyItMatters}\n\n### Quick Bites:\n${edition.quickBites?.map((q) => `- **${q.title}:** ${q.detail}`).join("\n")}\n\n### Deep Dive: ${edition.deepDive?.title}\n${edition.deepDive?.content}\n\n> "${edition.quoteOfTheDay?.quote}" — *${edition.quoteOfTheDay?.author}*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTestEmail = async () => {
    if (!emailTo || !edition) return;
    setSendingEmail(true);
    setEmailMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTo }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmailMessage("✓ Test dispatch delivered to " + emailTo);
      } else {
        setEmailMessage(data.error || "Delivery error.");
      }
    } catch {
      setEmailMessage("Failed to send.");
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-white text-gray-900 pb-20">
      <Header />
      <Navbar />

      <main className="w-11/12 max-w-5xl mx-auto pt-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Groq Intelligence Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-serif tracking-tight mb-3">
            AI Newsletter Creation Studio
          </h1>
          <p className="text-sm text-gray-600">
            Generate publication-ready morning newsletter editions on any theme or breaking topic in seconds.
          </p>
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-3xl mb-8 shadow-xs">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Edition Theme or Prompt
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Next-Gen Semiconductors and Global Chip Geopolitics"
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={loading || !topic}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-red-600/25 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Edition</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-200/80">
            <span className="text-[11px] font-medium text-gray-500">
              Try a theme:
            </span>
            {sampleTopics.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTopic(t);
                  handleGenerate(t);
                }}
                className="text-xs px-2.5 py-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Generated Edition Preview */}
        {edition ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in duration-300">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2.5 py-1 bg-red-50 text-red-600 font-bold rounded-lg uppercase">
                  Issue #{edition.editionNumber || 142}
                </span>
                <span>•</span>
                <span>{edition.editionDate}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {edition.estimatedReadTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied Markdown" : "Copy Markdown"}</span>
                </button>
              </div>
            </div>

            {/* Email Subject Line */}
            <div className="p-3.5 bg-neutral-900 text-white rounded-2xl text-xs flex items-center justify-between">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                  Inbox Subject Line
                </span>
                <span className="font-semibold text-amber-300">{edition.subjectLine}</span>
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black font-serif text-gray-950 mb-2 leading-tight">
                {edition.headline}
              </h2>
              <p className="text-base text-gray-600 font-medium">
                {edition.subtitle}
              </p>
            </div>

            {/* Lead Story */}
            <div className="p-6 bg-red-50/40 border border-red-100 rounded-2xl">
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-600 block mb-2">
                Today&apos;s Lead Story
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {edition.heroStory?.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                {edition.heroStory?.content}
              </p>
              <div className="pt-3 border-t border-red-200/60 text-xs text-gray-600">
                <strong className="text-gray-900">Why It Matters: </strong>
                {edition.heroStory?.whyItMatters}
              </div>
            </div>

            {/* Quick Bites */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                The Quick Bites (3-Minute Scan)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {edition.quickBites?.map((bite, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-150 rounded-xl">
                    <h5 className="font-bold text-sm text-gray-900 mb-1">
                      {bite.title}
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {bite.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Dive */}
            {edition.deepDive && (
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-2">
                  Special Investigation
                </span>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {edition.deepDive.title}
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {edition.deepDive.content}
                </p>
              </div>
            )}

            {/* Quote of the Day */}
            {edition.quoteOfTheDay && (
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl text-center">
                <Quote className="w-6 h-6 text-amber-500 mx-auto mb-2 opacity-60" />
                <p className="text-base font-serif italic text-gray-800 mb-2 max-w-xl mx-auto">
                  &ldquo;{edition.quoteOfTheDay.quote}&rdquo;
                </p>
                <span className="text-xs font-bold text-amber-800 tracking-wider uppercase">
                  — {edition.quoteOfTheDay.author}
                </span>
              </div>
            )}

            {/* Broadcast / Send Test Email via Resend */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Send Edition to Email (Powered by Resend)
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="Enter your email to receive this edition"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <button
                  onClick={handleSendTestEmail}
                  disabled={sendingEmail || !emailTo}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-black active:scale-95 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {sendingEmail ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Dispatch</span>
                    </>
                  )}
                </button>
              </div>
              {emailMessage && (
                <p className="text-xs text-emerald-600 font-medium mt-2">
                  {emailMessage}
                </p>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
