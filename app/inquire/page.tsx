import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CopyInquiryMessage from "@/components/pricing/CopyInquiryMessage";
import { primaryButtonClass } from "@/components/landing/constants";
import { createPackageInquiry, getInquiryPackage } from "@/lib/package-inquiry";
import { CONTACT_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Package Inquiry | Modern Invites",
  description: "Prepare a message about your selected Modern Invites package.",
  robots: { index: false, follow: true },
};

export default async function InquiryPage({ searchParams }: {
  searchParams: Promise<{ package?: string | string[] }>;
}) {
  const params = await searchParams;
  const packageDetails = getInquiryPackage(params.package);
  if (!packageDetails) redirect("/pricing#pricing-packages");
  const message = createPackageInquiry(packageDetails);

  return (
    <div className="marketing-site min-h-screen bg-ivory text-ink">
      <Navigation />
      <main className="px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="break-words font-instrumentSerif text-4xl leading-tight sm:text-5xl">
            Let’s talk about {packageDetails.name}.
          </h1>
          <p className="mt-5 text-base leading-7 text-marketing-muted">
            Your selected package is {packageDetails.name} at ₱{packageDetails.price}, a one-time payment.
            Copy the message below, then open our Facebook page and paste it into chat.
          </p>
          <div className="mt-8">
            <label htmlFor="package-inquiry-message" className="block text-sm font-semibold text-forest">
              Your message
            </label>
            <textarea
              id="package-inquiry-message"
              readOnly
              value={message}
              rows={6}
              className="mt-3 block min-h-48 w-full resize-y rounded-xl border border-forest/25 bg-white p-4 text-base leading-7 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
            />
          </div>
          <div className="mt-5">
            <CopyInquiryMessage key={packageDetails.id} message={message} />
            <Link href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className={`${primaryButtonClass} mt-5 w-full text-center sm:w-auto`}>
              Open Facebook (new tab)
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
          <Link href="/pricing#pricing-packages" className="mt-7 inline-flex min-h-11 items-center text-sm font-semibold text-forest underline underline-offset-4">
            Compare packages
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
