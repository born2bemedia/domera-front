'use client';

import { useTranslations } from 'next-intl';

import styles from './DesignStudioPlans.module.scss';

export const DesignStudioPlans = () => {
  const t = useTranslations('designStudioPlans');

  const itemsPlan = [
    {
      id: 'items-plan-one',
      title: t('itemsPlanOneTitle', {
        fallback: 'Curated style categories',
      }),
    },
    {
      id: 'items-plan-two',
      title: t('itemsPlanTwoTitle', {
        fallback: 'Transparent planning structure',
      }),
    },
    {
      id: 'items-plan-three',
      title: t('itemsPlanThreeTitle', {
        fallback: 'Clear documentation standards',
      }),
    },
    {
      id: 'items-plan-four',
      title: t('itemsPlanFourTitle', {
        fallback: 'Practical guidance for implementation',
      }),
    },
  ];

  const title = t('title', {
    fallback: 'Beyond Plans',
  });

  return (
    <section className={styles.design_studio_plans}>
      <div className="container">
        <div className={styles.design_studio_plans__row}>
          <div>
            <h2 className={`${styles.design_studio_plans__title} title-line`}>{title}</h2>
            <div className={styles.design_studio_plans__description}>
              <p>
                {t('descriptionOne', {
                  fallback: 'Doméra is more than a collection of drawings.',
                })}
              </p>
              <p>
                {t('descriptionTwo', {
                  fallback:
                    'We are a planning studio committed to elevating residential architecture through:',
                })}
              </p>
            </div>
          </div>
          <div>
            <div className={styles.design_studio_plans__items}>
              {itemsPlan?.map((item) => (
                <div className={styles.design_studio_plans__item} key={item.id}>
                  <p className={styles.design_studio_plans__item_title}>{item.title}</p>
                </div>
              ))}
            </div>
            <p className={styles.design_studio_plans__description}>
              {t('descriptionThree', {
                fallback:
                  'Our focus is not trend-driven design — it is structured, long-term architecture.',
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
