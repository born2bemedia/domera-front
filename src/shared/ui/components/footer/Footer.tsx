"use client";

import { useTranslations } from "next-intl";

import {
  COMPANY_NAME,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WEBSITE_EMAIL,
  WEBSITE_NAME,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_PHONE,
  WEBSITE_REGISTERED_ADDRESS,
} from "@/shared/lib/constants/constants";

import styles from "./Footer.module.scss";

import { Link } from "@/i18n/navigation";

type FooterLinkItem = {
  key: string;
  text: string;
  href?: string;
  external?: boolean;
};

type FooterColumn = {
  key: string;
  title: string;
  items: readonly FooterLinkItem[];
};

const renderLink = (item: FooterLinkItem) => {
  if (item.href && item.external) {
    return (
      <a
        key={item.key}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footer__link}
      >
        {item.text}
      </a>
    );
  }

  if (item.href) {
    return (
      <Link key={item.key} href={item.href} className={styles.footer__link}>
        {item.text}
      </Link>
    );
  }

  return (
    <span key={item.key} className={styles.footer__link}>
      {item.text}
    </span>
  );
};

export const Footer = () => {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const SOCIALS: readonly FooterLinkItem[] = [
    {
      key: "instagram",
      text: "Instagram",
      href: INSTAGRAM_URL || "#",
      external: true,
    },
    {
      key: "linkedin",
      text: "LinkedIn",
      href: LINKEDIN_URL || "#",
      external: true,
    },
    {
      key: "facebook",
      text: "Facebook",
      href: FACEBOOK_URL || "#",
      external: true,
    },
  ] as const;

  const EXPLORE_ITEMS: readonly FooterLinkItem[] = [
    { key: "home", text: t("home", { fallback: "Home" }), href: "/" },
    {
      key: "design-studio",
      text: t("design-studio", { fallback: "Design Studio" }),
      href: "/design-studio",
    },
    {
      key: "contacts",
      text: t("contact-domera", { fallback: "Contact Doméra" }),
      href: "/contact-domera",
    },
  ] as const;

  const LEGAL_ITEMS: readonly FooterLinkItem[] = [
    {
      key: "terms",
      text: t("terms-of-use", { fallback: "Terms and Conditions" }),
      href: "/legal/terms-and-conditions",
    },
    {
      key: "privacy",
      text: t("privacy-policy-full", { fallback: "Privacy Policy" }),
      href: "/legal/privacy-policy",
    },
    {
      key: "cookie",
      text: t("cookie-notice", { fallback: "Cookie Policy" }),
      href: "/legal/cookie-policy",
    },
    {
      key: "refund",
      text: t("refund-policy-full", { fallback: "Refund Policy" }),
      href: "/legal/refund-policy",
    },
    {
      key: "accessibility",
      text: t("accessibility-policy", { fallback: "Accessibility Statement" }),
      href: "/legal/accessibility-statement",
    },
  ] as const;

  const COLUMNS: readonly FooterColumn[] = [
    {
      key: "explore",
      title: t("explore-domera", { fallback: "Explore Doméra" }),
      items: EXPLORE_ITEMS,
    },
    {
      key: "legal",
      title: t("legal-info", { fallback: "Legal Info" }),
      items: LEGAL_ITEMS,
    },
  ] as const;

  const CONTACT_ITEMS: readonly FooterLinkItem[] = [
    { key: "company", text: "Homax EOOD" },
    {
      key: "email",
      text: WEBSITE_EMAIL,
      href: `mailto:${WEBSITE_EMAIL}`,
    },
    ...(WEBSITE_PHONE
      ? [
          {
            key: "phone",
            text: WEBSITE_PHONE,
            href: `tel:${WEBSITE_PHONE}`,
          },
        ]
      : []),
    ...(WEBSITE_REGISTERED_ADDRESS
      ? [{ key: "registered", text: WEBSITE_REGISTERED_ADDRESS }]
      : []),
    ...(WEBSITE_OFFICE_ADDRESS
      ? [{ key: "office", text: WEBSITE_OFFICE_ADDRESS }]
      : []),
  ] as const;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__container}>
          <div className={styles.footer__info}>
            <Link href="/" className={styles.footer__brand} aria-label="Doméra">
              {/**eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="Doméra" />
            </Link>

            <p className={styles.footer__tagline}>
              {t("tagline", {
                fallback: "Residential planning with structure and clarity.",
              })}
            </p>

            <div className={styles.footer__socials}>
              {SOCIALS.map((social) => renderLink(social))}
            </div>
          </div>

          <div className={styles.footer__links}>
            {COLUMNS.map((column) => (
              <div key={column.key} className={styles.footer__column}>
                <div className={styles.footer__columnTitle}>
                  <span>{column.title}</span>
                  <span className={styles.footer__columnRule} aria-hidden />
                </div>
                <div className={styles.footer__columnList}>
                  {column.items.map((item) => renderLink(item))}
                </div>
              </div>
            ))}

            <div className={styles.footer__column}>
              <div className={styles.footer__columnTitle}>
                <span>
                  {t("stay-connected", { fallback: "Stay Connected" })}
                </span>
                <span className={styles.footer__columnRule} aria-hidden />
              </div>
              <div className={styles.footer__columnList}>
                {CONTACT_ITEMS.map((item) => renderLink(item))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer__divider}>
          <span className={styles.footer__dividerRule} aria-hidden />
          <p className={styles.footer__copyright}>
            © {year} {WEBSITE_NAME} · {COMPANY_NAME} ·{` `}
            {t("copyright", {
              fallback: `All rights reserved`,
              year,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};
