import type { Metadata } from "next";

import { ContactDetails, ContactHero, ContactShareVision } from "./components";

export const metadata: Metadata = {
  title: "Contact Doméra - We’re Here to Help You Build Your Dream",
  description:
    "Reach out to Doméra for personalized support, project inquiries, or any questions regarding our designs and services. Let’s start the conversation.",
  openGraph: {
    title: "Contact Doméra - We’re Here to Help You Build Your Dream",
    description:
      "Reach out to Doméra for personalized support, project inquiries, or any questions regarding our designs and services. Let’s start the conversation.",
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
