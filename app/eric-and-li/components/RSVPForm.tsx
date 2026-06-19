"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import coupleImage from "../assets/images/walking-couple.jpg";

interface RSVPFormProps {
  bride: string;
  groom: string;
  rsvpDeadline: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function RSVPForm({
  bride,
  groom,
  rsvpDeadline,
}: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

      const payload = {
        name: formData.name,
        email: "",
        phone: "",
        guests: formData.attendance === "yes" ? "1" : "0",
        attendance: formData.attendance,
        dietary: "",
        message: formData.message,
      };

      if (!scriptUrl) {
        console.warn("Google Script URL is missing. Simulating success.");
        setTimeout(() => {
          setSubmitted(true);
          setIsSubmitting(false);
          resetForm();
        }, 1000);
        return;
      }

      const data = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        data.append(key, value);
      });

      await fetch(scriptUrl, {
        method: "POST",
        body: data,
        mode: "no-cors",
      });

      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("There was an error submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", attendance: "", message: "" });
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fieldClassName =
    "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-[#c79d5f] focus:outline-none transition-colors";

  return (
    <section id="rsvp" className="bg-[#eae4cc]/30 py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="max-w-md"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-[#c79d5f] text-sm mb-6"
              >
                {groom} <span className="mx-1">♥</span> {bride}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-6xl font-libreBaskerville italic font-bold text-neutral-900 mb-6"
              >
                Thank You
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-neutral-600 leading-relaxed"
              >
                Your RSVP has been received. We can&apos;t wait to celebrate with
                you!
              </motion.p>
            </motion.div>
            <motion.div
              className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src={coupleImage}
                alt={`${groom} and ${bride}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="max-w-md"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-[#c79d5f] text-sm mb-6"
              >
                {groom} <span className="mx-1">♥</span> {bride}
              </motion.p>

              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-6xl font-libreBaskerville italic font-bold text-neutral-900 mb-6"
              >
                RSVP
              </motion.h2>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-neutral-600 text-sm md:text-base leading-relaxed mb-8"
              >
                We are excited to celebrate our wedding with our closest family
                and friends. Kindly RSVP on or before{" "}
                <span className="font-semibold text-neutral-800">
                  {rsvpDeadline}
                </span>
                . Thank you!
              </motion.p>

              <motion.form
                variants={staggerContainer}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <motion.input
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className={fieldClassName}
                />

                <motion.select
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  id="attendance"
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleChange}
                  required
                  className={`${fieldClassName} ${!formData.attendance ? "text-neutral-400" : ""}`}
                >
                  <option value="" disabled>
                    Are you attending?
                  </option>
                  <option value="yes">Yes, I will attend</option>
                  <option value="no">No, I cannot attend</option>
                </motion.select>

                <motion.textarea
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write a Message"
                  rows={5}
                  className={`${fieldClassName} resize-none`}
                />

                <motion.button
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full rounded-lg bg-[#c79d5f] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </motion.button>
              </motion.form>
            </motion.div>

            <motion.div
              className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={coupleImage}
                  alt={`${groom} and ${bride}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
