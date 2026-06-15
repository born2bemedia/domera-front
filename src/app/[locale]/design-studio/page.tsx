import {
  DesignStudioAdaptation,
  DesignStudioApproach,
  DesignStudioFor,
  DesignStudioHero,
  DesignStudioImage,
  DesignStudioPhilosophy,
  DesignStudioPlans,
  DesignStudioStandards,
  DesignStudioStructure,
} from './components';

export default async function DesignStudioPage() {
  return (
    <>
      <DesignStudioHero />
      <DesignStudioPhilosophy />
      <DesignStudioStandards />
      <DesignStudioAdaptation />
      <DesignStudioApproach />
      <DesignStudioFor />
      <DesignStudioPlans />
      <DesignStudioStructure />
    </>
  );
}
