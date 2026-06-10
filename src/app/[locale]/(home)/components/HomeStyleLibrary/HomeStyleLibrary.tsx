"use client";

import { useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./HomeStyleLibrary.module.scss";

type StyleOption = {
  key: string;
  title: string;
  subtitle: string;
};

type StyleSlide = {
  key: string;
  title: string;
  image: string;
  description: string;
  options: readonly StyleOption[];
};

export const HomeStyleLibrary = () => {
  const t = useTranslations("homeStyleLibrary");
  const [activeIndex, setActiveIndex] = useState(0);

  const SLIDES: readonly StyleSlide[] = [
    {
      key: "natural-forms",
      title: t("slide1Title", { fallback: "Natural Forms" }),
      image: "/images/home/domera/style-1-natural-forms.png",
      description: t("slide1Description", {
        fallback:
          "Shaped by landscape and proportion. Open, grounded layouts connected to surroundings.",
      }),
      options: [
        {
          key: "seaside",
          title: t("seasideTitle", { fallback: "Seaside" }),
          subtitle: t("seasideSubtitle", {
            fallback: "Light, open, indoor–outdoor flow",
          }),
        },
        {
          key: "timber",
          title: t("timberTitle", { fallback: "Timber" }),
          subtitle: t("timberSubtitle", {
            fallback: "Material-driven, warm, structured",
          }),
        },
        {
          key: "tuscan",
          title: t("tuscanTitle", { fallback: "Tuscan" }),
          subtitle: t("tuscanSubtitle", {
            fallback: "Balanced, symmetrical, grounded",
          }),
        },
        {
          key: "plains",
          title: t("plainsTitle", { fallback: "Plains" }),
          subtitle: t("plainsSubtitle", {
            fallback: "Wide, horizontal, unobstructed",
          }),
        },
        {
          key: "rural",
          title: t("ruralTitle", { fallback: "Rural" }),
          subtitle: t("ruralSubtitle", {
            fallback: "Simple, calm, countryside-focused",
          }),
        },
      ],
    },
    {
      key: "modern-lines",
      title: t("slide2Title", { fallback: "Modern Lines" }),
      image: "/images/home/domera/style-2-modern-lines.png",
      description: t("slide2Description", {
        fallback:
          "Clean geometry and efficient planning. Clear, flexible, and modern layouts.",
      }),
      options: [
        {
          key: "contemporary",
          title: t("contemporaryTitle", { fallback: "Contemporary" }),
          subtitle: t("contemporarySubtitle", {
            fallback: "Balanced modern clarity",
          }),
        },
        {
          key: "minimal",
          title: t("minimalTitle", { fallback: "Minimal" }),
          subtitle: t("minimalSubtitle", {
            fallback: "Reduced, purposeful simplicity",
          }),
        },
        {
          key: "downtown",
          title: t("downtownTitle", { fallback: "Downtown" }),
          subtitle: t("downtownSubtitle", {
            fallback: "Compact, urban efficiency",
          }),
        },
        {
          key: "loft",
          title: t("loftTitle", { fallback: "Loft" }),
          subtitle: t("loftSubtitle", {
            fallback: "Open, flexible interiors",
          }),
        },
      ],
    },
    {
      key: "historic-character",
      title: t("slide3Title", { fallback: "Historic Character" }),
      image: "/images/home/domera/style-3-historic-character.png",
      description: t("slide3Description", {
        fallback:
          "Rooted in tradition and structure. Classic proportions with practical use.",
      }),
      options: [
        {
          key: "classic",
          title: t("classicTitle", { fallback: "Classic" }),
          subtitle: t("classicSubtitle", {
            fallback: "Timeless, symmetrical balance",
          }),
        },
        {
          key: "federal",
          title: t("federalTitle", { fallback: "Federal" }),
          subtitle: t("federalSubtitle", {
            fallback: "Formal, structured alignment",
          }),
        },
        {
          key: "victorian",
          title: t("victorianTitle", { fallback: "Victorian" }),
          subtitle: t("victorianSubtitle", {
            fallback: "Layered, expressive detail",
          }),
        },
        {
          key: "medieval",
          title: t("medievalTitle", { fallback: "Medieval" }),
          subtitle: t("medievalSubtitle", {
            fallback: "Solid, enclosed, durable",
          }),
        },
      ],
    },
    {
      key: "country-living",
      title: t("slide4Title", { fallback: "Country Living" }),
      image: "/images/home/domera/style-4-country-living.png",
      description: t("slide4Description", {
        fallback:
          "Comfort-driven and practical. Warm, usable layouts for everyday living.",
      }),
      options: [
        {
          key: "handcrafted",
          title: t("handcraftedTitle", { fallback: "Handcrafted" }),
          subtitle: t("handcraftedSubtitle", {
            fallback: "Detailed, human-scaled",
          }),
        },
        {
          key: "farmhouse",
          title: t("farmhouseTitle", { fallback: "Farmhouse" }),
          subtitle: t("farmhouseSubtitle", {
            fallback: "Open, functional core",
          }),
        },
        {
          key: "cabin",
          title: t("cabinTitle", { fallback: "Cabin" }),
          subtitle: t("cabinSubtitle", {
            fallback: "Compact, efficient retreat",
          }),
        },
        {
          key: "southern",
          title: t("southernTitle", { fallback: "Southern" }),
          subtitle: t("southernSubtitle", {
            fallback: "Spacious, relaxed flow",
          }),
        },
      ],
    },
    {
      key: "european-roots",
      title: t("slide5Title", { fallback: "European Roots" }),
      image: "/images/home/domera/style-5-european-roots.png",
      description: t("slide5Description", {
        fallback:
          "Regional influence with structural clarity. Adapted for modern use.",
      }),
      options: [
        {
          key: "alpine",
          title: t("alpineTitle", { fallback: "Alpine" }),
          subtitle: t("alpineSubtitle", {
            fallback: "Compact, climate-efficient",
          }),
        },
        {
          key: "chalet",
          title: t("chaletTitle", { fallback: "Chalet" }),
          subtitle: t("chaletSubtitle", {
            fallback: "Warm, sheltered comfort",
          }),
        },
        {
          key: "renaissance",
          title: t("renaissanceTitle", { fallback: "Renaissance" }),
          subtitle: t("renaissanceSubtitle", {
            fallback: "Balanced, proportional order",
          }),
        },
      ],
    },
  ] as const;

  const goToNext = () =>
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);

  const goToPrev = () =>
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

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
                    "Distinct approaches to organizing space — structured, consistent, and adaptable across different environments.",
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
              <div key={activeSlide.key} className={styles.style__contentLeft}>
                
                <h3 className={styles.style__slideTitle}>
                  {activeSlide.title}
                </h3>
                <p className={styles.style__slideDesc}>
                  {activeSlide.description}
                </p>
              </div>

              <div className={styles.style__options}>
                {activeSlide.options.map((option) => (
                  <div key={option.key} className={styles.style__option}>
                    <p className={styles.style__optionTitle}>{option.title}</p>
                    <p className={styles.style__optionSubtitle}>
                      {option.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {activeIndex > 0 && (
              <button
                type="button"
                className={styles.style__prev}
                onClick={goToPrev}
              >
                {t("prev", { fallback: "← Prev" })}
              </button>
            )}

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
