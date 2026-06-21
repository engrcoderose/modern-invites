"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FrequentlyAskedQuestions() {
  return (
    <section
      id="frequently-asked-questions"
      className="px-4 py-24 sm:px-6 lg:px-8 bg-stone-50"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-4xl text-center text-gray-900 font-elegant md:text-5xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium text-sage-800">
              What are your rates?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-gray-600">
                Our website invitation packages ranges from ₱999 to ₱ 3, 999.
                You can choose the template and package that best suits your
                needs and budget. Each package includes different features, so
                pick one that suits your event. See our{" "}
                <Link
                  href="/pricing"
                  className="text-sage-600 underline font-bold hover:text-sage-700"
                >
                  pricing page
                </Link>{" "}
                for more details.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium text-sage-800">
              How long does it take to create an invitation?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-gray-600">
                Digital Invitations: 2–5 business days. <br /> Full Website
                Packages: 1–7 business days. <br /> Premium Packages: 2–4 weeks
                (may vary depending on workload). <br />{" "}
                <span className="font-bold">Note:</span> The turnaround period
                begins only after all materials have been received.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium text-sage-800">
              Do you require down payment?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-gray-600">
                Yes we require a 50% non-refundable downpayment to secure your
                slot and initiate the design process. The remaining 50% is
                payable after the website is completed.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium text-sage-800">
              Do you offer revisions?
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside leading-relaxed text-gray-600">
                <li>Yes we offer revisions based on the package you choose.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium text-sage-800">
              What contents do you need to start creating an invitation?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-gray-600">
                To start creating an invitation, you need to provide us with the
                following details:
              </p>
              <ul className="list-disc list-inside leading-relaxed text-gray-600">
                <li>Type of Event</li>
                <li>Event date and time</li>
                <li>Event location</li>
                <li>Photos</li>
                <li>Music</li>
                <li>Text content</li>
                <li>Dress Code/Color Theme</li>
                <li>Gift Request</li>
                <li>Additional instructions</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-medium text-sage-800">
              What can I customize in the design template?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-gray-600">
                Customize colors, fonts, photos, countdowns, event details,
                location to match your style perfectly.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg font-medium text-sage-800">
              Who will create/edit the website invitation?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-gray-600">
                Our team will handle the invitation creation and revisions,
                including updates, edits, and uploads.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
