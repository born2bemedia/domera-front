import Image from "next/image";

import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/features/forms";

import styles from "./ContactShareVision.module.scss";

export const ContactShareVision = async () => {
  const t = await getTranslations("contacts");

  return (
    <section className={styles.share}>
      <div className={styles.share__bg} aria-hidden>
        <Image
          src="/images/home/domera/structure-your-idea.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.share__bgImage}
        />
        <div className={styles.share__overlay} />
      </div>

      <div className="container">
        <div className={styles.share__inner}>
          <div className={styles.share__head}>
            <div className={styles.share__titleRow}>
              <span className={styles.share__accent} aria-hidden />
              <h2 className={styles.share__title}>
                {t("shareTitle", { fallback: "Share Your Vision" })}
              </h2>
            </div>
            <p className={styles.share__description}>
              {t("shareDescription", {
                fallback:
                  "Provide your project details below, and our team will review your request with precision and care.",
              })}
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};
