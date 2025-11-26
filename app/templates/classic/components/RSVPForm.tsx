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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log("RSVP Submitted:", formData);
    setSubmitted(true);

    // Reset form after 5 seconds
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
      <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-rose-200 shadow-xl">
              <CardContent className="pt-12 pb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-3xl font-serif text-gray-800 mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-600 text-lg">
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
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-400 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            RSVP
          </h2>
          <p className="text-gray-600 text-lg">
            Please let us know if you&apos;ll be joining us
          </p>
          <div className="w-20 h-1 bg-rose-400 mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-xl border-2 border-rose-100">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-blue-50">
              <CardTitle className="text-2xl text-center text-gray-800">
                Respond by May 20, 2026
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="mt-2"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-700">
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
                    className="mt-2"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="mt-2"
                  />
                </div>

                {/* Attendance */}
                <div>
                  <Label htmlFor="attendance" className="text-gray-700">
                    Will you be attending? *
                  </Label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="yes">Joyfully accept</option>
                    <option value="no">Regretfully decline</option>
                  </select>
                </div>

                {/* Number of Guests */}
                {formData.attendance === "yes" && (
                  <>
                    <div>
                      <Label htmlFor="guests" className="text-gray-700">
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
                        className="mt-2"
                      />
                    </div>

                    {/* Dietary Restrictions */}
                    <div>
                      <Label htmlFor="dietary" className="text-gray-700">
                        Dietary Restrictions or Allergies
                      </Label>
                      <Input
                        id="dietary"
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                        placeholder="e.g., vegetarian, gluten-free, nut allergy"
                        className="mt-2"
                      />
                    </div>
                  </>
                )}

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-gray-700">
                    Message to the Couple
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your well wishes or any questions you may have"
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-blue-500 hover:from-rose-600 hover:to-blue-600 text-white text-lg py-6"
                >
                  Submit RSVP
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.p
          className="text-center text-gray-600 mt-6 text-sm"
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

