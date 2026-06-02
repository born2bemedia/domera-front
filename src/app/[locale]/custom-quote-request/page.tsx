import type { Metadata } from "next";

import { QuoteForm } from "@/features/forms";

export const metadata: Metadata = {
  title: "Custom Quote Request | Doméra",
  description:
    "Outline your required refinements and specifications. Complete the structured planning inquiry and our studio will prepare a tailored proposal.",
  openGraph: {
    title: "Custom Quote Request | Doméra",
    description:
      "Outline your required refinements and specifications. Complete the structured planning inquiry and our studio will prepare a tailored proposal.",
    images: "https://domeraglobal.com/images/meta.png",
  },
};

export default function CustomQuoteRequest() {
  return (
    <main>
      <QuoteForm />
    </main>
  );
}
