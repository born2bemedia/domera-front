import { getTranslations } from "next-intl/server";

import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WEBSITE_EMAIL,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_PHONE,
  WEBSITE_REGISTERED_ADDRESS,
  X_URL,
} from "@/shared/lib/constants/constants";

import styles from "./ContactDetails.module.scss";

export const ContactDetails = async () => {
  const t = await getTranslations("contacts");

  const PLACEHOLDER = "—";

  const CARDS = [
    {
      key: "phone",
      label: t("phoneLabel", { fallback: "Phone:" }),
      value: WEBSITE_PHONE || PLACEHOLDER,
      full: false,
    },
    {
      key: "email",
      label: t("emailLabel", { fallback: "Email:" }),
      value: WEBSITE_EMAIL || PLACEHOLDER,
      full: false,
    },
    {
      key: "office",
      label: t("officeLabel", { fallback: "Office Address:" }),
      value: WEBSITE_OFFICE_ADDRESS || PLACEHOLDER,
      full: true,
    },
    {
      key: "registered",
      label: t("registeredLabel", { fallback: "Registered Address:" }),
      value: WEBSITE_REGISTERED_ADDRESS || PLACEHOLDER,
      full: true,
    },
  ] as const;

  const SOCIALS = [
    { key: "facebook", label: t("facebook", { fallback: "Facebook" }), href: FACEBOOK_URL || "#" },
    { key: "instagram", label: t("instagram", { fallback: "Instagram" }), href: INSTAGRAM_URL || "#" },
    { key: "twitter", label: t("twitter", { fallback: "Twitter" }), href: X_URL || "#" },
  ] as const;

  return (
    <section className={styles.details}>
      <div className="container">
        <div className={styles.details__inner}>
          <div className={styles.details__col}>
            <h2 className={styles.details__title}>
              {t("directTitle", { fallback: "Direct Contact Information" })}
            </h2>
            <div className={styles.details__grid}>
              {CARDS.map((card) => (
                <div
                  key={card.key}
                  className={`${styles.details__card} ${
                    card.full ? styles.details__cardFull : ""
                  }`}
                >
                  <p className={styles.details__cardLabel}>{card.label}</p>
                  <p className={styles.details__cardValue}>{card.value}</p>
                </div>
              ))}
            </div>
          </div>

          <span className={styles.details__divider} aria-hidden />

          <div className={styles.details__col}>
            <div className={styles.details__connectHead}>
              <h2 className={styles.details__title}>
                {t("connectTitle", { fallback: "Connect With Doméra" })}
              </h2>
              <p className={styles.details__connectText}>
                {t("connectText", {
                  fallback:
                    "Follow Doméra for architectural insights, new releases, and curated design inspiration.",
                })}
              </p>
            </div>
            <div className={styles.details__socials}>
              {SOCIALS.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.details__socialBtn}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
