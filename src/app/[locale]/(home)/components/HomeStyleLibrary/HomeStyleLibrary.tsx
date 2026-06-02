"use client";

import { useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./HomeStyleLibrary.module.scss";

type StyleSlide = {
  key: string;
  title: string;
  image: string;
};

type StyleOption = {
  key: string;
  title: string;
  subtitle: string;
};

export const HomeStyleLibrary = () => {
  const t = useTranslations("homeStyleLibrary");
  const [activeIndex, setActiveIndex] = useState(0);

  const SLIDES: readonly StyleSlide[] = [
    {
      key: "natural-forms",
      title: t("slide1Title", { fallback: "Natural Forms" }),
      image: "/images/home/domera/style-1-natural-forms.png",
    },
    {
      key: "modern-lines",
      title: t("slide2Title", { fallback: "Modern Lines" }),
      image: "/images/home/domera/style-2-modern-lines.png",
    },
    {
      key: "historic-character",
      title: t("slide3Title", { fallback: "Historic Character" }),
      image: "/images/home/domera/style-3-historic-character.png",
    },
    {
      key: "country-living",
      title: t("slide4Title", { fallback: "Country Living" }),
      image: "/images/home/domera/style-4-country-living.png",
    },
    {
      key: "european-roots",
      title: t("slide5Title", { fallback: "European Roots" }),
      image: "/images/home/domera/style-5-european-roots.png",
    },
  ] as const;

  const OPTIONS: readonly StyleOption[] = [
    {
      key: "handcrafted",
      title: t("optionHandcraftedTitle", { fallback: "Handcrafted" }),
      subtitle: t("optionHandcraftedSubtitle", {
        fallback: "Detailed, human-scaled",
      }),
    },
    {
      key: "farmhouse",
      title: t("optionFarmhouseTitle", { fallback: "Farmhouse" }),
      subtitle: t("optionFarmhouseSubtitle", {
        fallback: "Open, functional core",
      }),
    },
    {
      key: "cabin",
      title: t("optionCabinTitle", { fallback: "Cabin" }),
      subtitle: t("optionCabinSubtitle", {
        fallback: "Compact, efficient retreat",
      }),
    },
    {
      key: "southern",
      title: t("optionSouthernTitle", { fallback: "Southern" }),
      subtitle: t("optionSouthernSubtitle", {
        fallback: "Spacious, relaxed flow",
      }),
    },
  ] as const;

  const goToNext = () =>
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);

  const activeSlide = SLIDES[activeIndex];

  return (
    <section className={styles.style}>
      <div className="container">
        <div className={styles.style__inner}>
          <div className={styles.style__head}>
            <p className={styles.style__label}>
              {t("label", { fallback: "STYLE LIBRARY" })}
            </p>
            <div className={styles.style__headText}>
              <h2 className={styles.style__title}>
                {t("title", { fallback: "Style Library" })}
              </h2>
              <p className={styles.style__subtitle}>
                {t("subtitle", {
                  fallback:
                    "Five distinct aesthetic directions — each one a complete visual language for your home.",
                })}
              </p>
            </div>
          </div>

          <div className={styles.style__slider}>
            <div className={styles.style__slides} aria-hidden>
              {SLIDES.map((slide, index) => (
                <div
                  key={slide.key}
                  className={`${styles.style__slideBg} ${
                    index === activeIndex ? styles.active : ""
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="100vw"
                    priority={index === 0}
                  />
                </div>
              ))}
              <div className={styles.style__overlay} />
            </div>

            <div className={styles.style__dots}>
              {SLIDES.map((slide, index) => (
                <button
                  key={slide.key}
                  type="button"
                  className={`${styles.style__dot} ${
                    index === activeIndex ? styles.active : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={slide.title}
                  aria-current={index === activeIndex}
                />
              ))}
            </div>

            <div className={styles.style__content}>
              <h3 key={activeSlide.key} className={styles.style__slideTitle}>
                {activeSlide.title}
              </h3>

              <div className={styles.style__options}>
                {OPTIONS.map((option) => (
                  <div key={option.key} className={styles.style__option}>
                    <p className={styles.style__optionTitle}>{option.title}</p>
                    <p className={styles.style__optionSubtitle}>
                      {option.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={styles.style__next}
              onClick={goToNext}
            >
              {t("next", { fallback: "→ Next" })}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
