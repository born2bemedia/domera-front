'use client';

import { useTranslations } from 'next-intl';

import styles from './DesignStudioApproach.module.scss';

export const DesignStudioApproach = () => {
  const t = useTranslations('designStudioApproach');

  const approachItems = [
    {
      id: 'approach-one',
      title: t('itemTitleOne', {
        fallback: 'Clarity',
      }),
      description: t('itemDescriptionOne', {
        fallback: 'Design must be easy to understand, evaluate, and execute.',
      }),
    },
    {
      id: 'approach-two',
      title: t('itemTitleTwo', {
        fallback: 'Balance',
      }),
      description: t('itemDescriptionTwo', {
        fallback: 'Proportion, symmetry, and spatial rhythm define architectural quality.',
      }),
    },
    {
      id: 'approach-three',
      title: t('itemTitleThree', {
        fallback: 'Function',
      }),
      description: t('itemDescriptionThree', {
        fallback: 'Every square meter must serve a purpose.',
      }),
    },
  ];

  const title = t('title', {
    fallback: 'Our Approach',
  });

  return (
    <section className={styles.design_studio_approach}>
      <div className={`${styles.design_studio_approach__container} container`}>
        <div className={styles.design_studio_approach__top}>
          <h2 className={`${styles.design_studio_approach__title} title-line`}>{title}</h2>
          <div className={styles.design_studio_approach__description}>
            <p>
              {t('descriptionOne', {
                fallback: 'Our work is guided by three core principles:',
              })}
            </p>
          </div>
        </div>

        <div className={styles.design_studio_approach__items}>
          {approachItems?.map((item, index) => (
            <div className={styles.design_studio_approach__item} key={item.id}>
              <p className={styles.design_studio_approach__item_title}>
                {String(index + 1).padStart(2, '0')} {item.title}
              </p>
              <p className={styles.design_studio_approach__item_description}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
