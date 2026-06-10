import Image from "next/image";

import { getTranslations } from "next-intl/server";

import styles from "./ContactHero.module.scss";

export const ContactHero = async () => {
  const t = await getTranslations("contacts");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg} aria-hidden>
        <Image
          src="/images/contacts/hero-bg.png"
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
            <h1 className={styles.hero__headline}>
              {t("heroTitle", { fallback: "Let’s Begin the Conversation" })}
            </h1>
            <p className={styles.hero__subtitle}>
              {t("heroSubtitle", {
                fallback:
                  "Reach out using the details below or submit your project information through the contact form. The more context you provide, the more precisely we can support your vision.",
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
