"use client";

import React from "react";
import { motion } from "motion/react";
import { Users } from "lucide-react";
import { EntourageMember } from "../types";

interface TheEntourageProps {
  bridalParty: EntourageMember[];
  groomsmen: EntourageMember[];
}

export default function TheEntourage({
  bridalParty,
  groomsmen,
}: TheEntourageProps) {
  const renderMemberCard = (member: EntourageMember, index: number) => (
    <motion.div
      key={index}
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative mb-4 mx-auto w-32 h-32 md:w-40 md:h-40">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-200 to-blue-200 flex items-center justify-center shadow-lg">
          <Users className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
        {member.name}
      </h3>
      <p className="text-sm text-rose-600 uppercase tracking-wide">
        {member.role}
      </p>
    </motion.div>
  );

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            The Entourage
          </h2>
          <p className="text-gray-600">
            Meet the special people standing by our side
          </p>
          <div className="w-20 h-1 bg-rose-400 mx-auto mt-4" />
        </motion.div>

        {/* Bridal Party */}
        <div className="mb-16">
          <motion.h3
            className="text-3xl font-serif text-center text-gray-800 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Bridal Party
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {bridalParty.map((member, index) => renderMemberCard(member, index))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-12">
          <div className="flex-1 h-px bg-rose-200 max-w-xs" />
          <div className="mx-4">
            <Users className="w-6 h-6 text-rose-400" />
          </div>
          <div className="flex-1 h-px bg-rose-200 max-w-xs" />
        </div>

        {/* Groomsmen */}
        <div>
          <motion.h3
            className="text-3xl font-serif text-center text-gray-800 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Groomsmen
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {groomsmen.map((member, index) => renderMemberCard(member, index))}
          </div>
        </div>
      </div>
    </section>
  );
}

