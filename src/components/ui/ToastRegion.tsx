import { useEffect, useRef, useState } from "react";
import { TOAST_EVENT, type ToastDetail } from "../../utils/toast";

const TOAST_DURATION_MS = 4000;
const TOAST_LEAVE_MS = 250;

interface ActiveToast extends ToastDetail {
  id: number;
  leaving: boolean;
}

const toastIcons = {
  error: "error",
  info: "info",
  success: "check_circle",
} as const;

export function ToastRegion() {
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const nextToastId = useRef(0);
  const timeoutId = useRef<number | null>(null);
  const leaveTimeoutId = useRef<number | null>(null);

  function dismissToast() {
    if (timeoutId.current !== null) {
      window.clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    setToast((prev) => (prev ? { ...prev, leaving: true } : prev));

    leaveTimeoutId.current = window.setTimeout(() => {
      setToast(null);
      leaveTimeoutId.current = null;
    }, TOAST_LEAVE_MS);
  }

  useEffect(() => {
    function handleToast(event: Event) {
      const { message, tone } = (event as CustomEvent<ToastDetail>).detail;

      if (timeoutId.current !== null) {
        window.clearTimeout(timeoutId.current);
      }

      if (leaveTimeoutId.current !== null) {
        window.clearTimeout(leaveTimeoutId.current);
      }

      nextToastId.current += 1;
      setToast({ id: nextToastId.current, message, tone, leaving: false });
      timeoutId.current = window.setTimeout(dismissToast, TOAST_DURATION_MS);
    }

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToast);
      if (timeoutId.current !== null) {
        window.clearTimeout(timeoutId.current);
      }
      if (leaveTimeoutId.current !== null) {
        window.clearTimeout(leaveTimeoutId.current);
      }
    };
  }, []);

  return (
    <div
      aria-atomic="true"
      aria-live={toast?.tone === "error" ? "assertive" : "polite"}
      className="toast-region"
    >
      {toast && (
        <div
          className={`toast toast--${toast.tone}${toast.leaving ? " toast--leaving" : ""}`}
          key={toast.id}
        >
          <span aria-hidden="true" className="toast__icon material-symbols-rounded">
            {toastIcons[toast.tone]}
          </span>
          <span className="toast__message">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
