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
const MESSAGE_MAX_LENGTH = 1000;

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
    errors.message = "Please keep your message under 1,000 characters.";
  }

  return errors;
}

export async function submitContactForm(values: ContactFormValues): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  if (!endpoint) {
    throw new Error("Contact form endpoint is not configured.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(buildPayload(values)),
  });

  if (!response.ok) {
    throw new Error("Contact form submission failed.");
  }
}

function buildPayload(values: ContactFormValues) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    service: resolveServiceName(values.service),
    serviceDetails: values.service === "other" ? values.serviceOther.trim() : "",
    inquiryType: resolveInquiryType(values.inquiryType),
    inquiryDetails: values.inquiryType === "other" ? values.inquiryOther.trim() : "",
    message: values.message.trim(),
  };
}

function resolveServiceName(service: string): string {
  if (service === "other") {
    return "Other";
  }

  return placeholderServices.find((item) => item.id === service)?.name ?? "";
}

function resolveInquiryType(inquiryType: string): string {
  if (inquiryType === "other") {
    return "Other";
  }

  return inquiryType ? inquiryType.charAt(0).toUpperCase() + inquiryType.slice(1) : "";
}
