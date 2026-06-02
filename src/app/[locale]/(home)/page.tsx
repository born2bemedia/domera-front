import Image from "next/image";

import {
  HomeHero,
  HomeHowItWorks,
  HomePlanCustomization,
  HomeStructureIdea,
  HomeStyleLibrary,
  HomeWhatWeCreate,
  HomeWhyDomera,
} from "./components";
import styles from "./page.module.scss";

export default async function Home() {
  return (
    <>
      <HomeHero />
      <HomeWhatWeCreate />
      <HomeWhyDomera />
      <HomeStyleLibrary />
      <HomePlanCustomization />
      <Image
        src="/images/home/image-separator-desktop.png"
        alt="Style Library"
        width={1440}
        height={240}
        className={styles.imageSeparatorDesktop}
      />
      <Image
        src="/images/home/image-separator-mobile.png"
        alt="Style Library"
        width={375}
        height={100}
        className={styles.imageSeparatorMobile}
      />
      <HomeHowItWorks />
      <HomeStructureIdea />
    </>
  );
}
