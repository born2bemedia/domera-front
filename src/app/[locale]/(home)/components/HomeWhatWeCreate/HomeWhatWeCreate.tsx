"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./HomeWhatWeCreate.module.scss";

type CreateCard = {
  key: "home-plans" | "garage" | "outdoor";
  image: string;
  title: string;
  description: string;
};

export const HomeWhatWeCreate = () => {
  const t = useTranslations("homeWhatWeCreate");

  const CARDS: readonly CreateCard[] = [
    {
      key: "home-plans",
      image: "/images/home/domera/wwc-home-plans.png",
      title: t("homePlansTitle", { fallback: "Home Plans" }),
      description: t("homePlansDescription", {
        fallback:
          "From compact single-story designs to multi-level family homes — every plan is drawn with functional precision.",
      }),
    },
    {
      key: "garage",
      image: "/images/home/domera/wwc-garage.png",
      title: t("garageTitle", { fallback: "Garage Structures" }),
      description: t("garageDescription", {
        fallback:
          "Attached, detached, or integrated — Doméra delivers garage plans that complement and serve the main residence.",
      }),
    },
    {
      key: "outdoor",
      image: "/images/home/domera/wwc-outdoor.png",
      title: t("outdoorTitle", { fallback: "Outdoor Spaces" }),
      description: t("outdoorDescription", {
        fallback:
          "Gazebos, pergolas, garden studios — thoughtfully designed structures that extend your living space outward.",
      }),
    },
  ] as const;

  return (
    <section className={styles.wwc}>
      <div className="container">
        <div className={styles.wwc__inner}>
          <div className={styles.wwc__head}>
            <p className={styles.wwc__label}>
              {t("label", { fallback: "WHAT WE CREATE" })}
            </p>
            <div className={styles.wwc__titleRow}>
              <span className={styles.wwc__accent} aria-hidden />
              <h2 className={styles.wwc__title}>
                {t("title", { fallback: "What We Create" })}
              </h2>
            </div>
          </div>

          <div className={styles.wwc__cards}>
            {CARDS.map((card) => (
              <article
                key={card.key}
                className={`${styles.wwc__card} ${
                  styles[`wwc__card--${card.key}`]
                }`}
              >
                <div className={styles.wwc__cardImage}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.wwc__cardContent}>
                  <h3 className={styles.wwc__cardTitle}>{card.title}</h3>
                  <p className={styles.wwc__cardDescription}>
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
