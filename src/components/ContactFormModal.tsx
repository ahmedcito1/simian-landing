import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ open, onClose }: ContactFormModalProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    emailList: false,
  });

  const update = useCallback(
    (field: string, value: string | boolean) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start md:items-center justify-center px-4 py-8 overflow-y-auto overscroll-contain"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Backdrop overlay */}
          <motion.div
            className="absolute inset-0 modal-glass-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal panel */}
          <motion.div
            className="modal-glass-panel relative w-full max-w-lg flex-shrink-0"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Specular highlight */}
            <div className="modal-glass-panel__specular" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="modal-glass-close"
              aria-label="Close form"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10" style={{ padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1rem, 3vw, 2.5rem)' }}>
              {/* Header — centered */}
              <div className="text-center" style={{ marginBottom: '1.5rem' }}>
                <span className="liquid-glass-eyebrow inline-block" style={{ marginBottom: '0.75rem' }}>
                  Get in touch
                </span>
                <h2 className="display-heading text-2xl md:text-3xl" style={{ marginBottom: '0.75rem' }}>
                  Start a <span className="serif-italic text-simian">project</span>
                </h2>
                <p className="text-steel text-xs leading-relaxed" style={{ margin: '0 auto', maxWidth: '32ch' }}>
                  Tell us about your goals and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '0.85rem', padding: '0 clamp(0rem, 2vw, 2rem)' }}>
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="modal-glass-label">First</label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className="modal-glass-input"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="modal-glass-label">Last</label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className="modal-glass-input"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="modal-glass-label">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="modal-glass-input"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="modal-glass-label">
                    Phone Number With Country Code (+1, +90, +971…etc) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="modal-glass-input"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="modal-glass-label">
                    How can we help? Specify project type, size & duration if applicable. *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="modal-glass-input modal-glass-textarea"
                  />
                </div>

                {/* Email list checkbox */}
                <label className="modal-glass-checkbox-wrap justify-center">
                  <input
                    type="checkbox"
                    checked={form.emailList}
                    onChange={(e) => update("emailList", e.target.checked)}
                    className="modal-glass-checkbox"
                  />
                  <span className="text-steel text-xs">
                    Yes, sign me up for the email list!
                  </span>
                </label>

                {/* Submit — compact, centered */}
                <div className="flex justify-center pt-1">
                  <button type="submit" className="modal-glass-submit group">
                    Submit
                    <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center
                      group-hover:translate-x-0.5 group-hover:-translate-y-[1px]
                      group-hover:scale-105 transition-transform duration-300">
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M1 9L9 1M9 1H3M9 1V7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
