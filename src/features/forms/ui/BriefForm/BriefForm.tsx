"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { submitBriefForm } from "@/features/forms/api/submitForm";
import {
  type BriefFormSchema,
  briefFormSchema,
} from "@/features/forms/model/schemas";

import { FormPopup } from "../FormPopup/FormPopup";
import styles from "./BriefForm.module.scss";

export const BriefForm = () => {
  const t = useTranslations("forms");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BriefFormSchema>({
    resolver: zodResolver(briefFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      projectType: "",
      projectSchedule: "",
      stylePreferences: "",
      projectNotes: "",
    },
  });

  const onSubmit = async (data: BriefFormSchema) => {
    setError(null);
    try {
      await submitBriefForm(data);
      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  };

  return (
    <>
      <FormPopup
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
        ariaLabelledBy="brief-success-title"
        panelClassName={styles.brief__popup}
      >
        <button
          type="button"
          className={styles.brief__popupClose}
          onClick={() => setIsSuccess(false)}
          aria-label={t("close", { fallback: "Close" })}
        >
          &times;
        </button>
        <h3 id="brief-success-title" className={styles.brief__popupTitle}>
          {t("brief.successTitle", {
            fallback: "Thank you for contacting Doméra!",
          })}
        </h3>
        <div className={styles.brief__popupText}>
          <p>
            {t("brief.successLine1", {
              fallback: "Your request has been successfully received.",
            })}
          </p>
          <p>
            {t("brief.successLine2", {
              fallback:
                "Our team will review the details and reach out to you shortly to discuss the next steps of your project.",
            })}
          </p>
          <p>
            {t("brief.successLine3", {
              fallback:
                "We look forward to helping you move from planning to realization.",
            })}
          </p>
        </div>
        <button
          type="button"
          className={styles.brief__popupBtn}
          onClick={() => setIsSuccess(false)}
        >
          {t("close", { fallback: "Close" })}
        </button>
      </FormPopup>

      <form className={styles.brief} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div
        className={`${styles.brief__field} ${
          errors.firstName ? styles.brief__fieldError : ""
        }`}
      >
        <label className={styles.brief__label} htmlFor="brief-firstName">
          {t("brief.firstName", { fallback: "First Name" })}
        </label>
        <input
          id="brief-firstName"
          type="text"
          className={styles.brief__input}
          {...register("firstName")}
        />
        {errors.firstName && (
          <span className={styles.brief__error}>
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div
        className={`${styles.brief__field} ${
          errors.lastName ? styles.brief__fieldError : ""
        }`}
      >
        <label className={styles.brief__label} htmlFor="brief-lastName">
          {t("brief.lastName", { fallback: "Last Name" })}
        </label>
        <input
          id="brief-lastName"
          type="text"
          className={styles.brief__input}
          {...register("lastName")}
        />
        {errors.lastName && (
          <span className={styles.brief__error}>{errors.lastName.message}</span>
        )}
      </div>

      <div
        className={`${styles.brief__field} ${
          errors.email ? styles.brief__fieldError : ""
        }`}
      >
        <label className={styles.brief__label} htmlFor="brief-email">
          {t("brief.email", { fallback: "Email Address" })}
        </label>
        <input
          id="brief-email"
          type="email"
          className={styles.brief__input}
          {...register("email")}
        />
        {errors.email && (
          <span className={styles.brief__error}>{errors.email.message}</span>
        )}
      </div>

      <div
        className={`${styles.brief__field} ${
          errors.phone ? styles.brief__fieldError : ""
        }`}
      >
        <label className={styles.brief__label} htmlFor="brief-phone">
          {t("brief.phone", { fallback: "Phone Number" })}
        </label>
        <input
          id="brief-phone"
          type="tel"
          className={styles.brief__input}
          {...register("phone")}
        />
        {errors.phone && (
          <span className={styles.brief__error}>{errors.phone.message}</span>
        )}
      </div>

      <div className={styles.brief__field}>
        <label className={styles.brief__label} htmlFor="brief-projectType">
          {t("brief.projectType", { fallback: "Project Type" })}
        </label>
        <input
          id="brief-projectType"
          type="text"
          className={styles.brief__input}
          {...register("projectType")}
        />
      </div>

      <div className={styles.brief__field}>
        <label className={styles.brief__label} htmlFor="brief-projectSchedule">
          {t("brief.projectSchedule", { fallback: "Project Schedule" })}
        </label>
        <input
          id="brief-projectSchedule"
          type="text"
          className={styles.brief__input}
          {...register("projectSchedule")}
        />
      </div>

      <div className={`${styles.brief__field} ${styles.brief__fieldFull}`}>
        <label className={styles.brief__label} htmlFor="brief-stylePreferences">
          {t("brief.stylePreferences", { fallback: "Style Preferences" })}
        </label>
        <input
          id="brief-stylePreferences"
          type="text"
          className={styles.brief__input}
          {...register("stylePreferences")}
        />
      </div>

      <div className={`${styles.brief__field} ${styles.brief__fieldFull}`}>
        <label className={styles.brief__label} htmlFor="brief-projectNotes">
          {t("brief.projectNotes", { fallback: "Project Notes" })}
        </label>
        <textarea
          id="brief-projectNotes"
          rows={2}
          className={`${styles.brief__input} ${styles.brief__textarea}`}
          {...register("projectNotes")}
        />
      </div>

      {error && <p className={styles.brief__submitError}>{error}</p>}

      <button
        type="submit"
        className={styles.brief__submit}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? t("loading", { fallback: "Sending…" })
          : t("brief.submit", { fallback: "→ Submit Your Brief" })}
      </button>

      <p className={styles.brief__caption}>
        {t("brief.responseNote", {
          fallback: "We respond within 2 business days.",
        })}
      </p>
      </form>
    </>
  );
};
