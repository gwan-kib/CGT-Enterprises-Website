export type ToastTone = "error" | "info" | "success";

export interface ToastDetail {
  message: string;
  tone: ToastTone;
}

export const TOAST_EVENT = "cgt:toast";

export function showToast(message: string, tone: ToastTone = "info") {
  window.dispatchEvent(
    new CustomEvent<ToastDetail>(TOAST_EVENT, {
      detail: { message, tone },
    }),
  );
}
