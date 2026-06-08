"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";

import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WEBSITE_EMAIL,
  WEBSITE_PHONE,
  X_URL,
} from "@/shared/lib/constants/constants";

import styles from "./Header.module.scss";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type HeaderNavItem = {
  key: string;
  text: string;
  href: string;
};

type HeaderSocial = {
  key: string;
  label: string;
  href: string;
  Icon: () => React.ReactElement;
};

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const normalizePath = (path: string) => {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("header");

  const isLegalPage = normalizePath(pathname)
    .split("/")
    .filter(Boolean)
    .includes("legal");

  const NAV_ITEMS: readonly HeaderNavItem[] = [
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

  const SOCIALS: readonly HeaderSocial[] = [
    { key: "x", label: "X", href: X_URL || "#", Icon: XIcon },
    {
      key: "facebook",
      label: "Facebook",
      href: FACEBOOK_URL || "#",
      Icon: FacebookIcon,
    },
    {
      key: "instagram",
      label: "Instagram",
      href: INSTAGRAM_URL || "#",
      Icon: InstagramIcon,
    },
  ] as const;

  const getLocalizedHref = (href: string) => {
    if (href === "/") {
      return locale === routing.defaultLocale ? "/" : `/${locale}`;
    }

    return locale === routing.defaultLocale ? href : `/${locale}${href}`;
  };

  const isActivePath = (href: string) =>
    normalizePath(pathname) === normalizePath(getLocalizedHref(href));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsMobileMenuOpen(false), 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isMobileMenuOpen]);

  const renderSocials = (className: string) => (
    <div className={className}>
      {SOCIALS.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.header__socialIcon}
          aria-label={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
        isMobileMenuOpen ? styles.menuOpen : ""
      } ${isLegalPage ? styles.legal : ""}`}
    >
      <div className={styles.header__topbar}>
        <div className="container">
          <div className={styles.header__topbarInner}>
            <div className={styles.header__topbarContacts}>
              <Link
                href={`mailto:${WEBSITE_EMAIL}`}
                className={styles.header__topbarContact}
              >
                {WEBSITE_EMAIL}
              </Link>
              {WEBSITE_PHONE && (
                <Link
                  href={`tel:${WEBSITE_PHONE}`}
                  className={styles.header__topbarContact}
                >
                  {WEBSITE_PHONE}
                </Link>
              )}
            </div>

            {renderSocials(styles.header__topbarSocials)}
          </div>
        </div>
      </div>

      <div className={styles.header__main}>
        <div className="container">
          <div className={styles.header__mainInner}>
            <Link href="/" className={styles.header__logo} aria-label="Doméra">
              {/**eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="Doméra" />
            </Link>

            <nav className={styles.header__nav}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`${styles.header__navItem} ${
                    isActivePath(item.href) ? styles.active : ""
                  }`}
                >
                  {item.text}
                </Link>
              ))}
            </nav>

            <div className={styles.header__actions}>
              <Link href="/sign-up" className={styles.header__btnGhost}>
                {t("register", { fallback: "Register" })}
              </Link>
              <Link href="/log-in" className={styles.header__btnPrimary}>
                {t("login", { fallback: "Login" })}
              </Link>
            </div>

            <button
              type="button"
              className={styles.header__menuToggle}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="header-mobile-menu"
              aria-label={
                isMobileMenuOpen
                  ? t("close", { fallback: "Close menu" })
                  : t("menu", { fallback: "Open menu" })
              }
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      <div
        id="header-mobile-menu"
        className={`${styles.header__mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <div className="container">
          <nav className={styles.header__mobileNav}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`${styles.header__mobileNavItem} ${
                  isActivePath(item.href) ? styles.active : ""
                }`}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className={styles.header__mobileActions}>
            <Link href="/sign-up" className={styles.header__btnGhost}>
              {t("register", { fallback: "Register" })}
            </Link>
            <Link href="/log-in" className={styles.header__btnPrimary}>
              {t("login", { fallback: "Login" })}
            </Link>
          </div>

          <div className={styles.header__mobileContacts}>
            <Link
              href={`mailto:${WEBSITE_EMAIL}`}
              className={styles.header__topbarContact}
            >
              {WEBSITE_EMAIL}
            </Link>
            {WEBSITE_PHONE && (
              <Link
                href={`tel:${WEBSITE_PHONE}`}
                className={styles.header__topbarContact}
              >
                {WEBSITE_PHONE}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
