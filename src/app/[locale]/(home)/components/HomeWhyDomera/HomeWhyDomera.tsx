"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./HomeWhyDomera.module.scss";

type WhyFeature = {
  key: string;
  title: string;
};

export const HomeWhyDomera = () => {
  const t = useTranslations("homeWhyDomera");

  const FEATURES: readonly WhyFeature[] = [
    {
      key: "spatial-logic",
      title: t("feature1Title", { fallback: "Clear Spatial Logic" }),
    },
    {
      key: "usability",
      title: t("feature2Title", { fallback: "Real-World Usability" }),
    },
    {
      key: "adaptable",
      title: t("feature3Title", { fallback: "Adaptable Layouts" }),
    },
    {
      key: "long-term",
      title: t("feature4Title", { fallback: "Long-Term Relevance" }),
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
            <div className={styles.why__description}>
              <p>
                {t("descriptionLine1", {
                  fallback: "Doméra is built on restraint and precision.",
                })}
              </p>
              <p>
                {t("descriptionLine2", {
                  fallback:
                    "We focus on planning that works — visually, structurally, and practically.",
                })}
              </p>
              <p>{t("descriptionLine3", { fallback: "Our principles:" })}</p>
            </div>
          </div>
        </div>

        <div className={styles.why__features}>
          {FEATURES.map((feature, index) => (
            <div key={feature.key} className={styles.why__feature}>
              <span className={styles.why__featureBadge}>{index + 1}</span>
              <div className={styles.why__featureText}>
                <p className={styles.why__featureTitle}>{feature.title}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.why__footnote}>
          {t("footnote", {
            fallback:
              "Every plan is created to be built, lived in, and refined when needed.",
          })}
        </p>
      </div>
    </section>
  );
};
