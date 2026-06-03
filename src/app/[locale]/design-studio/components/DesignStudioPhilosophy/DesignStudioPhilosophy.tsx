'use client';

import { useTranslations } from 'next-intl';

import styles from './DesignStudioPhilosophy.module.scss';

export const DesignStudioPhilosophy = () => {
  const t = useTranslations('designStudioPhilosophy');

  const philosophyItems = [
    {
      id: 'philosophy-one',
      title: t('itemOne', {
        fallback: 'Clear layouts create effortless movement',
      }),
    },
    {
      id: 'philosophy-two',
      title: t('itemTwo', {
        fallback: 'Balanced proportions create visual harmony',
      }),
    },
    {
      id: 'philosophy-three',
      title: t('itemThree', {
        fallback: 'Intelligent zoning creates functional comfort',
      }),
    },
    {
      id: 'philosophy-four',
      title: t('itemFour', {
        fallback: 'Thoughtful detailing creates long-term value',
      }),
    },
  ];

  const title = t('title', {
    fallback: 'Our Philosophy',
  });

  return (
    <section className={styles.design_studio_philosophy}>
      <div className="container">
        <div className={styles.design_studio_philosophy__top}>
          <p className={styles.design_studio_philosophy__subtitle}>{title}</p>
          <h2 className={`${styles.design_studio_philosophy__title} title-line`}>{title}</h2>
          <div className={styles.design_studio_philosophy__description}>
            <p>
              {t('descriptionOne', {
                fallback:
                  'Architecture should not overwhelm. It should organize, guide, and elevate daily life.',
              })}
            </p>
            <p>
              {t('descriptionTwo', {
                fallback: 'At Doméra, we believe that strong design begins with clarity:',
              })}
            </p>
          </div>
        </div>

        <div className={styles.design_studio_philosophy__items}>
          {philosophyItems?.map((item) => (
            <div className={styles.design_studio_philosophy__item} key={item.id}>
              <p className={styles.design_studio_philosophy__item_title}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
