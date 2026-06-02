"use client";

import { useTranslations } from "next-intl";

import styles from "./HomeHowItWorks.module.scss";

type WorkStep = {
  key: string;
  number: string;
  title: string;
  description: string;
};

export const HomeHowItWorks = () => {
  const t = useTranslations("homeHowItWorks");

  const STEPS: readonly WorkStep[] = [
    {
      key: "brief",
      number: "01",
      title: t("step1Title", { fallback: "Submit Your Brief" }),
      description: t("step1Description", {
        fallback:
          "Tell us about your site, your budget, your timeline, and your vision. We start where you are.",
      }),
    },
    {
      key: "consultation",
      number: "02",
      title: t("step2Title", { fallback: "Design Consultation" }),
      description: t("step2Description", {
        fallback:
          "Our planning team reviews your requirements and schedules a direct consultation to align on direction.",
      }),
    },
    {
      key: "development",
      number: "03",
      title: t("step3Title", { fallback: "Plan Development" }),
      description: t("step3Description", {
        fallback:
          "We develop your full design package — floor plans, elevations, sections, and specifications.",
      }),
    },
    {
      key: "delivery",
      number: "04",
      title: t("step4Title", { fallback: "Delivery & Support" }),
      description: t("step4Description", {
        fallback:
          "Receive your complete plan set, ready for permits and construction. We remain available for questions.",
      }),
    },
  ] as const;

  return (
    <section className={styles.how}>
      <div className="container">
        <div className={styles.how__inner}>
          <div className={styles.how__head}>
            <p className={styles.how__label}>
              {t("label", { fallback: "HOW IT WORKS" })}
            </p>
            <h2 className={styles.how__title}>
              {t("title", { fallback: "How It Works" })}
            </h2>
          </div>

          <div className={styles.how__steps}>
            {STEPS.map((step) => (
              <div key={step.key} className={styles.how__step}>
                <p className={styles.how__stepNumber}>{step.number}</p>
                <div className={styles.how__stepContent}>
                  <h3 className={styles.how__stepTitle}>{step.title}</h3>
                  <p className={styles.how__stepDescription}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
