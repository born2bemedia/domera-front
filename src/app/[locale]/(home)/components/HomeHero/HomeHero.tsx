"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./HomeHero.module.scss";

import { Link } from "@/i18n/navigation";

export const HomeHero = () => {
  const t = useTranslations("homeHero");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg} aria-hidden>
        <Image
          src="/images/home/domera/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.hero__bgImage}
        />
        <div className={styles.hero__overlay} />
      </div>

      <div className="container">
        <div className={styles.hero__inner}>
          <div className={styles.hero__content}>
            <div className={styles.hero__headlineGroup}>
              <h1 className={styles.hero__headline}>
                {t("headline", {
                  fallback: "Residential planning shaped by structure, clarity.",
                })}
              </h1>
              <p className={styles.hero__subtitle}>
                {t("subtitle", {
                  fallback:
                    "Doméra works with homeowners and developers to create plans that reflect your space, your rhythm, and your long-term goals.",
                })}
              </p>
            </div>

            <div className={styles.hero__actions}>
              <Link href="/sign-up" className={styles.hero__btnPrimary}>
                {t("ctaPrimary", { fallback: "→ Begin Your Project" })}
              </Link>
              <Link href="/design-studio" className={styles.hero__btnSecondary}>
                {t("ctaSecondary", { fallback: "→ Explore Studio" })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
