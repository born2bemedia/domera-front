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
      title: t("step1Title", { fallback: "Define Your Requirements" }),
      description: t("step1Description", {
        fallback:
          "Outline your needs, preferences, and key project details.",
      }),
    },
    {
      key: "consultation",
      number: "02",
      title: t("step2Title", { fallback: "Select a <br/>Style Direction" }),
      description: t("step2Description", {
        fallback:
          "Choose an approach that fits your space and vision.",
      }),
    },
    {
      key: "development",
      number: "03",
      title: t("step3Title", { fallback: "Receive a Structured Proposal" }),
      description: t("step3Description", {
        fallback:
          "Get a clear plan with scope, cost, and next steps.",
      }),
    },
    {
      key: "delivery",
      number: "04",
      title: t("step4Title", { fallback: "Prepare <br/>for Construction" }),
      description: t("step4Description", {
        fallback:
          "Move forward with a layout ready for real-world use.",
      }),
    },
  ] as const;

  return (
    <section className={styles.how}>
      <div className="container">
        <div className={styles.how__inner}>
          <div className={styles.how__head}>
            <h2 className={styles.how__title}>
              {t("title", { fallback: "How It Works" })}
            </h2>
          </div>

          <div className={styles.how__steps}>
            {STEPS.map((step) => (
              <div key={step.key} className={styles.how__step}>
                <p className={styles.how__stepNumber}>{step.number}</p>
                <div className={styles.how__stepContent}>
                  <h3 className={styles.how__stepTitle} dangerouslySetInnerHTML={{ __html: step.title }} />
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
