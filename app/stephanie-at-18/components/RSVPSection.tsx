"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper, CheckCircle } from "lucide-react";
import { RSVPInfo } from "../types";

interface RSVPSectionProps {
  rsvp: RSVPInfo;
}

export default function RSVPSection({ rsvp }: RSVPSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    attendance: "yes",
    dietary: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

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
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append("event", "stephanie-at-18");

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
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "1",
        attendance: "yes",
        dietary: "",
        message: "",
      });
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

  if (submitted) {
    return (
      <section
        id="rsvp"
        className="relative py-20 bg-gradient-to-b from-yellow-50 to-pink-50 overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-pink-300 shadow-xl bg-white">
                <CardContent className="pt-12 pb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <CheckCircle className="w-20 h-20 text-pink-500 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-5xl font-meaCulpa text-[#ac243d] mb-4">
                    Thank You!
                  </h3>
                  <p className="text-gray-700 text-lg font-libreBaskerville">
                    Your RSVP has been received. We can&apos;t wait to celebrate
                    with you!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="relative py-20 bg-gradient-to-b from-yellow-50 to-pink-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base md:text-xl font-libreBaskerville text-[#ac243d] mb-5 uppercase">
            {rsvp.subtitle}
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4" />
          <p className="text-5xl md:text-8xl font-meaCulpa text-[#ac243d]">
            RSVP
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-xl border-2 border-pink-300 bg-white">
            <CardHeader className="bg-pink-50 border-b border-pink-200">
              <CardTitle className="text-2xl text-center font-libreBaskerville text-[#ac243d]">
                Respond by {rsvp.deadline}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-800 font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="mt-2 border-pink-200 focus-visible:ring-pink-400"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-800 font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="mt-2 border-pink-200 focus-visible:ring-pink-400"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-800 font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="mt-2 border-pink-200 focus-visible:ring-pink-400"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="attendance"
                    className="text-gray-800 font-medium"
                  >
                    Will you be attending? *
                  </Label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-md border border-pink-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="yes">Joyfully accept</option>
                    <option value="no">Regretfully decline</option>
                  </select>
                </div>

                {formData.attendance === "yes" && (
                  <>
                    <div>
                      <Label
                        htmlFor="guests"
                        className="text-gray-800 font-medium"
                      >
                        Number of Guests *
                      </Label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        min="1"
                        max="5"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="mt-2 border-pink-200 focus-visible:ring-pink-400"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="dietary"
                        className="text-gray-800 font-medium"
                      >
                        Dietary Restrictions or Allergies
                      </Label>
                      <Input
                        id="dietary"
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                        placeholder="e.g., vegetarian, gluten-free, nut allergy"
                        className="mt-2 border-pink-200 focus-visible:ring-pink-400"
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="message" className="text-gray-800 font-medium">
                    Message for Stephanie
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your well wishes or any special requests"
                    className="mt-2 min-h-[100px] border-pink-200 focus-visible:ring-pink-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg py-6 rounded-full transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit RSVP"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.p
          className="text-center text-gray-500 mt-6 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          * Required fields
        </motion.p>
      </div>
    </section>
  );
}
