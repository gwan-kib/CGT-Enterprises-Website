export interface PublicReview {
  id: string;
  date: string;
  service: string;
  rating: number;
  summary: string;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPublicReview(value: unknown): value is PublicReview {
  return isObject(value)
    && isNonEmptyString(value.id)
    && typeof value.date === "string"
    && isNonEmptyString(value.service)
    && isNonEmptyString(value.summary)
    && typeof value.rating === "number"
    && Number.isInteger(value.rating)
    && value.rating >= 1
    && value.rating <= 5;
}

export async function loadReviews(signal: AbortSignal): Promise<PublicReview[]> {
  const endpoint = import.meta.env.VITE_APPS_SCRIPT_URL;
  if (!endpoint?.trim()) throw new Error("Reviews unavailable");

  const url = new URL(endpoint);
  url.searchParams.set("resource", "reviews");
  const response = await fetch(url, { signal, cache: "no-store" });
  if (!response.ok) throw new Error("Reviews unavailable");

  const result: unknown = await response.json();
  if (!isObject(result) || result.ok !== true
    || result.code !== "REVIEWS_LOADED" || !Array.isArray(result.reviews)) {
    throw new Error("Reviews unavailable");
  }

  return result.reviews.filter(isPublicReview);
}

export function formatReviewDate(date: string): string {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!parts) return "Date unavailable";

  const [, year, month, day] = parts;
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  const leapYear = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (y < 1 || m < 1 || m > 12 || d < 1 || d > daysInMonth[m - 1]) {
    return "Date unavailable";
  }

  return `${month}/${day}/${year}`;
}
