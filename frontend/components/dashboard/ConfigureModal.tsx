"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, KeyRound, MessageSquare, Reply, Power, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Reel, ReelConfig } from "@/lib/types";

interface ConfigureModalProps {
  reel: Reel | null;
  onClose: () => void;
  onSave: (id: string, config: ReelConfig) => Promise<void>;
}

export function ConfigureModal({ reel, onClose, onSave }: ConfigureModalProps) {
  const [form, setForm] = useState<ReelConfig>({
    trigger_keyword: "",
    dm_message: "",
    comment_reply: "",
    active: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reel) {
      setForm(reel.config);
      setError(null);
    }
  }, [reel]);

  useEffect(() => {
    if (!reel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reel, onClose]);

  const handleSave = async () => {
    if (!reel) return;
    try {
      setSaving(true);
      setError(null);
      await onSave(reel.id, form);
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          data-testid="configure-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-md" />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl glass-strong rounded-3xl border hairline shadow-card-dark overflow-hidden"
          >
            <span className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-aurora opacity-30 blur-3xl" />

            <div className="relative p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  {reel.thumbnail_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={reel.thumbnail_url}
                      alt=""
                      className="size-14 rounded-2xl object-cover border hairline"
                    />
                  )}
                  <div className="min-w-0">
                    <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                      Configure automation
                    </h2>
                    <p className="text-sm text-ink-500 dark:text-ink-300 line-clamp-1 mt-0.5">
                      {reel.caption || "Untitled reel"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  data-testid="configure-modal-close"
                  className="size-9 rounded-full bg-white/60 dark:bg-white/5 border hairline inline-flex items-center justify-center text-ink-600 dark:text-ink-200 hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <Field
                  label="Trigger keyword"
                  hint="Case-insensitive. Match must appear in the comment."
                  icon={<KeyRound className="size-4" />}
                >
                  <input
                    data-testid="configure-trigger-input"
                    value={form.trigger_keyword}
                    onChange={(e) =>
                      setForm({ ...form, trigger_keyword: e.target.value })
                    }
                    placeholder="info, guide, link, price…"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="DM message"
                  hint="Sent privately to the commenter."
                  icon={<MessageSquare className="size-4" />}
                >
                  <textarea
                    data-testid="configure-dm-input"
                    value={form.dm_message}
                    onChange={(e) =>
                      setForm({ ...form, dm_message: e.target.value })
                    }
                    rows={3}
                    placeholder="Hey! Thanks for your interest — here's the link…"
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <Field
                  label="Public comment reply"
                  hint="Posted publicly as a reply on the comment."
                  icon={<Reply className="size-4" />}
                >
                  <textarea
                    data-testid="configure-reply-input"
                    value={form.comment_reply}
                    onChange={(e) =>
                      setForm({ ...form, comment_reply: e.target.value })
                    }
                    rows={2}
                    placeholder="Sent you a DM!"
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <label
                  data-testid="configure-active-toggle"
                  className="flex items-center justify-between gap-4 rounded-2xl border hairline px-4 py-3 bg-white/60 dark:bg-white/[0.03] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-aurora-soft">
                      <Power className="size-4 text-brand-500" />
                    </span>
                    <div>
                      <div className="text-sm font-medium text-ink-900 dark:text-ink-50">
                        Enable automation
                      </div>
                      <div className="text-xs text-ink-500 dark:text-ink-300">
                        Toggle off to pause without losing your config.
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={form.active}
                    onChange={(v) => setForm({ ...form, active: v })}
                  />
                </label>

                {error && (
                  <div className="text-sm text-rose-600 dark:text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2">
                    {error}
                  </div>
                )}
              </div>

              <div className="mt-7 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                <Button variant="outline" onClick={onClose} data-testid="configure-cancel">
                  Cancel
                </Button>
                <Button
                  data-testid="configure-save"
                  onClick={handleSave}
                  disabled={saving}
                >
                  <Save className="size-4" />
                  {saving ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full rounded-2xl bg-white/70 dark:bg-white/5 border hairline px-4 py-3 text-sm text-ink-900 dark:text-ink-50 placeholder:text-ink-400 focus-ring focus:border-brand-400 outline-none";

function Field({
  label,
  hint,
  icon,
  children,
}: {
  label: string;
  hint?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-ink-500 dark:text-ink-300">{icon}</span>
        <label className="text-[13px] font-semibold text-ink-800 dark:text-ink-100">
          {label}
        </label>
      </div>
      {children}
      {hint && (
        <p className="mt-1.5 text-[11.5px] text-ink-500 dark:text-ink-300">{hint}</p>
      )}
    </div>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-testid="configure-active-switch"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked
          ? "bg-gradient-to-r from-brand-500 to-magenta-500"
          : "bg-ink-300/60 dark:bg-white/10"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block size-5 rounded-full bg-white shadow ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
