'use client';

import { useTranslations } from 'next-intl';

import styles from './DesignStudioAdaptation.module.scss';

export const DesignStudioAdaptation = () => {
  const t = useTranslations('designStudioAdaptation');

  return (
    <section className={styles.design_studio_adaptation}>
      <div className="container">
        <div className={styles.design_studio_adaptation__inner}>
          <h2 className={styles.design_studio_adaptation__title}>
            {t('title', {
              fallback: 'Designed for Adaptation',
            })}
          </h2>

          <div className={styles.design_studio_adaptation__description}>
            <p>
              {t('descriptionOne', {
                fallback: 'While our plans are ready-to-build, they are not rigid.',
              })}
            </p>
            <p>
              {t('descriptionTwo', {
                fallback:
                  'We understand that every client, location, and project timeline differs. That is why Doméra plans are created with flexibility in mind — allowing adjustments in layout, materials, and configuration without compromising architectural integrity.',
              })}
            </p>
            <p>
              <strong>
                {t('descriptionThree', {
                  fallback: 'A well-designed plan should guide construction — not complicate it.',
                })}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
