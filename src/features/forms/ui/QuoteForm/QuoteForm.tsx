"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { type Path, useForm } from "react-hook-form";

import { submitQuoteForm } from "@/features/forms/api/submitForm";
import {
  type QuoteFormSchema,
  quoteFormSchema,
} from "@/features/forms/model/schemas";

import styles from "./QuoteForm.module.scss";

import { Link } from "@/i18n/navigation";

type ProjectType = "home" | "garage" | "gazebo";

const TYPE_ORDER: readonly ProjectType[] = ["home", "garage", "gazebo"];

const REFINEMENTS: Record<ProjectType, readonly string[]> = {
  home: [
    "Electrical distribution strategy",
    "Plumbing system configuration",
    "Interior and exterior material specification",
    "Climate control system planning",
    "Landscape coordination",
    "Security integration framework",
    "Smart technology preparation",
    "Structural base adjustment",
    "Roof structure refinement",
    "Energy performance strategy",
    "Interior layout optimization",
    "Lighting architecture planning",
  ],
  garage: [
    "Electrical distribution for garage use",
    "Material coordination with the main structure",
    "Security zoning and monitoring",
    "Vehicle circulation planning",
    "Storage system structuring",
    "Ventilation configuration",
    "Electric vehicle charging integration",
    "Access control system planning",
  ],
  gazebo: [
    "Exterior electrical layout",
    "Material specification",
    "Landscape alignment",
    "Sun and shade calibration",
    "Integrated seating solutions",
    "Outdoor lighting planning",
    "Fire or cooking feature integration",
    "Weather protection enhancements",
  ],
};

const REFINEMENT_FIELD: Record<ProjectType, Path<QuoteFormSchema>> = {
  home: "refinementsHome",
  garage: "refinementsGarage",
  gazebo: "refinementsGazebo",
};

export const QuoteForm = () => {
  const t = useTranslations("quoteForm");
  const [stepIndex, setStepIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormSchema>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      designPreferences: "",
      additionalInformation: "",
      preferredContact: "",
      projectType: [],
      refinementsHome: [],
      refinementsGarage: [],
      refinementsGazebo: [],
      additionalComments: "",
      preferredStartDate: "",
      hasTimeline: "",
      timelineFileName: "",
    },
  });

  const selectedTypes = (watch("projectType") ?? []) as ProjectType[];
  const refineSteps = TYPE_ORDER.filter((type) => selectedTypes.includes(type));
  // Screen sequence: 0 = info, 1..n = refinement screens, n+1 = details.
  const detailsIndex = refineSteps.length + 1;

  const goToRefinements = async () => {
    const valid = await trigger([
      "firstName",
      "lastName",
      "email",
      "phone",
      "projectType",
    ]);
    if (valid) setStepIndex(1);
  };

  const goNext = () => setStepIndex((prev) => prev + 1);

  const onSubmit = async (data: QuoteFormSchema) => {
    setError(null);
    try {
      await submitQuoteForm(data);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  };

  useEffect(() => {
    if (!isSuccess) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isSuccess]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.files?.[0]?.name ?? "";
    setFileName(name);
    setValue("timelineFileName", name);
  };

  const refineMeta = (type: ProjectType) => {
    switch (type) {
      case "garage":
        return {
          title: t("garageTitle", { fallback: "Garage Refinements" }),
          subtitle: t("garageSubtitle", {
            fallback:
              "Indicate the structural or technical adjustments required.",
          }),
        };
      case "gazebo":
        return {
          title: t("gazeboTitle", { fallback: "Gazebo Refinements" }),
          subtitle: t("gazeboSubtitle", {
            fallback: "Select the adjustments you would like incorporated.",
          }),
        };
      default:
        return {
          title: t("residentialTitle", { fallback: "Residential Refinements" }),
          subtitle: t("residentialSubtitle", {
            fallback:
              "Select the planning adjustments you would like us to evaluate. Multiple selections are possible.",
          }),
        };
    }
  };

  const activeRefineType =
    stepIndex >= 1 && stepIndex <= refineSteps.length
      ? refineSteps[stepIndex - 1]
      : null;

  return (
    <>
      <section className={styles.quote}>
        <div className="container">
        {/* ---------- Step 1: Structured Planning Inquiry ---------- */}
        {stepIndex === 0 && (
          <div className={styles.quote__split}>
            <div className={styles.quote__intro}>
              <div className={styles.quote__titleRow}>
                <span className={styles.quote__accent} aria-hidden />
                <h1 className={styles.quote__title}>
                  {t("step1Title", { fallback: "Structured Planning Inquiry" })}
                </h1>
              </div>
              <div className={styles.quote__lead}>
                <p>
                  {t("step1Lead1", {
                    fallback:
                      "We are pleased to assist you in shaping your project.",
                  })}
                </p>
                <p>
                  {t("step1Lead2", {
                    fallback:
                      "Complete the form below to outline your required refinements and specifications. The information provided allows our studio to prepare a structured proposal aligned with your architectural direction, technical requirements, and timeline expectations.",
                  })}
                </p>
              </div>
            </div>

            <div className={styles.quote__frame}>
              <div className={styles.quote__card}>
                <div
                  className={`${styles.quote__field} ${
                    errors.firstName ? styles.quote__fieldError : ""
                  }`}
                >
                  <label className={styles.quote__label} htmlFor="quote-firstName">
                    {t("firstName", { fallback: "First Name" })}
                  </label>
                  <input
                    id="quote-firstName"
                    type="text"
                    className={styles.quote__input}
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <span className={styles.quote__error}>
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div
                  className={`${styles.quote__field} ${
                    errors.lastName ? styles.quote__fieldError : ""
                  }`}
                >
                  <label className={styles.quote__label} htmlFor="quote-lastName">
                    {t("lastName", { fallback: "Last Name" })}
                  </label>
                  <input
                    id="quote-lastName"
                    type="text"
                    className={styles.quote__input}
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <span className={styles.quote__error}>
                      {errors.lastName.message}
                    </span>
                  )}
                </div>

                <div
                  className={`${styles.quote__field} ${
                    errors.email ? styles.quote__fieldError : ""
                  }`}
                >
                  <label className={styles.quote__label} htmlFor="quote-email">
                    {t("email", { fallback: "Email Address" })}
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    className={styles.quote__input}
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className={styles.quote__error}>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div
                  className={`${styles.quote__field} ${
                    errors.phone ? styles.quote__fieldError : ""
                  }`}
                >
                  <label className={styles.quote__label} htmlFor="quote-phone">
                    {t("phone", { fallback: "Phone Number" })}
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    className={styles.quote__input}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <span className={styles.quote__error}>
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className={styles.quote__field}>
                  <label
                    className={styles.quote__label}
                    htmlFor="quote-designPreferences"
                  >
                    {t("designPreferences", { fallback: "Design Preferences" })}
                  </label>
                  <input
                    id="quote-designPreferences"
                    type="text"
                    className={styles.quote__input}
                    {...register("designPreferences")}
                  />
                </div>

                <div className={styles.quote__field}>
                  <label
                    className={styles.quote__label}
                    htmlFor="quote-additionalInformation"
                  >
                    {t("additionalInformation", {
                      fallback: "Additional Information",
                    })}
                  </label>
                  <input
                    id="quote-additionalInformation"
                    type="text"
                    className={styles.quote__input}
                    {...register("additionalInformation")}
                  />
                </div>

                <div className={`${styles.quote__choiceField} ${styles.quote__fieldFull}`}>
                  <p className={styles.quote__choiceLabel}>
                    {t("preferredContact", {
                      fallback: "Preferred Method of Contact",
                    })}
                  </p>
                  <div className={styles.quote__choiceList}>
                    {[
                      { value: "email", label: t("contactEmail", { fallback: "Email" }) },
                      { value: "phone", label: t("contactPhone", { fallback: "Phone Call" }) },
                      { value: "text", label: t("contactText", { fallback: "Text" }) },
                    ].map((o) => (
                      <label key={o.value} className={styles.quote__choice}>
                        <input
                          type="radio"
                          value={o.value}
                          {...register("preferredContact")}
                        />
                        <span className={styles.quote__box} aria-hidden />
                        <span className={styles.quote__choiceText}>{o.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div
                  className={`${styles.quote__choiceField} ${styles.quote__fieldFull} ${
                    errors.projectType ? styles.quote__fieldError : ""
                  }`}
                >
                  <p className={styles.quote__choiceLabel}>
                    {t("projectType", { fallback: "Project Type" })}
                  </p>
                  <div className={styles.quote__choiceList}>
                    {[
                      { value: "home", label: t("typeHome", { fallback: "Home" }) },
                      { value: "garage", label: t("typeGarage", { fallback: "Garage" }) },
                      { value: "gazebo", label: t("typeGazebo", { fallback: "Gazebo" }) },
                    ].map((o) => (
                      <label key={o.value} className={styles.quote__choice}>
                        <input
                          type="checkbox"
                          value={o.value}
                          {...register("projectType")}
                        />
                        <span className={styles.quote__box} aria-hidden />
                        <span className={styles.quote__choiceText}>{o.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.projectType && (
                    <span className={styles.quote__error}>
                      {errors.projectType.message}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className={styles.quote__submit}
                  onClick={goToRefinements}
                >
                  {t("continue", { fallback: "→ Continue" })}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------- Refinement screens (one per selected project type) ---------- */}
        {activeRefineType &&
          (() => {
            const meta = refineMeta(activeRefineType);
            return (
              <div className={styles.quote__centered}>
                <div className={styles.quote__head}>
                  <div className={styles.quote__titleRow}>
                    <span className={styles.quote__accent} aria-hidden />
                    <h1 className={styles.quote__title}>{meta.title}</h1>
                  </div>
                  <p className={styles.quote__subtitle}>{meta.subtitle}</p>
                </div>

                <div className={styles.quote__grid}>
                  {REFINEMENTS[activeRefineType].map((opt) => (
                    <label key={opt} className={styles.quote__optionCard}>
                      <input
                        type="checkbox"
                        value={opt}
                        {...register(REFINEMENT_FIELD[activeRefineType])}
                      />
                      <span className={styles.quote__box} aria-hidden />
                      <span className={styles.quote__optionText}>{opt}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.quote__continueWide}
                  onClick={goNext}
                >
                  {t("continue", { fallback: "→ Continue" })}
                </button>
              </div>
            );
          })()}

        {/* ---------- Final step: Additional Project Details ---------- */}
        {stepIndex === detailsIndex && (
          <form className={styles.quote__split} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.quote__intro}>
              <div className={styles.quote__titleRow}>
                <span className={styles.quote__accent} aria-hidden />
                <h1 className={styles.quote__title}>
                  {t("step3Title", { fallback: "Additional Project Details" })}
                </h1>
              </div>
            </div>

            <div className={styles.quote__frame}>
              <div className={styles.quote__card}>
                <div className={`${styles.quote__field} ${styles.quote__fieldFull}`}>
                  <label
                    className={styles.quote__label}
                    htmlFor="quote-additionalComments"
                  >
                    {t("additionalComments", {
                      fallback: "Additional Comments or Special Requests",
                    })}
                  </label>
                  <textarea
                    id="quote-additionalComments"
                    rows={2}
                    className={`${styles.quote__input} ${styles.quote__textarea}`}
                    {...register("additionalComments")}
                  />
                </div>

                <div
                  className={`${styles.quote__field} ${styles.quote__fieldFull} ${styles.quote__fieldSelect}`}
                >
                  <label
                    className={styles.quote__label}
                    htmlFor="quote-preferredStartDate"
                  >
                    {t("preferredStartDate", {
                      fallback: "Preferred Project Start Date",
                    })}
                  </label>
                  <select
                    id="quote-preferredStartDate"
                    className={styles.quote__input}
                    defaultValue=""
                    {...register("preferredStartDate")}
                  >
                    <option value="" disabled hidden>
                      {t("selectPlaceholder", { fallback: "Select an option" })}
                    </option>
                    <option value="immediately">
                      {t("startImmediately", { fallback: "Immediately" })}
                    </option>
                    <option value="1-3-months">
                      {t("start13", { fallback: "Within 1–3 months" })}
                    </option>
                    <option value="3-6-months">
                      {t("start36", { fallback: "Within 3–6 months" })}
                    </option>
                    <option value="6-plus-months">
                      {t("start6plus", { fallback: "6+ months" })}
                    </option>
                    <option value="flexible">
                      {t("startFlexible", { fallback: "Flexible" })}
                    </option>
                  </select>
                </div>

                <div className={`${styles.quote__choiceField} ${styles.quote__fieldFull}`}>
                  <p className={styles.quote__choiceLabel}>
                    {t("hasTimeline", {
                      fallback: "Do You Have a Project Timeline in Mind?",
                    })}
                  </p>
                  <div className={styles.quote__choiceList}>
                    {[
                      { value: "yes", label: t("yes", { fallback: "Yes" }) },
                      { value: "no", label: t("no", { fallback: "No" }) },
                    ].map((o) => (
                      <label key={o.value} className={styles.quote__choice}>
                        <input
                          type="radio"
                          value={o.value}
                          {...register("hasTimeline")}
                        />
                        <span className={styles.quote__box} aria-hidden />
                        <span className={styles.quote__choiceText}>{o.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={`${styles.quote__uploadField} ${styles.quote__fieldFull}`}>
                  <p className={styles.quote__choiceLabel}>
                    {t("uploadLabel", { fallback: "Upload Project Timeline" })}{" "}
                    <span className={styles.quote__optional}>
                      {t("ifNeeded", { fallback: "(if needed)" })}
                    </span>
                  </p>
                  <label className={styles.quote__upload}>
                    <input type="file" onChange={handleFileChange} hidden />
                    <span className={styles.quote__uploadText}>
                      {fileName || t("uploadFile", { fallback: "Upload File" })}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </label>
                </div>

                {error && <p className={styles.quote__submitError}>{error}</p>}

                <button
                  type="submit"
                  className={styles.quote__submit}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("loading", { fallback: "Sending…" })
                    : t("submit", { fallback: "→ Submit Planning Request" })}
                </button>
              </div>
            </div>
          </form>
        )}
        </div>
      </section>

      {isSuccess && (
        <div
          className={styles.thanks}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-thanks-title"
        >
          <div className={styles.thanks__card}>
            <div className={styles.thanks__bg} aria-hidden>
              <Image
                src="/images/thanks_back_1.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 1142px"
                className={styles.thanks__bgImage}
              />
              <div className={styles.thanks__overlay} />
            </div>
            <div className={styles.thanks__content}>
              <div className={styles.thanks__headline}>
                <h2 id="quote-thanks-title" className={styles.thanks__title}>
                  {t("thanksTitle", {
                    fallback:
                      "Thank you for submitting your planning inquiry.",
                  })}
                </h2>
                <div className={styles.thanks__text}>
                  <p>
                    {t("thanksLine1", {
                      fallback:
                        "Our team will carefully review your selected specifications and project parameters.",
                    })}
                  </p>
                  <p>
                    {t("thanksLine2", {
                      fallback:
                        "You will receive a structured response outlining the proposed adjustments and associated estimate.",
                    })}
                  </p>
                  <p>
                    {t("thanksLine3", {
                      fallback:
                        "We look forward to refining your project with precision.",
                    })}
                  </p>
                </div>
              </div>
              <Link href="/" className={styles.thanks__btn}>
                {t("returnHome", { fallback: "→ Return to home page" })}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
