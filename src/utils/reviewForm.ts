import { getServiceName } from "../data/services";
import { getClientToken } from "./clientToken";

export interface ReviewFormValues {
  name: string;
  email: string;
  service: string;
  rating: number;
  summary: string;
  website: string;
}

export interface ReviewFormErrors {
  name?: string;
  email?: string;
  service?: string;
  rating?: string;
  summary?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUMMARY_MAX_LENGTH = 750;
const CLIENT_TOKEN_KEY = "cgt-review-client-token";

function normalizedLength(text: string): number {
  return text.normalize("NFKC").length;
}

export function validateReviewForm(values: ReviewFormValues): ReviewFormErrors {
  const errors: ReviewFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.service) {
    errors.service = "Please select a service type.";
  }

  if (!Number.isInteger(values.rating) || values.rating < 1 || values.rating > 5) {
    errors.rating = "Please choose a rating from 1 to 5.";
  }

  const summary = values.summary.trim();
  if (!summary) {
    errors.summary = "Please enter a review.";
  } else if (normalizedLength(summary) > SUMMARY_MAX_LENGTH) {
    errors.summary = "Please keep your review under 750 characters.";
  }

  return errors;
}

export type ReviewSubmitOutcome =
  | { status: "success" }
  | { status: "validation-error"; details: Record<string, string> }
  | { status: "duplicate" }
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

  if (details.name) {
    errors.name = details.name;
  }
  if (details.email) {
    errors.email = details.email;
  }
  if (details.service) {
    errors.service = details.service;
  }
  if (details.rating) {
    errors.rating = details.rating;
  }
  if (details.summary) {
    errors.summary = details.summary;
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

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(buildPayload(values)),
    });
  } catch {
    return { status: "error" };
  }

  if (!response.ok) {
    return { status: "error" };
  }

  let result: ReviewSubmissionResponse;
  try {
    result = (await response.json()) as ReviewSubmissionResponse;
  } catch {
    return { status: "error" };
  }

  switch (result.code) {
    case "REVIEW_SAVED":
      return { status: "success" };
    case "VALIDATION_ERROR":
      return { status: "validation-error", details: result.details ?? {} };
    case "DUPLICATE_SUBMISSION":
      return { status: "duplicate" };
    default:
      return { status: "error" };
  }
}

function buildPayload(values: ReviewFormValues) {
  return {
    submissionType: "review",
    name: values.name.trim(),
    email: values.email.trim(),
    service: getServiceName(values.service),
    rating: values.rating,
    summary: values.summary.trim(),
    website: values.website.trim(),
    clientToken: getClientToken(CLIENT_TOKEN_KEY),
  };
}
