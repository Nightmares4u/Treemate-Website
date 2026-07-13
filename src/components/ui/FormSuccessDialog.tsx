import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { CornerMarks } from "./CornerMarks";
import { easeOutExpo } from "../../lib/motion";

interface FormSuccessDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

/** Confirmation shown after a contact submission lands in the sheet. */
export function FormSuccessDialog({
  open,
  message,
  onClose,
}: FormSuccessDialogProps) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easeOutExpo }}
        >
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-success-title"
            className="relative w-full max-w-md rounded-3xl border border-navy/10 bg-cream-soft px-8 py-10 text-center shadow-2xl shadow-navy/20"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
          >
            <CornerMarks color="#0D9488" opacity={0.5} size={18} inset={-2} />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full p-1.5 text-navy/40 transition-colors hover:bg-navy/5 hover:text-navy focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <X className="h-4 w-4" strokeWidth={2.4} />
            </button>

            <motion.span
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal shadow-lg shadow-teal/30"
              initial={reduced ? false : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.5, ease: easeOutExpo }}
            >
              <Check className="h-8 w-8 text-white" strokeWidth={2.6} />
            </motion.span>

            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
              Form submitted
            </span>

            <h3
              id="form-success-title"
              className="font-heading text-2xl font-bold leading-snug text-navy"
            >
              Thanks — we've got it.
            </h3>

            <p className="mt-3 leading-relaxed text-navy/70">{message}</p>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
