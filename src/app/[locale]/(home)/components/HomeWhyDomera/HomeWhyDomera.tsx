"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./HomeWhyDomera.module.scss";

type WhyFeature = {
  key: string;
  title: string;
  description: string;
};

export const HomeWhyDomera = () => {
  const t = useTranslations("homeWhyDomera");

  const FEATURES: readonly WhyFeature[] = [
    {
      key: "spatial-logic",
      title: t("feature1Title", { fallback: "Clear Spatial Logic" }),
      description: t("feature1Description", {
        fallback:
          "Every room, every transition — designed with intentional spatial flow.",
      }),
    },
    {
      key: "usability",
      title: t("feature2Title", { fallback: "Real-World Usability" }),
      description: t("feature2Description", {
        fallback:
          "Plans shaped by real feedback, real budgets, and real construction conditions.",
      }),
    },
    {
      key: "adaptable",
      title: t("feature3Title", { fallback: "Adaptable Layouts" }),
      description: t("feature3Description", {
        fallback:
          "Flexible core structures that let you expand, modify, or repurpose.",
      }),
    },
    {
      key: "long-term",
      title: t("feature4Title", { fallback: "Long-Term Relevance" }),
      description: t("feature4Description", {
        fallback:
          "Designs that remain functional and liveable for decades — not just seasons.",
      }),
    },
  ] as const;

  return (
    <section className={styles.why}>
      <div className={styles.why__image}>
        <Image
          src="/images/home/domera/why-domera.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 560px"
        />
      </div>

      <div className={styles.why__content}>
        <div className={styles.why__head}>
          <p className={styles.why__label}>
            {t("label", { fallback: "WHY DOMÉRA" })}
          </p>
          <div className={styles.why__textGroup}>
            <h2 className={styles.why__title}>
              {t("title", { fallback: "Why Doméra" })}
            </h2>
            <p className={styles.why__description}>
              {t("description", {
                fallback:
                  "Because a home should be designed around how you actually live — not adapted after the fact.",
              })}
            </p>
          </div>
        </div>

        <div className={styles.why__features}>
          {FEATURES.map((feature, index) => (
            <div key={feature.key} className={styles.why__feature}>
              <span className={styles.why__featureBadge}>{index + 1}</span>
              <div className={styles.why__featureText}>
                <p className={styles.why__featureTitle}>{feature.title}</p>
                <p className={styles.why__featureDescription}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
