import type { Metadata } from "next";

import { ContactDetails, ContactHero, ContactShareVision } from "./components";

export const metadata: Metadata = {
  title: "Contact Doméra | Let’s Begin the Conversation",
  description:
    "Reach out to Doméra. Share your project details and our team will respond within 1–2 business days to support your vision.",
  openGraph: {
    title: "Contact Doméra | Let’s Begin the Conversation",
    description:
      "Reach out to Doméra. Share your project details and our team will respond within 1–2 business days to support your vision.",
    images: "https://domeraglobal.com/images/meta.png",
  },
};

export default function Contacts() {
  return (
    <main>
      <ContactHero />
      <ContactDetails />
      <ContactShareVision />
    </main>
  );
}
