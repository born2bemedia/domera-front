import Image from "next/image";

import { getTranslations } from "next-intl/server";

import { BriefForm } from "@/features/forms";

import styles from "./HomeStructureIdea.module.scss";

export const HomeStructureIdea = async () => {
  const t = await getTranslations("homeStructureIdea");

  return (
    <section className={styles.structure}>
      <div className={styles.structure__bg} aria-hidden>
        <Image
          src="/images/home/domera/structure-your-idea.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.structure__bgImage}
        />
        <div className={styles.structure__overlay} />
      </div>

      <div className="container">
        <div className={styles.structure__inner}>
          <div className={styles.structure__head}>
            <p className={styles.structure__label}>
              {t("label", { fallback: "STRUCTURE YOUR IDEA" })}
            </p>
            <div className={styles.structure__titleBlock}>
              <div className={styles.structure__titleRow}>
                <span className={styles.structure__accent} aria-hidden />
                <h2 className={styles.structure__title}>
                  {t("title", { fallback: "Structure Your Idea" })}
                </h2>
              </div>
              <p className={styles.structure__description}>
                {t("description1", {
                  fallback:
                    "Have a plot, an idea, or an early concept?",
                })}<br/>
                {t("description2", {
                  fallback:
                    "Share your details and begin exploring the right plan for your space.",
                })}
              </p>
            </div>
          </div>

          <BriefForm />
        </div>
      </div>
    </section>
  );
};
