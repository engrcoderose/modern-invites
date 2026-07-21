"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import stephHeroBg from "@/app/stephanie-at-18/assets/bg/hero-background.jpg";
import ericHeroBg from "@/app/eric-and-li/assets/hero-background.png";
import stephaniePhoto from "@/app/stephanie-at-18/assets/HeroPhoto.png";
import ericCoupleImg from "@/app/eric-and-li/assets/images/gallery-one-couple.jpg";
import isabellaBackground from "@/app/isabella-and-daniel/assets/romantic-couple.jpg";
import isabellaCouple from "@/app/isabella-and-daniel/assets/walking-couple.jpg";

const portfolioItems = [
  {
    id: "isabella-and-daniel",
    title: "Isabella & Daniel",
    category: "Wedding Invitation",
    date: "March 14, 2027",
    venue: "The Transfiguration of Christ Parish · Antipolo",
    description:
      "A modern luxury wedding experience in rich burgundy and champagne gold—featuring a cinematic welcome, music, smooth scroll storytelling, an elegant entourage, dress-code guide, gallery, and RSVP.",
    href: "/isabella-and-daniel",
    bgImage: isabellaBackground,
    previewImage: isabellaCouple,
    accent: "#5a1024",
    accentLight: "#f6ebe8",
    tags: ["Wedding", "Modern Luxury", "Burgundy & Gold"],
  },
  {
    id: "stephanie-at-18",
    title: "Stephanie at 18",
    category: "18th Birthday Debut",
    date: "September 9, 2023",
    venue: "Rara, Yellow Polo Event Place · Pampanga",
    description:
      "An elegant and vibrant debut celebration for Stephanie's 18th birthday — featuring custom dress code galleries, 18 roses & candles program, and a heartfelt RSVP section in a warm yellow palette.",
    href: "/stephanie-at-18",
    bgImage: stephHeroBg,
    previewImage: stephaniePhoto,
    accent: "#ac243d",
    accentLight: "#fff6d2",
    tags: ["Debut", "18th Birthday", "Red & Yellow"],
  },
  {
    id: "eric-and-li",
    title: "Eric & Li",
    category: "Wedding Invitation",
    date: "June 20, 2030",
    venue: "Saint Joseph Parish Church · Silang, Cavite",
    description:
      "A classic and romantic wedding invitation for Eric Anderson and Li Xia — complete with a live countdown timer, our-story timeline, entourage list, attire guide, and RSVP form.",
    href: "/eric-and-li",
    bgImage: ericHeroBg,
    previewImage: ericCoupleImg,
    accent: "#2d6b4e",
    accentLight: "#f0f7f4",
    tags: ["Wedding", "Classic", "Sage & Gold"],
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sage-50 to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-sage-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-100 rounded-full blur-3xl opacity-30" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest uppercase text-sage-600 mb-4"
          >
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-elegant font-bold text-gray-900 leading-tight mb-6"
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Real invitations crafted for real celebrations. Each one is
            hand-designed with care — tailored to the occasion, the couple,
            and the story behind it.
          </motion.p>
        </div>
      </section>

      {/* Portfolio Items */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 space-y-24">
        {portfolioItems.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`grid gap-0 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl border border-gray-100 ${
              index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Image Panel */}
            <div
              className={`relative min-h-[380px] sm:min-h-[480px] overflow-hidden ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={item.bgImage}
                alt={`${item.title} background`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30" />

              {/* Preview photo */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative w-full max-w-[260px] sm:max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20"
                >
                  <Image
                    src={item.previewImage}
                    alt={`${item.title} preview`}
                    fill
                    className="object-cover object-top"
                    sizes="300px"
                  />
                </motion.div>
              </div>

              {/* Category badge */}
              <div className="absolute top-6 left-6">
                <span
                  className="text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full text-white/90 backdrop-blur-sm"
                  style={{ backgroundColor: `${item.accent}cc` }}
                >
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content Panel */}
            <div
              className={`flex flex-col justify-center px-8 py-12 sm:px-12 ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
              style={{ backgroundColor: item.accentLight }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">
                {item.date}
              </p>
              <h2 className="text-4xl sm:text-5xl font-elegant font-bold text-gray-900 mb-3 leading-tight">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {item.venue}
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-8">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full border text-gray-600 bg-white/70"
                    style={{ borderColor: `${item.accent}55` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: item.accent }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Invitation
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      {/* CTA Banner */}
      <section className="bg-sage-700 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-elegant font-bold text-white mb-4"
          >
            Ready to create yours?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sage-100 text-lg mb-8"
          >
            Let us design a beautiful digital invitation for your special
            occasion — weddings, birthdays, debuts, and more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <a
              href="https://www.facebook.com/moderneenvites/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-sage-700 font-semibold px-8 py-3.5 rounded-full hover:bg-sage-50 transition-colors"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
