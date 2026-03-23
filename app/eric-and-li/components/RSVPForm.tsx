"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, CheckCircle } from "lucide-react";

export default function RSVPForm() {
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

      // Convert state to FormData for easier Google Apps Script handling (avoids CORS preflight)
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await fetch(scriptUrl, {
        method: "POST",
        body: data,
        mode: "no-cors", // Required to avoid CORS issues with Google Scripts
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
      <section id="rsvp" className="py-20 px-4 bg-[#eae4cc]/30">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-[#e2d5b3] shadow-xl bg-white">
              <CardContent className="pt-12 pb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CheckCircle className="w-20 h-20 text-[#8c6b42] mx-auto mb-6" />
                </motion.div>
                <h3 className="text-5xl font-meaCulpa text-[#4e2a0d] mb-4">
                  Thank You!
                </h3>
                <p className="text-[#4e2a0d]/80 text-lg font-medium">
                  Your RSVP has been received. We can&apos;t wait to celebrate with
                  you!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 px-4 bg-[#eae4cc]/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c79d5f] rounded-full mb-4">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-meaCulpa text-[#4e2a0d] mb-4">
            RSVP
          </h2>
          <p className="text-[#4e2a0d]/80 text-lg font-medium">
            Please let us know if you&apos;ll be joining us
          </p>
          <div className="w-20 h-1 bg-[#c79d5f] mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-xl border-2 border-[#e2d5b3] bg-white">
            <CardHeader className="bg-[#eae4cc]/50 border-b border-[#e2d5b3]">
              <CardTitle className="text-2xl text-center font-libreBaskerville text-[#4e2a0d]">
                Respond by May 20, 2026
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-[#4e2a0d] font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="mt-2 border-[#e2d5b3] focus-visible:ring-[#c79d5f]"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-[#4e2a0d] font-medium">
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
                    className="mt-2 border-[#e2d5b3] focus-visible:ring-[#c79d5f]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-[#4e2a0d] font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="mt-2 border-[#e2d5b3] focus-visible:ring-[#c79d5f]"
                  />
                </div>

                {/* Attendance */}
                <div>
                  <Label htmlFor="attendance" className="text-[#4e2a0d] font-medium">
                    Will you be attending? *
                  </Label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-md border border-[#e2d5b3] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c79d5f]"
                  >
                    <option value="yes">Joyfully accept</option>
                    <option value="no">Regretfully decline</option>
                  </select>
                </div>

                {/* Number of Guests */}
                {formData.attendance === "yes" && (
                  <>
                    <div>
                      <Label htmlFor="guests" className="text-[#4e2a0d] font-medium">
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
                        className="mt-2 border-[#e2d5b3] focus-visible:ring-[#c79d5f]"
                      />
                    </div>

                    {/* Dietary Restrictions */}
                    <div>
                      <Label htmlFor="dietary" className="text-[#4e2a0d] font-medium">
                        Dietary Restrictions or Allergies
                      </Label>
                      <Input
                        id="dietary"
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                        placeholder="e.g., vegetarian, gluten-free, nut allergy"
                        className="mt-2 border-[#e2d5b3] focus-visible:ring-[#c79d5f]"
                      />
                    </div>
                  </>
                )}

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-[#4e2a0d] font-medium">
                    Message to the Couple
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your well wishes or any questions you may have"
                    className="mt-2 min-h-[100px] border-[#e2d5b3] focus-visible:ring-[#c79d5f]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c79d5f] hover:bg-[#8c6b42] text-white text-lg py-6 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit RSVP"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.p
          className="text-center text-[#4e2a0d]/60 mt-6 text-sm font-medium"
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

