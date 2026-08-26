import { placeholderServices } from "../data/services";

export interface ReviewFormValues {
  service: string;
  serviceOther: string;
  summary: string;
  date: string;
}

export interface ReviewFormErrors {
  service?: string;
  serviceOther?: string;
  summary?: string;
  date?: string;
}

const SERVICE_MAX_LENGTH = 100;
const SUMMARY_MAX_LENGTH = 5000;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function validateReviewForm(values: ReviewFormValues): ReviewFormErrors {
  const errors: ReviewFormErrors = {};

  if (!values.service) {
    errors.service = "Please select a service.";
  }

  if (values.service === "other") {
    const otherService = values.serviceOther.trim();
    if (!otherService) {
      errors.serviceOther = "Please describe the service.";
    } else if (otherService.length > SERVICE_MAX_LENGTH) {
      errors.serviceOther = "Please keep the service under 100 characters.";
    }
  }

  const summary = values.summary.trim();
  if (!summary) {
    errors.summary = "Please enter a review.";
  } else if (summary.length > SUMMARY_MAX_LENGTH) {
    errors.summary = "Please keep your review under 5,000 characters.";
  }

  if (!values.date) {
    errors.date = "Please choose a date.";
  } else if (!DATE_PATTERN.test(values.date)) {
    errors.date = "Please choose a valid date.";
  }

  return errors;
}

export type ReviewSubmitOutcome =
  | { status: "success" }
  | { status: "validation-error"; details: Record<string, string> }
  | { status: "error" };

interface ReviewSubmissionResponse {
  ok: boolean;
  code: string;
  requestId?: string;
  details?: Record<string, string>;
}

export function mapServerValidationErrors(
  details: Record<string, string>,
): ReviewFormErrors {
  const errors: ReviewFormErrors = {};

  if (details.service) {
    errors.service = details.service;
  }
  if (details.summary) {
    errors.summary = details.summary;
  }
  if (details.date) {
    errors.date = details.date;
  }

  return errors;
}

export async function submitReviewForm(
  values: ReviewFormValues,
): Promise<ReviewSubmitOutcome> {
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

    const result = (await response.json()) as ReviewSubmissionResponse;

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

function buildPayload(values: ReviewFormValues) {
  return {
    submissionType: "review",
    service: resolveService(values),
    summary: values.summary.trim(),
    date: values.date,
  };
}

function resolveService(values: ReviewFormValues): string {
  if (values.service === "other") {
    return values.serviceOther.trim();
  }

  return placeholderServices.find((item) => item.id === values.service)?.name ?? "";
}
