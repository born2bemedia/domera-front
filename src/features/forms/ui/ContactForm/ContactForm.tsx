"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { submitContactForm } from "@/features/forms/api/submitForm";
import {
  type ContactFormSchema,
  contactFormSchema,
} from "@/features/forms/model/schemas";

import { FormPopup } from "../FormPopup/FormPopup";
import styles from "./ContactForm.module.scss";

export const ContactForm = () => {
  const t = useTranslations("forms");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      budgetRange: "",
      stylePreference: "",
      constructionTimeline: "",
      siteStatus: "",
      professionalStatus: "",
      buildLocation: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setError(null);
    try {
      await submitContactForm(data);
      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  };

  const TIMELINE_OPTIONS = [
    { value: "within-3-months", label: t("contact.timelineWithin3", { fallback: "Within 3 months" }) },
    { value: "3-6-months", label: t("contact.timeline36", { fallback: "3–6 months" }) },
    { value: "6-12-months", label: t("contact.timeline612", { fallback: "6–12 months" }) },
    { value: "12-plus-months", label: t("contact.timeline12plus", { fallback: "12+ months" }) },
    { value: "not-sure", label: t("contact.timelineNotSure", { fallback: "Not sure yet" }) },
  ];

  const SITE_STATUS_OPTIONS = [
    { value: "own-land", label: t("contact.siteOwn", { fallback: "I own the land" }) },
    { value: "purchasing", label: t("contact.sitePurchasing", { fallback: "Purchase in progress" }) },
    { value: "searching", label: t("contact.siteSearching", { fallback: "Searching for land" }) },
    { value: "no-site", label: t("contact.siteNone", { fallback: "No site yet" }) },
  ];

  const PROFESSIONAL_STATUS_OPTIONS = [
    { value: "individual", label: t("contact.proIndividual", { fallback: "Private individual" }) },
    { value: "architect", label: t("contact.proArchitect", { fallback: "Architect / Designer" }) },
    { value: "developer", label: t("contact.proDeveloper", { fallback: "Developer" }) },
    { value: "contractor", label: t("contact.proContractor", { fallback: "Contractor" }) },
    { value: "other", label: t("contact.proOther", { fallback: "Other" }) },
  ];

  const LOCATION_OPTIONS = [
    { value: "urban", label: t("contact.locUrban", { fallback: "Urban" }) },
    { value: "suburban", label: t("contact.locSuburban", { fallback: "Suburban" }) },
    { value: "rural", label: t("contact.locRural", { fallback: "Rural / Countryside" }) },
    { value: "coastal", label: t("contact.locCoastal", { fallback: "Coastal" }) },
    { value: "mountain", label: t("contact.locMountain", { fallback: "Mountain / Alpine" }) },
  ];

  return (
    <>
      <FormPopup
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
        ariaLabelledBy="contact-success-title"
        panelClassName={styles.contact__popup}
      >
        <button
          type="button"
          className={styles.contact__popupClose}
          onClick={() => setIsSuccess(false)}
          aria-label={t("close", { fallback: "Close" })}
        >
          &times;
        </button>
        <h3 id="contact-success-title" className={styles.contact__popupTitle}>
          {t("contact.successTitle", {
            fallback: "Thank you for contacting Doméra!",
          })}
        </h3>
        <div className={styles.contact__popupText}>
          <p>
            {t("contact.successLine1", {
              fallback: "Your inquiry has been successfully received.",
            })}
          </p>
          <p>
            {t("contact.successLine2", {
              fallback:
                "Our team will carefully review your details and respond within 1–2 business days.",
            })}
          </p>
        </div>
        <button
          type="button"
          className={styles.contact__popupBtn}
          onClick={() => setIsSuccess(false)}
        >
          {t("close", { fallback: "Close" })}
        </button>
      </FormPopup>

      <form className={styles.contact} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          className={`${styles.contact__field} ${
            errors.firstName ? styles.contact__fieldError : ""
          }`}
        >
          <label className={styles.contact__label} htmlFor="contact-firstName">
            {t("contact.firstName", { fallback: "First Name" })}
          </label>
          <input
            id="contact-firstName"
            type="text"
            className={styles.contact__input}
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className={styles.contact__error}>{errors.firstName.message}</span>
          )}
        </div>

        <div
          className={`${styles.contact__field} ${
            errors.lastName ? styles.contact__fieldError : ""
          }`}
        >
          <label className={styles.contact__label} htmlFor="contact-lastName">
            {t("contact.lastName", { fallback: "Last Name" })}
          </label>
          <input
            id="contact-lastName"
            type="text"
            className={styles.contact__input}
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className={styles.contact__error}>{errors.lastName.message}</span>
          )}
        </div>

        <div
          className={`${styles.contact__field} ${
            errors.email ? styles.contact__fieldError : ""
          }`}
        >
          <label className={styles.contact__label} htmlFor="contact-email">
            {t("contact.email", { fallback: "Email Address" })}
          </label>
          <input
            id="contact-email"
            type="email"
            className={styles.contact__input}
            {...register("email")}
          />
          {errors.email && (
            <span className={styles.contact__error}>{errors.email.message}</span>
          )}
        </div>

        <div
          className={`${styles.contact__field} ${
            errors.phone ? styles.contact__fieldError : ""
          }`}
        >
          <label className={styles.contact__label} htmlFor="contact-phone">
            {t("contact.phone", { fallback: "Phone Number" })}
          </label>
          <input
            id="contact-phone"
            type="tel"
            className={styles.contact__input}
            {...register("phone")}
          />
          {errors.phone && (
            <span className={styles.contact__error}>{errors.phone.message}</span>
          )}
        </div>

        <div className={styles.contact__field}>
          <label className={styles.contact__label} htmlFor="contact-budgetRange">
            {t("contact.budgetRange", { fallback: "Estimated Budget Range" })}
          </label>
          <input
            id="contact-budgetRange"
            type="text"
            className={styles.contact__input}
            {...register("budgetRange")}
          />
        </div>

        <div className={styles.contact__field}>
          <label className={styles.contact__label} htmlFor="contact-stylePreference">
            {t("contact.stylePreference", { fallback: "Style Preference" })}
          </label>
          <input
            id="contact-stylePreference"
            type="text"
            className={styles.contact__input}
            {...register("stylePreference")}
          />
        </div>

        <div className={`${styles.contact__field} ${styles.contact__fieldFull} ${styles.contact__fieldSelect}`}>
          <label className={styles.contact__label} htmlFor="contact-constructionTimeline">
            {t("contact.constructionTimeline", {
              fallback: "Expected Construction Timeline",
            })}
          </label>
          <select
            id="contact-constructionTimeline"
            className={styles.contact__input}
            defaultValue=""
            {...register("constructionTimeline")}
          >
            <option value="" disabled hidden>
              {t("contact.selectPlaceholder", { fallback: "Select an option" })}
            </option>
            {TIMELINE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.contact__field} ${styles.contact__fieldFull} ${styles.contact__fieldSelect}`}>
          <label className={styles.contact__label} htmlFor="contact-siteStatus">
            {t("contact.siteStatus", { fallback: "Site Status" })}
          </label>
          <select
            id="contact-siteStatus"
            className={styles.contact__input}
            defaultValue=""
            {...register("siteStatus")}
          >
            <option value="" disabled hidden>
              {t("contact.selectPlaceholder", { fallback: "Select an option" })}
            </option>
            {SITE_STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.contact__field} ${styles.contact__fieldFull} ${styles.contact__fieldSelect}`}>
          <label className={styles.contact__label} htmlFor="contact-professionalStatus">
            {t("contact.professionalStatus", { fallback: "Professional Status" })}
          </label>
          <select
            id="contact-professionalStatus"
            className={styles.contact__input}
            defaultValue=""
            {...register("professionalStatus")}
          >
            <option value="" disabled hidden>
              {t("contact.selectPlaceholder", { fallback: "Select an option" })}
            </option>
            {PROFESSIONAL_STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.contact__field} ${styles.contact__fieldFull} ${styles.contact__fieldSelect}`}>
          <label className={styles.contact__label} htmlFor="contact-buildLocation">
            {t("contact.buildLocation", { fallback: "Intended Build Location" })}
          </label>
          <select
            id="contact-buildLocation"
            className={styles.contact__input}
            defaultValue=""
            {...register("buildLocation")}
          >
            <option value="" disabled hidden>
              {t("contact.selectPlaceholder", { fallback: "Select an option" })}
            </option>
            {LOCATION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.contact__field} ${styles.contact__fieldFull}`}>
          <label className={styles.contact__label} htmlFor="contact-additionalNotes">
            {t("contact.additionalNotes", { fallback: "Additional Notes" })}
          </label>
          <textarea
            id="contact-additionalNotes"
            rows={2}
            className={`${styles.contact__input} ${styles.contact__textarea}`}
            {...register("additionalNotes")}
          />
        </div>

        {error && <p className={styles.contact__submitError}>{error}</p>}

        <button
          type="submit"
          className={styles.contact__submit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t("loading", { fallback: "Sending…" })
            : t("contact.submit", { fallback: "→ Submit Inquiry" })}
        </button>

        <p className={styles.contact__caption}>
          {t("contact.responseNote", {
            fallback:
              "Your time matters. Once we receive your message, our team will carefully review your inquiry and respond within 1–2 business days.",
          })}
        </p>
      </form>
    </>
  );
};
