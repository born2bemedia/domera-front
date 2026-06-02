"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";

import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WEBSITE_EMAIL,
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
  text: string;
  href: string;
};

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
      href: "/contacts",
    },
  ] as const;

  const SOCIALS: readonly HeaderSocial[] = [
    { key: "instagram", text: "Instagram", href: INSTAGRAM_URL || "#" },
    { key: "linkedin", text: "LinkedIn", href: LINKEDIN_URL || "#" },
    { key: "facebook", text: "Facebook", href: FACEBOOK_URL || "#" },
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

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
        isMobileMenuOpen ? styles.menuOpen : ""
      }`}
    >
      <div className={styles.header__topbar}>
        <div className="container">
          <div className={styles.header__topbarInner}>
            <Link
              href={`mailto:${WEBSITE_EMAIL}`}
              className={styles.header__topbarEmail}
            >
              {WEBSITE_EMAIL}
            </Link>

            <div className={styles.header__topbarSocials}>
              {SOCIALS.map((social, index) => (
                <span key={social.key} className={styles.header__topbarSocial}>
                  {index > 0 && (
                    <span className={styles.header__topbarDot} aria-hidden>
                      ·
                    </span>
                  )}
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.text}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.header__main}>
        <div className="container">
          <div className={styles.header__mainInner}>
            <Link href="/" className={styles.header__logo} aria-label="Doméra">
              <span className={styles.header__logoMark}>D</span>
              <span className={styles.header__logoText}>Doméra</span>
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
            >
              {isMobileMenuOpen
                ? t("close", { fallback: "close" })
                : t("menu", { fallback: "menu" })}
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

        {SOCIALS.length > 0 && (
          <div className={styles.header__mobileSocials}>
            {SOCIALS.map((social) => (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
