'use client';

import { useTranslations } from 'next-intl';

import styles from './DesignStudioFor.module.scss';

export const DesignStudioFor = () => {
  const t = useTranslations('designStudioFor');

  const forItems = [
    {
      id: 'for-items-one',
      title: t('for-items-one-title', {
        fallback: 'Structured architectural thinking',
      }),
    },
    {
      id: 'for-items-two',
      title: t('for-items-two-title', {
        fallback: 'Timeless aesthetics',
      }),
    },
    {
      id: 'for-items-three',
      title: t('for-items-three-title', {
        fallback: 'Efficient planning',
      }),
    },
    {
      id: 'for-items-four',
      title: t('for-items-four-title', {
        fallback: 'Build-ready documentation',
      }),
    },
  ];

  const title = t('title', {
    fallback: 'Who We Design For',
  });

  return (
    <section className={styles.design_studio_for}>
      <div className="container">
        <div className={styles.design_studio_for__top}>
          <p className={styles.design_studio_for__subtitle}>{title}</p>
          <h2 className={styles.design_studio_for__title}>{title}</h2>
          <div className={styles.design_studio_for__description}>
            <p>
              {t('rightDescriptionOne', {
                fallback: 'Doméra is built for individuals who value:',
              })}
            </p>
          </div>
        </div>
        <div className={styles.design_studio_for__row}>
          <div>
            <div className={styles.design_studio_for__items}>
              {forItems?.map((item) => (
                <div className={styles.design_studio_for__item} key={item.id}>
                  <p className={styles.design_studio_for__item_title}>{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <p className={styles.design_studio_for__description}>
            {t('descriptionTwo', {
              fallback:
                'Whether you are planning your primary residence, a secondary home, or an investment property, our studio provides the architectural foundation to move forward confidently.',
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
