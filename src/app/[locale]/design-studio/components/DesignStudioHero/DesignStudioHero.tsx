'use client';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import styles from './DesignStudioHero.module.scss';

export const DesignStudioHero = () => {
  const t = useTranslations('homeHero');

  return (
    <section className={styles.design_studio_hero}>
      <div className={styles.design_studio_hero__bg} aria-hidden>
        <Image
          src="/images/design-studio/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.design_studio_hero__bgImage}
        />
        <div className={styles.design_studio_hero__overlay} />
      </div>

      <div className="container">
        <div className={styles.design_studio_hero__inner}>
          <h1 className={styles.design_studio_hero__title}>
            {t('title', {
              fallback: 'Doméra Identity',
            })}
          </h1>
          <p className={styles.design_studio_hero__subtitle}>
            {t('descriptionOne', {
              fallback:
                'Doméra was created with one clear purpose — to design residential plans that balance structure, beauty, and build-readiness. We are a curated studio focused on precision, proportion, and purposeful architecture.',
            })}
          </p>
          <p className={styles.design_studio_hero__subtitle}>
            {t('descriptionTwo', {
              fallback:
                'Every plan we create is shaped by spatial logic, functional flow, and timeless design principles.',
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
