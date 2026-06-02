import { z } from "zod";

// Set to false to disable reCAPTCHA (e.g. development)
const ENABLE_RECAPTCHA = true;

const serviceSchema = z.string().optional();
const messageSchema = z.string().optional();
const recaptchaSchema = ENABLE_RECAPTCHA
  ? z.string().min(1, "Please complete the reCAPTCHA verification")
  : z.string().optional();

const phoneSchema = z
  .string()
  .min(1, "This field is required")
  .refine(
    (val) => /^[+]?[\d\s-]{10,}$/.test(val.replace(/\s/g, "")),
    "Please provide a valid phone number.",
  );

const companyNameSchema = z.string().optional();
const websiteSchema = z.string().optional();
const emailSchema = z
  .string()
  .min(1, "This field is required")
  .email("Please provide a valid email address.");

const fullNameSchema = z.string().min(1, "This field is required");

// 1. [PACKAGE NAME] / [SERVICE NAME] Request (same schema)
export const requestFormSchema = z.object({
  service: serviceSchema,
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  companyName: companyNameSchema,
  website: websiteSchema,
  message: messageSchema,
  recaptcha: recaptchaSchema,
});

export type RequestFormSchema = z.infer<typeof requestFormSchema>;

// 2. "Structure Your Idea" brief (home page)
const optionalText = z.string().optional();
const optionalPhoneSchema = z
  .string()
  .optional()
  .refine(
    (val) => !val || /^[+]?[\d\s-]{7,}$/.test(val.replace(/\s/g, "")),
    "Please provide a valid phone number.",
  );

export const briefFormSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  email: emailSchema,
  phone: optionalPhoneSchema,
  projectType: optionalText,
  projectSchedule: optionalText,
  stylePreferences: optionalText,
  projectNotes: optionalText,
});

export type BriefFormSchema = z.infer<typeof briefFormSchema>;

// 3. "Contact Doméra" inquiry (contacts page)
export const contactFormSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  email: emailSchema,
  phone: optionalPhoneSchema,
  budgetRange: optionalText,
  stylePreference: optionalText,
  constructionTimeline: optionalText,
  siteStatus: optionalText,
  professionalStatus: optionalText,
  buildLocation: optionalText,
  additionalNotes: optionalText,
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
