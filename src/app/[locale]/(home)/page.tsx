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
      <HomeHowItWorks />
      <HomeStructureIdea />
    </>
  );
}
