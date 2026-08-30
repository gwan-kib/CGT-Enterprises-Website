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
  inquiryType?: string;
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

  if (!values.inquiryType) {
    errors.inquiryType = "Please select an inquiry type.";
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
  if (details.inquiryType) {
    errors.inquiryType = details.inquiryType;
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
    service: values.service,
    inquiryType: values.inquiryType,
    message: buildMessage(values),
  };
}

function buildMessage(values: ContactFormValues): string {
  const details: string[] = [];

  if (values.service === "other" && values.serviceOther.trim()) {
    details.push("Service (other): " + values.serviceOther.trim());
  }

  if (values.inquiryType === "other" && values.inquiryOther.trim()) {
    details.push("Inquiry type (other): " + values.inquiryOther.trim());
  }

  const message = values.message.trim();

  if (details.length === 0) {
    return message;
  }

  return details.join("\n") + "\n\n" + message;
}
