'use client';

import { useTranslations } from 'next-intl';

import styles from './DesignStudioStructure.module.scss';

import { Link } from '@/i18n/navigation';

export const DesignStudioStructure = () => {
  const t = useTranslations('designStudioStructure');

  return (
    <section className={styles.design_studio_structure}>
      <div className="container">
        <div className={styles.design_studio_structure__inner}>
          <h2 className={styles.design_studio_structure__title}>
            {t('title', {
              fallback: 'Let’s Build With Structure',
            })}
          </h2>

          <div className={styles.design_studio_structure__description}>
            <p>
              {t('descriptionOne', {
                fallback: 'A home begins with a decision — and a well-defined plan.',
              })}
            </p>
            <p>
              {t('descriptionTwo', {
                fallback:
                  'Explore our styles, refine your search, or contact our studio to begin shaping your project with clarity and confidence.',
              })}
            </p>
          </div>

          <div className={styles.design_studio_structure__actions}>
            <Link
              href="/custom-quote-request"
              className={styles.design_studio_structure__btnPrimary}
            >
              {t('ctaPrimary', { fallback: '→ Find Your Dream Plan' })}
            </Link>
            <Link href="/contact" className={styles.design_studio_structure__btnSecondary}>
              {t('ctaSecondary', { fallback: '→ Contact Studio' })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
