"use client";

import { useState } from "react";
import { ChevronDown, MessageSquare, Reply, Send, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

type ToolKey = "dm" | "reply";

export function DeveloperTools() {
  const [open, setOpen] = useState(false);
  const [tool, setTool] = useState<ToolKey>("dm");
  const [commentId, setCommentId] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    if (!commentId.trim() || !message.trim()) {
      setError("Both Comment ID and Message are required.");
      return;
    }
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const data =
        tool === "dm"
          ? await api.testSendDM(commentId.trim(), message)
          : await api.testReplyComment(commentId.trim(), message);
      setResponse(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setError(
        e?.response?.data?.detail ??
          e?.message ??
          "Request failed — check backend logs.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard delay={0.18} className="overflow-hidden" data-testid="developer-tools-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-testid="developer-tools-toggle"
        className="w-full flex items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-aurora-soft">
            <Terminal className="size-4 text-brand-500" />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
              Developer Tools
            </h3>
            <p className="text-sm text-ink-500 dark:text-ink-300">
              Manually fire a DM or comment reply to validate your webhook flow
            </p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex size-9 items-center justify-center rounded-xl bg-white/60 dark:bg-white/5 text-ink-700 dark:text-ink-200"
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="dev-tools-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              <div className="inline-flex rounded-2xl bg-white/70 dark:bg-white/5 border hairline p-1 text-xs mb-4">
                <ToolTab
                  active={tool === "dm"}
                  onClick={() => setTool("dm")}
                  icon={<MessageSquare className="size-3.5" />}
                  label="Test Send DM"
                  testid="dev-tab-dm"
                />
                <ToolTab
                  active={tool === "reply"}
                  onClick={() => setTool("reply")}
                  icon={<Reply className="size-3.5" />}
                  label="Test Comment Reply"
                  testid="dev-tab-reply"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-semibold text-ink-800 dark:text-ink-100 mb-1.5 block">
                    Comment ID
                  </label>
                  <input
                    data-testid="dev-comment-id-input"
                    value={commentId}
                    onChange={(e) => setCommentId(e.target.value)}
                    placeholder="e.g., 17850912345678901"
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-[11px] text-ink-500 dark:text-ink-300">
                    Find this in the webhook event payload.
                  </p>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-ink-800 dark:text-ink-100 mb-1.5 block">
                    Message
                  </label>
                  <input
                    data-testid="dev-message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      tool === "dm"
                        ? "Hey! Here's the info you asked for…"
                        : "Sent you a DM!"
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Button
                  data-testid="dev-tools-run"
                  onClick={run}
                  disabled={loading}
                  size="md"
                >
                  <Send className="size-4" />
                  {loading
                    ? "Sending…"
                    : tool === "dm"
                    ? "Send Test DM"
                    : "Post Test Reply"}
                </Button>
                {error && (
                  <span className="text-xs text-rose-600 dark:text-rose-300">
                    {error}
                  </span>
                )}
              </div>

              {response && (
                <motion.pre
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-testid="dev-tools-response"
                  className="mt-4 max-h-64 overflow-auto rounded-2xl bg-ink-950/85 text-ink-50 text-[12px] leading-relaxed p-4 font-mono border hairline"
                >
                  {response}
                </motion.pre>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

const inputClass =
  "w-full rounded-2xl bg-white/70 dark:bg-white/5 border hairline px-4 py-2.5 text-sm text-ink-900 dark:text-ink-50 placeholder:text-ink-400 focus-ring focus:border-brand-400 outline-none";

function ToolTab({
  active,
  onClick,
  icon,
  label,
  testid,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  testid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testid}
      className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-xl font-medium transition-colors ${
        active
          ? "bg-aurora text-white shadow-glow"
          : "text-ink-600 dark:text-ink-200 hover:text-ink-900 dark:hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
