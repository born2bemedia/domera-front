"use client";

import { useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./HomePlanCustomization.module.scss";

import { Link } from "@/i18n/navigation";

type PlanItem = {
  key: string;
  image: string;
  title: string;
  features: readonly string[];
};

export const HomePlanCustomization = () => {
  const t = useTranslations("homePlanCustomization");
  const [activeIndex, setActiveIndex] = useState(0);

  const ITEMS: readonly PlanItem[] = [
    {
      key: "residential",
      image: "/images/home/domera/plan-residential.png",
      title: t("residentialTitle", { fallback: "Residential Systems" }),
      features: [
        t("residential1", { fallback: "Electrical and lighting distribution" }),
        t("residential2", { fallback: "Plumbing configuration" }),
        t("residential3", { fallback: "Material and finish definition" }),
        t("residential4", { fallback: "Climate and ventilation systems" }),
        t("residential5", { fallback: "Landscape integration" }),
        t("residential6", { fallback: "Security and smart systems" }),
        t("residential7", { fallback: "Structural base and roof adjustments" }),
        t("residential8", { fallback: "Energy performance improvements" }),
        t("residential9", {
          fallback: "Interior layout and lighting refinement",
        }),
      ],
    },
    {
      key: "garage",
      image: "/images/home/domera/plan-garage.png",
      title: t("garageTitle", { fallback: "Garage Systems" }),
      features: [
        t("garage1", { fallback: "Electrical and power setup" }),
        t("garage2", { fallback: "Material coordination" }),
        t("garage3", { fallback: "Security and access systems" }),
        t("garage4", { fallback: "Vehicle circulation and storage" }),
        t("garage5", { fallback: "Ventilation and EV integration" }),
      ],
    },
    {
      key: "outdoor",
      image: "/images/home/domera/plan-outdoor.png",
      title: t("outdoorTitle", { fallback: "Outdoor Systems" }),
      features: [
        t("outdoor1", { fallback: "Electrical and lighting layout" }),
        t("outdoor2", { fallback: "Material and landscape alignment" }),
        t("outdoor3", { fallback: "Sun and shade control" }),
        t("outdoor4", { fallback: "Integrated seating and outdoor features" }),
        t("outdoor5", { fallback: "Weather protection solutions" }),
      ],
    },
  ] as const;

  return (
    <section className={styles.plan}>
      <div className="container">
        <div className={styles.plan__inner}>
          <div className={styles.plan__head}>
            <p className={styles.plan__label}>
              {t("label", { fallback: "STRUCTURE YOUR IDEA" })}
            </p>
            <div className={styles.plan__titleBlock}>
              <div className={styles.plan__titleRow}>
                <span className={styles.plan__accent} aria-hidden />
                <h2 className={styles.plan__title}>
                  {t("title", { fallback: "Plan Customization" })}
                </h2>
              </div>
              <p className={styles.plan__description}>
                {t("description", {
                  fallback:
                    "Every plan is designed as a complete structure, but not a fixed one. Adjustments allow the layout to align with your site, technical requirements, and long-term use.",
                })}
              </p>
            </div>
          </div>

          <div className={styles.plan__items}>
            {ITEMS.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.key}
                  className={`${styles.plan__item} ${
                    isActive ? styles.active : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                >
                  <div className={styles.plan__itemImage}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className={styles.plan__itemDetails}>
                    <span className={styles.plan__badge}>{index + 1}</span>
                    <div className={styles.plan__detailText}>
                      <h3 className={styles.plan__detailTitle}>{item.title}</h3>
                      <ul className={styles.plan__featureList}>
                        {item.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/custom-quote-request" className={styles.plan__cta}>
                      {t("cta", { fallback: "→ Request a Customization" })}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
