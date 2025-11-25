"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
                Our website invitation packages ranges from PHP 999 to PHP
                2,499. You can choose the template and package that best suits
                your needs and budget. Each package includes different features,
                so pick one that suits your event.
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
                Given that all the necessary details are provided, we&apos;ll
                send you initial draft within 2-5 business days. This draft
                allows you to review and make any necessary changes before we
                finalize the invitation. Then it will take 2-9 business days to
                finalize the invitation.
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
                Yes we require 50% down payment. The remaining 50% is payable
                after the website completion.
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
                <li>Yes we offer 2 major revisions for design and layout.</li>
                <li>
                  Our support team offers{" "}
                  <span className="font-bold">unlimited content revisions</span>{" "}
                  for text, music, and photos, which we aim to complete ASAP or
                  within 12 hours.
                </li>
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
      </div>
    </section>
  );
}
