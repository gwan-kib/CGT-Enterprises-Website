import { placeholderServices } from "../data/services";

export interface ContactFormValues {
  name: string;
  email: string;
  service: string;
  serviceOther: string;
  inquiryType: string;
  inquiryOther: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  serviceOther?: string;
  inquiryOther?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX_LENGTH = 5000;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.service === "other" && !values.serviceOther.trim()) {
    errors.serviceOther = "Please describe the service.";
  }

  if (values.inquiryType === "other" && !values.inquiryOther.trim()) {
    errors.inquiryOther = "Please describe your inquiry.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length > MESSAGE_MAX_LENGTH) {
    errors.message = "Please keep your message under 5,000 characters.";
  }

  return errors;
}

export type ContactSubmitOutcome =
  | { status: "success" }
  | { status: "validation-error"; details: Record<string, string> }
  | { status: "error" };

interface ContactSubmissionResponse {
  ok: boolean;
  code: string;
  requestId?: string;
  details?: Record<string, string>;
}

export function mapServerValidationErrors(
  details: Record<string, string>,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (details.name) {
    errors.name = details.name;
  }
  if (details.email) {
    errors.email = details.email;
  }
  if (details.message) {
    errors.message = details.message;
  }

  return errors;
}

export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactSubmitOutcome> {
  const endpoint = import.meta.env.VITE_APPS_SCRIPT_URL;

  if (!endpoint) {
    return { status: "error" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(buildPayload(values)),
    });

    if (!response.ok) {
      return { status: "error" };
    }

    const result = (await response.json()) as ContactSubmissionResponse;

    if (result.ok) {
      return { status: "success" };
    }

    if (result.code === "VALIDATION_ERROR") {
      return { status: "validation-error", details: result.details ?? {} };
    }

    return { status: "error" };
  } catch {
    return { status: "error" };
  }
}

function buildPayload(values: ContactFormValues) {
  return {
    submissionType: "contact",
    name: values.name.trim(),
    email: values.email.trim(),
    service: resolveService(values),
    inquiryType: resolveInquiryTypeValue(values),
    message: values.message.trim(),
  };
}

function resolveService(values: ContactFormValues): string {
  if (values.service === "other") {
    return values.serviceOther.trim();
  }

  return placeholderServices.find((item) => item.id === values.service)?.name ?? "";
}

function resolveInquiryTypeValue(values: ContactFormValues): string {
  if (values.inquiryType === "other") {
    return values.inquiryOther.trim();
  }

  return values.inquiryType
    ? values.inquiryType.charAt(0).toUpperCase() + values.inquiryType.slice(1)
    : "";
}
