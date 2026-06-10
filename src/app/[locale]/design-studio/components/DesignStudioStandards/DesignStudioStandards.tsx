'use client';

import { useTranslations } from 'next-intl';

import styles from './DesignStudioStandards.module.scss';

export const DesignStudioStandards = () => {
  const t = useTranslations('designStudioStandards');

  const list = [
    {
      id: 'list-one',
      title: t('itemOne', {
        fallback: 'Logical spatial organization',
      }),
    },
    {
      id: 'list-two',
      title: t('itemTwo', {
        fallback: 'Optimized room proportions',
      }),
    },
    {
      id: 'list-three',
      title: t('itemThree', {
        fallback: 'Efficient circulation paths',
      }),
    },
    {
      id: 'list-four',
      title: t('itemFour', {
        fallback: 'Structural practicality',
      }),
    },
    {
      id: 'list-five',
      title: t('itemFive', {
        fallback: 'Adaptability for customization',
      }),
    },
    {
      id: 'list-six',
      title: t('itemSix', {
        fallback: 'Consideration for energy efficiency',
      }),
    },
  ];

  const listTwo = [
    {
      id: 'list-two-one',
      title: t('listTwoItemOne', {
        fallback: 'Spatial balance',
      }),
    },
    {
      id: 'list-two-two',
      title: t('listTwoItemTwo', {
        fallback: 'Constructive clarity',
      }),
    },
    {
      id: 'list-two-three',
      title: t('listTwoItemThree', {
        fallback: 'Compliance adaptability',
      }),
    },
    {
      id: 'list-two-four',
      title: t('listTwoItemFour', {
        fallback: 'Long-term relevance',
      }),
    },
  ];

  const title = t('title', {
    fallback: 'Our Standards',
  });

  const rightTitle = t('rightTitle', {
    fallback: 'Precision Over Volume',
  });

  return (
    <section className={styles.design_studio_standards}>
      <div className="container">
        <div className={styles.design_studio_standards__row}>
          <div>
            <h2 className={`${styles.design_studio_standards__title} title-line`}>{title}</h2>
            <div className={styles.design_studio_standards__description}>
              <p>
                {t('descriptionOne', {
                  fallback:
                    'Every Doméra plan is developed with a consistent architectural framework:',
                })}
              </p>
            </div>
            <div className={styles.design_studio_standards__items}>
              {list?.map((item) => (
                <div className={styles.design_studio_standards__item} key={item.id}>
                  <p className={styles.design_studio_standards__item_title}>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
          <span className={styles.design_studio_standards__divider}></span>
          <div>
            <p className={styles.design_studio_standards__right_subtitle}>{rightTitle}</p>
            <h2 className={styles.design_studio_standards__right_title}>{rightTitle}</h2>
            <div className={styles.design_studio_standards__right_description}>
              <p>
                {t('rightDescriptionOne', {
                  fallback: 'We do not focus on quantity. We focus on quality and structure.',
                })}
              </p>
              <p>
                {t('rightDescriptionTwo', {
                  fallback: 'Each plan is reviewed to ensure:',
                })}
              </p>
            </div>
            <div className={styles.design_studio_standards__right_items}>
              {listTwo?.map((item) => (
                <div className={styles.design_studio_standards__right_item} key={item.id}>
                  <p className={styles.design_studio_standards__right_item_title}>{item.title}</p>
                </div>
              ))}
            </div>
            <p className={styles.design_studio_standards__right_description}>
              {t('rightDescriptionThree', {
                fallback:
                  "Our goal is to reduce clients' uncertainty by delivering structured, understandable, and practical designs.",
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
